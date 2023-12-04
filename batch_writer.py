import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

# MANUAL BATCH WRITER
with table.batch_writer() as batch:
    batch.put_item(
        Item={
            'account_type': 'anonymous',
            'username': 'johndoe',
            'first_name': 'John',
            'last_name': 'Doe',
            'age': 25,
            'address': {
                'road': '1 Jefferson Street',
                'city': 'Los Angeles',
                'state': 'CA',
                'zipcode': 90001
            }
        }
    )

    batch.put_item(
        Item={
            'account_type': 'anonymous',
            'username': 'bobsmith',
            'first_name': 'Bob',
            'last_name':  'Smith',
            'age': 18,
            'address': {
                'road': '1 Jefferson Street',
                'city': 'Los Angeles',
                'state': 'CA',
                'zipcode': 90001
            }
        }
    )

    batch.put_item(
        Item={
            'account_type': 'anonymous',
            'username': 'alicedoe',
            'first_name': 'Alice',
            'last_name': 'Doe',
            'age': 27,
            'address': {
                'road': '1 Jefferson Street',
                'city': 'Los Angeles',
                'state': 'CA',
                'zipcode': 90001
            }
        }
    )

# AUTOMATIC BATCH WRITER
with table.batch_writer() as batch:
    for i in range(50):
        batch.put_item(
            Item={
                'account_type': 'anonymous',
                'username': 'user' + str(i),
                'first_name': 'unknown',
                'last_name': 'unknown'
            }
        )

# PROTECT DUPLICATE WRITES
with table.batch_writer(overwrite_by_pkeys=['partition_key', 'sort_key']) as batch:
    batch.put_item(
        Item={
            'partition_key': 'p1',
            'sort_key': 's1',
            'other': '111',
        }
    )
    batch.put_item(
        Item={
            'partition_key': 'p1',
            'sort_key': 's1',
            'other': '222',
        }
    )
    batch.delete_item(
        Key={
            'partition_key': 'p1',
            'sort_key': 's2'
        }
    )
    batch.put_item(
        Item={
            'partition_key': 'p1',
            'sort_key': 's2',
            'other': '444',
        }
    )



