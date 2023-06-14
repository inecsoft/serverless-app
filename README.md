# Serverless Development on AWS

[Learning Path on Pluralsight](https://pluralsight.pxf.io/OReqan)

This repository is for the Serverless Development on AWS learning path for Pluralsight.

## Approach

This learning path is focused on creating a modern full-stack serverless application on AWS using real world techniques and approaches. It follows the following opinionated concepts:

- It leverages a [monorepo](https://en.wikipedia.org/wiki/Monorepo) structure with [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- The backend services are created for Node.js wtih JavaScript and are exposed as REST API's
- The web application is created using React using hooks
- The infrastructure is defined with TypeScript using the [AWS CDK](https://aws.amazon.com/cdk/)
- Continuous delivery is implemented using an AWS CDK Pipeline
- No third-party services are leveraged as the focus is on a cloud-native approach with AWS only

## Following Along

This repository is designed to be used alongside the learning path. While the course consists of 11 courses, there are 5 courses where the concepts are applied to the sample application. For each of these courses, you will have a starting and ending branch. In addition, there will be a link to compare those two branches.

### Implementing Serverless Web Application Hosting and Delivery on AWS

Learn about leveraging Amazon S3 and CloudFront to distribute serverless web applications on a global scale.

[Course Link](https://pluralsight.pxf.io/BXngGq)

- [Starting Branch](https://github.com/davidtucker/ps-serverless-app/tree/p1)
- [Ending Branch](https://github.com/davidtucker/ps-serverless-app/tree/p2)
- [Comparison Between Branches](https://github.com/davidtucker/ps-serverless-app/compare/p1...p2)

### Building a Serverless API Tier with Amazon API Gateway

Learn about using AWS Lambda as your compute service while exposing an API with API Gateway all while using Amazon DynamoDB to store application data.

[Course Link](https://pluralsight.pxf.io/EaEBGK)

- [Starting Branch](https://github.com/davidtucker/ps-serverless-app/tree/p2)
- [Ending Branch](https://github.com/davidtucker/ps-serverless-app/tree/p3)
- [Comparison Between Branches](https://github.com/davidtucker/ps-serverless-app/compare/p2...p3)

### Utilizing Amazon EventBridge in Serverless Applications

Learn about using Amazon EventBridge alongside Amazon S3 and Step Functions to create powerful microservices for your serverless application.

[Course Link](https://pluralsight.pxf.io/3PJQXd)

- [Starting Branch](https://github.com/davidtucker/ps-serverless-app/tree/p3)
- [Ending Branch](https://github.com/davidtucker/ps-serverless-app/tree/p4)
- [Comparison Between Branches](https://github.com/davidtucker/ps-serverless-app/compare/p3...p4)

### Implementing Authentication for a Serverless HTTP API on AWS

Learn about securing serverless applications with Amazon Cognito for both web applications and the API tier.

[Course Link](https://pluralsight.pxf.io/yRqMEW)

- [Starting Branch](https://github.com/davidtucker/ps-serverless-app/tree/p4)
- [Ending Branch](https://github.com/davidtucker/ps-serverless-app/tree/p5)
- [Comparison Between Branches](https://github.com/davidtucker/ps-serverless-app/compare/p4...p5)

### Implementing Monitoring and Continuous Deployment for Serverless Applications on AWS

Learn about monitoring your serverless applications with Amazon CloudWatch and AWS X-Ray as well as creating custom operational dashboards and alarms.

[Course Link](https://pluralsight.pxf.io/LPK6oY)

- [Starting Branch](https://github.com/davidtucker/ps-serverless-app/tree/p5)
- [Ending Branch](https://github.com/davidtucker/ps-serverless-app/tree/p6)
- [Comparison Between Branches](https://github.com/davidtucker/ps-serverless-app/compare/p5...p6)

### **Working with workspaces**

#### **adding dependency within a specific workspace**

```
yarn workspaces <workspace name> add <package name>
```

#### **adding a dev dependency within a specific workspace**

```
yarn workspace <workspace name> add <package name> -D
```

### **adding a dependency to the root of the monorepo (must be in the root directory)**

```
yarn add <package name > -W
```

```
cd webapp
yarn start
```

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

```
export AWS_PROFILE=ivan-arteaga-dev
echo $AWS_PROFILE
env CDK_NEW_BOOTSTRAP=1 npx cdk bootstrap  --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://account/us-east-1 --bootstrap-bucket-name tfgm-deployment-bucket
cdk bootstrap

cdk bootstrap --show-template > bootstrap-template.yaml

```
