import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

// interface WebAppStackProps extends StackProps {
//   targetEnv: string,
//   buckets: CustomBucket[]
// }

interface CustomBucket {
  bucketName: string,
  accessControl: s3.BucketAccessControl,
  encryption: s3.BucketEncryption,
  versioned: boolean,
  blockPublicAccess: s3.BlockPublicAccess,
  removalPolicy: cdk.RemovalPolicy
}

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, targetEnv: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let buckets: CustomBucket[] = [
      {
        bucketName: "cdk-sag-bucket-01",
        accessControl: s3.BucketAccessControl.PRIVATE,
        encryption: s3.BucketEncryption.S3_MANAGED,
        versioned: false,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        removalPolicy: cdk.RemovalPolicy.DESTROY
      },
      {
        bucketName: "cdk-sag-bucket-02",
        accessControl: s3.BucketAccessControl.PRIVATE,
        encryption: s3.BucketEncryption.S3_MANAGED,
        versioned: true,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        removalPolicy: cdk.RemovalPolicy.DESTROY
      }
    ]

    for ( var bucket of buckets) {
      let bucketName = bucket.bucketName + targetEnv;

      console.log("Bucket:", bucket);

      new s3.Bucket(this, bucketName, {
        bucketName: bucketName,
        accessControl: bucket.accessControl,
        encryption: bucket.encryption,
        versioned: bucket.versioned,
        blockPublicAccess: bucket.blockPublicAccess,
        removalPolicy: bucket.removalPolicy
      })
    }

// // Creating array of bucket name and we just need to give names of bucket and using for 
// // loop --> all the buckets will get created
//     let bucketNames: string[] = ["cdk-sag-bucket-01","cdk-sag-bucket-02"];

//     for ( var bucketName of bucketNames ){
//       bucketName += targetEnv

//       new s3.Bucket(this, bucketName, {
//         bucketName: bucketName,
//         accessControl: s3.BucketAccessControl.PRIVATE,
//         encryption: s3.BucketEncryption.S3_MANAGED,
//         versioned: false,
//         blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
//         removalPolicy: cdk.RemovalPolicy.DESTROY
//       })

//       console.log("BucketName:", bucketName);

//     }

// Earlier, below 2 buckets were created individually
    // new s3.Bucket(this, 'MyFirstBucket1', {
    //   bucketName: `cdk-sag-bucket-01-${targetEnv}`,
    //   accessControl: s3.BucketAccessControl.PRIVATE,
    //   encryption: s3.BucketEncryption.S3_MANAGED,
    //   versioned: false,
    //   blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY
    // })

    // new s3.Bucket(this, 'MyFirstBucket2', {
    //   bucketName: `cdk-sag-bucket-02-${targetEnv}`,
    //   accessControl: s3.BucketAccessControl.PRIVATE,
    //   encryption: s3.BucketEncryption.S3_MANAGED,
    //   versioned: false,
    //   blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY
    // })    

    // new s3.Bucket(this, 'MyFirstBucket', {
    //   bucketName: `cdk-sag-bucket-1`,
    //   versioned: true,
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   publicReadAccess: false   
    // })    
  }
}

export class CdkDemoStack1 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'MySecondBucket', {
      bucketName: 'cdk-sag-bucket-2',
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: false   
    })

    new s3.Bucket(this, 'MyThirdBucket', {
      bucketName: 'cdk-sag-bucket-3',
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: false   
    })    
  }
}
