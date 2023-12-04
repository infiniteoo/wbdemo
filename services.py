import boto3

# Initialize IAM client
iam = boto3.client('iam')

# Create an IAM user
user_name = 'new_user'
iam.create_user(UserName=user_name)
print(f"IAM User '{user_name}' created successfully.")

# Initialize KMS client
kms = boto3.client('kms')

# Create a KMS key
response = kms.create_key(Description='MyKey')
key_id = response['KeyMetadata']['KeyId']
print(f"KMS Key '{key_id}' created successfully.")


# Initialize Lambda client
lambda_client = boto3.client('lambda')

# Create a Lambda function
function_name = 'my_lambda_function'
handler = 'lambda_function.handler'
runtime = 'python3.8'
role_arn = 'arn:aws:iam::account-id:role/execution-role'
lambda_client.create_function(
    FunctionName=function_name,
    Runtime=runtime,
    Role=role_arn,
    Handler=handler,
    Code={'S3Bucket': 'bucket', 'S3Key': 'key'}
)
print(f"Lambda function '{function_name}' created successfully.")



# Initialize EC2 client
ec2 = boto3.client('ec2')

# Launch an EC2 instance
response = ec2.run_instances(
    ImageId='ami-0c55b159cbfafe1f0',
    InstanceType='t2.micro',
    MinCount=1,
    MaxCount=1
)
instance_id = response['Instances'][0]['InstanceId']
print(f"EC2 Instance '{instance_id}' launched successfully.")



