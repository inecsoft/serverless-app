import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { AssetStorage } from './storage';
import { WebApp } from './webapp';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const storage = new AssetStorage(this, 'Storage');

    const webapp = new WebApp(this, 'WebApp', {
      hostingBucket: storage.hostingBucket,
      baseDirectory: '../',
      relativeWebAppPath: '',
    });
  }
}
