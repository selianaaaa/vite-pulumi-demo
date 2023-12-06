# React + TypeScript + Vite + Pulumi

This repository contains a demo project for deploying a Vite-based React application with TypeScript to AWS using [Pulumi](https://www.pulumi.com/) as Infrastructure as Code (IaC) tool.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [Yarn](https://yarnpkg.com/) package manager
- [AWS CLI](https://aws.amazon.com/cli/) (configured with your AWS credentials)
- [Pulumi CLI](https://www.pulumi.com/docs/get-started/aws/begin/)

## Installation

1. **Install Dependencies**:
   Navigate to the project directory and install the necessary dependencies:

```bash
yarn install
```

2. Install the required Node.js packages for Pulumi:

```bash
cd pulumi-infrastructure
yarn install
```

3. Configure AWS Region (Optional):
   Set the AWS region for Pulumi to deploy resources:

```bash
pulumi config set aws:region [your-preferred-region] # e.g., us-west-2
```

Deploying to AWS from home directory:

```bash
yarn deploy
```

Follow the prompts to confirm the deployment.

Note: Ensure that your AWS credentials are correctly configured for Pulumi to deploy resources to your AWS account. You can set up your AWS credentials using the AWS CLI with aws configure.

## Review the Bucket Policy

- Log in to the AWS Management Console: Go to the AWS Management Console and log in with your credentials.

- Navigate to S3 Service: In the AWS Management Console, find and click on the "S3" service to open the S3 dashboard.

- Locate Your Bucket: In the S3 dashboard, locate the bucket for which you want to review the policy.

## Check Bucket Policy:

- Click on the bucket name to open the bucket details.

- Go to the "Permissions" tab.

- Scroll down to the "Bucket Policy" section. Here, you can view the current policy attached to the bucket.

- Review the policy to ensure it's correctly formatted and does not contain any errors. A common public read policy looks something like this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "_",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::[bucket-name]/_"
    }
  ]
}
```

Replace [bucket-name] with your actual bucket name.

## Check Public Access Settings:

- Still in the "Permissions" tab, check the "Block public access (bucket settings)".
  Ensure that the settings here do not block the type of access your policy is granting. For a public read policy, you might need to turn off the block public access settings.
  Verify Bucket Ownership

## Bucket Details:

- While you are in the bucket details page, there isn't a direct indication of the bucket owner in the AWS S3 console. However, you can infer ownership based on your ability to access and modify the bucket settings.
  AWS Account:

- Ensure that you are logged into the correct AWS account that you believe owns the bucket. You can see the account details in the top right corner of the AWS Management Console.
  Cross-Check with AWS CLI:

- If you have the AWS CLI installed, you can use it to list the buckets and see if the bucket in question is listed under your account.
- Run aws s3 ls in your terminal. This command lists all the S3 buckets under the currently configured AWS credentials. If the bucket appears in this list, it's under the same AWS account as your credentials.
- By following these steps, you can review your bucket's policy and public access settings and verify that you are working within the correct AWS account. If everything seems correct and you still face issues, the problem might lie with the specific permissions of the AWS credentials you are using with Pulumi.
