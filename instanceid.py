import boto3

# Create an EC2 client
ec2 = boto3.client('ec2')

# Assuming you have the instance's public DNS name
instance_dns = 'Reservations'

# Use describe_instances to get information about your instances
response = ec2.describe_instances(
    Filters=[
        {
            'Name': 'Reservations',
            'Values': [instance_dns]
        }
    ]
)

# Extract the instance ID from the response
instance_id = response['Reservations'][0]['Instances'][0]['InstanceId']

# Print the instance ID
print(f"Instance ID: {instance_id}")
