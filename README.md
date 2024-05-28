# ExpertsCloud

<img width="200px" src="public/logo.png"/>
ExpertsCloud provides DevOps services for companies of all sizes. We ensure end-to-end software delivery automation, as well as security of infrastructure in the company.

Follow us on social media:

<a href="https://www.facebook.com/Expertscloud" target="_blank"><img src="public/facebook.png" alt="Facebook" width="30" height="30"></a>
<a href="https://www.linkedin.com/company/expertscloud-pvt-limited" target="_blank"><img src="public/linkedin.png" alt="LinkedIn" width="30" height="30"></a>
<a href="https://www.instagram.com/lifeatexpertscloud/" target="_blank"><img src="public/instagram.png" alt="Instagram" width="30" height="30"></a>

# Lambda-Serverless-Any-Audio-To-Mp3

## Description

The lambda-serverless-any-audio-to-mp3 function is a serverless utility that converts audio wav or mov file into audio mp3 file stores it in an Amazon S3 bucket. It accepts input as body with file_key to an audio wav or mov file. it downloads the wav audio and converts it to a mp3 audio, after that uploads the resulting audio.mp3 to the specified S3 bucket. The function returns a success response with the URL of the newly created audio mp3 file, new and old keys or an error message if any step fails.

## Features

- Input Flexibility: Accepts an S3 key of audio file.
- Conversion: Converts wav or mov audio to mp3 audio using the lambda-serverless-any-audio-to-mp3 utility.
- Storage: Uploads the resulting audio to a specified S3 bucket.
- Response: Returns a success response with the URL of the new mp3 or an error message.

## Getting Started

These instructions will help you set up and deploy the project on your local machine and in the cloud.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Serverless Framework](https://www.serverless.com/) installed
- npm (Node Package Manager) installed
- AWS account and AWS CLI configured (if deploying to AWS)
- Ensure that an S3 bucket is  created.

### Configure AWS CLI

bash
aws configure

It will prompt you to enter the following information:

- AWS Access Key ID: Your AWS access key.
- AWS Secret Access Key: Your AWS secret key.
- Default region name: The AWS region you want to use (e.g., us-east-1).

### Set Up Environment Variables
```bash
S3_BUCKET_NAME=your-s3-bucket-name
```
Replace env.json.example with your environment configuration and specify your S3 bucket name.

### IAM Role:

Create an IAM role with permissions to access S3 buckets, Lambda functions, API Gateway, and CloudWatch.

### Installation

1. Clone the repository:

```bash
git clone git@github.com:expertscloud/lambda-serverless-any-audio-to-mp3.git
cd lambda-serverless-any-audio-to-mp3
```

2. Install dependencies:

```bash
npm i
```

3. Configuration:

Update 'serverless.yml' with your config:
```bash
frameworkVersion: "your version"
 provider:
   name: aws
   runtime: your nodejs verison e.g nodejs20.x
   region: your region e.g us-east-1
   role: your aws role e.g arn:aws:iam::123:role/serverless-role
   ```

4. Deployment:

```bash
sls deploy
```

5. Endpoint:
   method: POST,
   url : {{base_url}}/dev/uploadAudio
   body: {
   "file_key": 'bucket file key',
   }
