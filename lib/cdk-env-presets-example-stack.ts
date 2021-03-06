import * as cdk from '@aws-cdk/core';
import {CfnOutput, StackProps} from '@aws-cdk/core';
import {Instance, InstanceClass, InstanceSize, InstanceType, MachineImage, Vpc} from "@aws-cdk/aws-ec2";


export interface CdkEnvPresetsExampleStackProps extends StackProps {
    envPresets: { instanceClass: string };
}

export class CdkEnvPresetsExampleStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: CdkEnvPresetsExampleStackProps) {
        super(scope, id, props);

        new Instance(this, 'some-instance', {
            instanceType: InstanceType.of(props.envPresets.instanceClass as InstanceClass, InstanceSize.MEDIUM),
            machineImage: MachineImage.latestAmazonLinux(),
            vpc: new Vpc(this, 'vpc')

        });
        // The code that defines your stack goes here
        new CfnOutput(this, 'some-usage-of-env-presets', {
            value: props?.envPresets.instanceClass
        })
    }
}
