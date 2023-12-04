import boto3

# CREATE IAM CLIENT
iam = boto3.client('iam')

# CREATE USER
response = iam.create_user(
    UserName='christopher'
)

print(response)



# LIST USERS
response = iam.list_users()
print(response)

# WITH PAGINATION
paginator = iam.get_paginator('list_users')
for response in paginator.paginate():
    print(response)


# UPDATE USERNAME
response = iam.update_user(
    UserName='christopher',
    NewUserName='chris'
)

# GET USER
response = iam.get_user(
    UserName='chris'
)
print(response)


# DELETE USER
response = iam.delete_user(
    UserName='chris'
)
print(response)







