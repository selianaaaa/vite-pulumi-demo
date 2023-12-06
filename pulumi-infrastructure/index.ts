import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as fs from 'fs'
import * as path from 'path'
import * as mime from 'mime'

// Create an S3 bucket for hosting your static site
const siteBucket = new aws.s3.Bucket('siteBucket', {
  website: {
    indexDocument: 'index.html',
  },
})

export const bucketName = siteBucket.bucket

// Function to upload files recursively
function uploadDirectory(
  directory: string,
  bucket: aws.s3.Bucket,
  prefix: string = ''
) {
  for (const item of fs.readdirSync(directory)) {
    const filePath = path.join(directory, item)
    const fileKey = path.join(prefix, item)

    if (fs.statSync(filePath).isDirectory()) {
      uploadDirectory(filePath, bucket, fileKey)
    } else {
      new aws.s3.BucketObject(fileKey, {
        bucket: bucket,
        source: new pulumi.asset.FileAsset(filePath),
        contentType: mime.getType(filePath) || undefined,
      })
    }
  }
}

// Upload files from the dist directory
const siteDir = '../dist'
uploadDirectory(siteDir, siteBucket)

// Configure public access
function publicReadPolicyForBucket(bucketName: string) {
  return JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  })
}

new aws.s3.BucketPolicy('bucketPolicy', {
  bucket: siteBucket.bucket,
  policy: siteBucket.bucket.apply(publicReadPolicyForBucket),
})
