<!--
title: 'AWS Serverless Polly-S3 Japanese Text to Speech Microservice in Node.js'
description: 'This project demonstrates how to create a serverless microservice using AWS Lambda, Amazon Polly, and Amazon S3 with the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# GPTLL Polly Microservice

This project provides a Serverless microservice that processes text content and generates audio files using Amazon Polly. The generated audio files are stored in an Amazon S3 bucket and can be publicly accessed.

The microservice is built using the Serverless Framework and AWS Lambda. The Lambda function is triggered by an HTTP POST request and accepts two parameters in the request body: a name string and a content string. The content string is converted to speech using Amazon Polly with a Japanese voice (either Mizuki or Takumi), and the generated audio file is stored in the S3 bucket using the name parameter as the file name.

### Prerequisites

- Node.js v14.x or higher
- NPM (included with Node.js)
- An AWS account with appropriate permissions to create Lambda functions, API Gateway, and S3 resources
- The Serverless Framework CLI installed globally (npm install -g serverless)

### Installation

Clone this repository:

```
git clone <repository-url>
```

Change into the project directory:

```
cd gptll-polly-microservice
```

Install the required dependencies:

```
npm install
```

### Configuration

Create a .env file in the root of the project and add the required environment variables (e.g., API key):

```
API_KEY=my_generated_api_key
```

### Deployment

```
$ serverless deploy
```

The Serverless Framework will package and deploy your Lambda function, create an API Gateway, and set up the necessary permissions.

After deployment, you will receive an endpoint URL that you can use to trigger the Lambda function. Make sure to include the API key in the ApiKey header when making requests.

### Usage

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

To use the microservice, send an HTTP POST request to the endpoint URL with the following JSON body:

```json
{
  "name": "example",
  "content": "こんにちは、世界！"
}
```

The Lambda function will process the content, generate an audio file using Amazon Polly, and store the file in the S3 bucket. The resulting audio file will be publicly accessible.

### Security

The microservice is protected by an API key. To access the microservice, you need to include the API key in the ApiKey header of your HTTP requests. Unauthorized requests will be denied.
