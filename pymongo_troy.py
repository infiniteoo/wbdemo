from pymongo import MongoClient
import dotenv
import os

dotenv.load_dotenv()

# MongoDB Atlas connection string
MONGO_URI = os.getenv('MONGO_URI')
print (MONGO_URI)


# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)

# Create database
db = client['pymongo_troy']

# Create collection
collection = db['pymongo_troy']

# Insert document
collection.insert_one({'name': 'Troy', 'age': 30, 'city': 'San Francisco'})

# Find document
print(collection.find_one({'name': 'Troy'}))




