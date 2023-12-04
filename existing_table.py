import boto3

dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('users')

print(table.creation_date_time)
print(table.item_count)


# CREATE/PUT ITEM
table.put_item(
   Item={
        'username': 'janedoe',
        'first_name': 'Jane',
        'last_name': 'Doe',
        'age': 25,
        'account_type': 'standard_user',
    }
)

# GET ITEM
response = table.get_item(
    Key={
        'username': 'janedoe',
        'last_name': 'Doe'
    }
)
item = response['Item']
print(item)

# UPDATE ITEM

table.update_item(
    Key={
        'username': 'janedoe',
        'last_name': 'Doe'
    },
    UpdateExpression='SET age = :val1',
    ExpressionAttributeValues={
        ':val1': 26
    }
)

# DELETE ITEM
table.delete_item(
    Key={
        'username': 'janedoe',
        'last_name': 'Doe'
    }
)