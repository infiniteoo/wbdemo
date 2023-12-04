import boto3
from botocore.exceptions import NoCredentialsError

# Replace 'your_access_key' and 'your_secret_key' with your AWS access key and secret key
aws_access_key = 'your_access_key'
aws_secret_key = 'your_secret_key'
aws_region = 'your_aws_region'
table_name = 'your_table_name'
item_key = 'your_item_key'

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb', aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_key, region_name=aws_region)

def put_item():
    try:
        # Put an item into DynamoDB
        table = dynamodb.Table(table_name)
        table.put_item(Item={'key': item_key, 'data': 'example_data'})
        print("Item added successfully!")
    except NoCredentialsError:
        print("Credentials not available or incorrect.")
    except Exception as e:
        print(f"An error occurred: {e}")

def get_item():
    try:
        # Get an item from DynamoDB
        table = dynamodb.Table(table_name)
        response = table.get_item(Key={'key': item_key})
        item = response.get('Item', {})
        print("Item retrieved successfully:", item)
    except NoCredentialsError:
        print("Credentials not available or incorrect.")
    except Exception as e:
        print(f"An error occurred: {e}")

def scan_table():
    try:
        # Scan the entire DynamoDB table
        table = dynamodb.Table(table_name)
        response = table.scan()
        items = response.get('Items', [])
        print("Items in the table:")
        for item in items:
            print(item)
    except NoCredentialsError:
        print("Credentials not available or incorrect.")
    except Exception as e:
        print(f"An error occurred: {e}")

def delete_item():
    try:
        # Delete an item from DynamoDB
        table = dynamodb.Table(table_name)
        table.delete_item(Key={'key': item_key})
        print("Item deleted successfully!")
    except NoCredentialsError:
        print("Credentials not available or incorrect.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
put_item()
get_item()
scan_table()
delete_item()