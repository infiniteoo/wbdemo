import boto3
from botocore.exceptions import NoCredentialsError

# Replace 'your_access_key' and 'your_secret_key' with your AWS access key and secret key
aws_access_key = 'your_access_key'
aws_secret_key = 'your_secret_key'
aws_region = 'your_aws_region'
bucket_name = 'your_bucket_name'
file_path = 'path/to/your/file.txt'

# Initialize S3 client
s3 = boto3.client('s3', aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_key, region_name=aws_region)

def upload_file():
    try:
        # Upload a file to S3
        s3.upload_file(file_path, bucket_name, file_path.split('/')[-1])
        print("File uploaded successfully!")
    except FileNotFoundError:
        print("The file was not found.")
    except NoCredentialsError:
        print("Credentials not available or incorrect.")

def download_file():
    try:
        # Download a file from S3
        s3.download_file(bucket_name, file_path.split('/')[-1], 'downloaded_file.txt')
        print("File downloaded successfully!")
    except NoCredentialsError:
        print("Credentials not available or incorrect.")
    except Exception as e:
        print(f"An error occurred: {e}")

def list_files():
    try:
        # List files in a bucket
        response = s3.list_objects(Bucket=bucket_name)
        files = [obj['Key'] for obj in response.get('Contents', [])]
        print("Files in the bucket:")
        for file in files:
            print(file)
    except NoCredentialsError:
        print("Credentials not available or incorrect.")
    except Exception as e:
        print(f"An error occurred: {e}")

def delete_file():
    try:
        # Delete a file from S3
        s3.delete_object(Bucket=bucket_name, Key=file_path.split('/')[-1])
        print("File deleted successfully!")
    except NoCredentialsError:
        print("Credentials not available or incorrect.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
upload_file()
download_file()
list_files()
delete_file()
