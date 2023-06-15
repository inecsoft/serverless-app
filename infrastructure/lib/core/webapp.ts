import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3, aws_cloudfront as cloudfront, CfnOutput } from 'aws-cdk-lib';
// import * as cwt from 'cdk-webapp-tools';
// import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';

export interface WebAppProps {
  hostingBucket: s3.IBucket;
  relativeWebAppPath: string;
  baseDirectory: string;
}

export class WebApp extends Construct {
  public readonly webDistribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props: WebAppProps) {
    super(scope, id);

    const oai = new cloudfront.OriginAccessIdentity(this, 'WebHostingOAI', {});

    const cloudfrontProps: any = {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: props.hostingBucket,
            originAccessIdentity: oai,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCachingMinTtl: 86400,
          errorCode: 403,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
        {
          errorCachingMinTtl: 86400,
          errorCode: 404,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
      ],
    };

    this.webDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'AppHostingDistribution',
      cloudfrontProps,
    );

    props.hostingBucket.grantRead(oai);

    // Deploy Web App ----------------------------------------------------

    // const deployment = new cwt.WebAppDeployment(this, 'WebAppDeploy', {
    //   baseDirectory: props.baseDirectory,
    //   relativeWebAppPath: props.relativeWebAppPath,
    //   webDistribution: this.webDistribution,
    //   webDistributionPaths: ['/*'],
    //   buildCommand: 'yarn build',
    //   buildDirectory: 'build',
    //   bucket: props.hostingBucket,
    //   prune: false,
    // });

    const cloudFrontAwsResource = new cdk.custom_resources.AwsCustomResource(
      this,
      `CloudFrontInvalidation-${Date.now()}`,
      {
        onCreate: {
          physicalResourceId: cdk.custom_resources.PhysicalResourceId.of(
            `${this.webDistribution.distributionId}-${Date.now()}`,
          ),
          service: 'CloudFront',
          action: 'createInvalidation',
          parameters: {
            DistributionId: this.webDistribution.distributionId,
            InvalidationBatch: {
              CallerReference: Date.now().toString(),
              Paths: {
                Quantity: 1,
                Items: ['/*'],
              },
            },
          },
        },
        policy: cdk.custom_resources.AwsCustomResourcePolicy.fromSdkCalls({
          resources: cdk.custom_resources.AwsCustomResourcePolicy.ANY_RESOURCE,
        }),
      },
    );

    cloudFrontAwsResource.node.addDependency(this.webDistribution);

    const webDistributionDomain = new cdk.CfnOutput(this, 'URL', {
      value: `https://${this.webDistribution.distributionDomainName}/`,
    });

    console.log(webDistributionDomain);
  }
}
