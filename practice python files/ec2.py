import boto3
import sys



# DESCRIBE INSTANCES
ec2 = boto3.client('ec2')
response = ec2.describe_instances()
print(response)


# MONITOR & UNMONITOR INSTANCES

# Check if the correct number of command-line arguments is provided
if len(sys.argv) < 2:
    print("Usage: python script.py [ON|OFF]")
    sys.exit(1)

# Get the desired state from command-line arguments
desired_state = sys.argv[1]

# Create an EC2 client
ec2 = boto3.client('ec2')

# Specify the instance ID (replace 'ami-06d4b7182ac3480fa' with your actual instance ID)
instance_id = 'i-06d4b7182ac3480fa'

# Toggle instance monitoring based on the provided command-line argument
if desired_state == 'ON':
    response = ec2.monitor_instances(InstanceIds=[instance_id])
else:
    response = ec2.unmonitor_instances(InstanceIds=[instance_id])

# Print the response
print(response)