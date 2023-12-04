# Install pymongo:
# pip install pymongo

# Basic CRUD Operations:

from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['mycollection']

# Insert document
document = {'name': 'Item 1', 'description': 'Description 1'}
collection.insert_one(document)

# Find document
result = collection.find_one({'name': 'Item 1'})
print(result)

# Update document
collection.update_one({'name': 'Item 1'}, {'$set': {'description': 'Updated description'}})

# Delete document
collection.delete_one({'name': 'Item 1'})



# mongoengine:

# Install mongoengine:
# pip install mongoengine

# Define a Document Model:
from mongoengine import Document, StringField

class Item(Document):
    name = StringField(required=True, max_length=100)
    description = StringField(max_length=255)


# Basic CRUD Operations:
# Connect to MongoDB
from mongoengine import connect
connect('mydatabase')

# Create document
item = Item(name='Item 1', description='Description 1')
item.save()

# Retrieve document
retrieved_item = Item.objects(name='Item 1').first()
print(retrieved_item.to_json())

# Update document
retrieved_item.description = 'Updated description'
retrieved_item.save()

# Delete document
retrieved_item.delete()