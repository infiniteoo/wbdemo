import boto3
from boto3.dynamodb.conditions import Key, Attr


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

# print items in table
response = table.scan()
items = response['Items']
print(items)




# BASIC QUERY
response = table.query(
    KeyConditionExpression=Key('username').eq('johndoe')
)
items = response['Items']
print(items)


# QUERY AGE < 27
response = table.query(
    KeyConditionExpression=Key('username').eq('johndoe') & Key('age').lt(27)
)
items = response['Items']
print(items)

# QUERY CHAIN CONDITIONALS
response = table.scan(
    FilterExpression=Attr('first_name').begins_with('J') & Attr('account_type').eq('anonymous')
)
items = response['Items']
print(items)


# SCANNING NESTED ATTRIBUTES
response = table.scan(
    FilterExpression=Attr('address.state').eq('CA')
)
items = response['Items']
print(items)


# DELETING A TABLE
table.delete()

