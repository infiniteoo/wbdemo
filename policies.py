import json

import boto3

# Create IAM client
iam = boto3.client('iam')

# Create a policy
my_managed_policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:Scan",
                "dynamodb:UpdateItem"
            ],
            "Resource": "*"
        }
    ]
}
response = iam.create_policy(
  PolicyName='myDynamoDBPolicy',
  PolicyDocument=json.dumps(my_managed_policy)
)
print(response)


# GET IAM POLICY
response = iam.get_policy(
    PolicyArn='arn:aws:iam::aws:policy/myDynamoDBPolicy'
)
print(response)


