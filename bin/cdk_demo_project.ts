#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkDemoStack, CdkDemoStack1 } from '../lib/cdk_demo_project-stack';

const app = new cdk.App();
new CdkDemoStack(app, 'CdkDemoStackDev', 'dev', {
});

new CdkDemoStack(app, 'CdkDemoStackQa', 'qa', {
});

new CdkDemoStack1(app, 'CdkDemoStack1',{

});