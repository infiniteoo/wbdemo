from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from openai import OpenAI
import os
from flask import jsonify
import requests
from dotenv import load_dotenv
from io import BytesIO

load_dotenv()

openAIKey = os.getenv("OPEN_AI")
openOrg = os.getenv("ORG")

client = OpenAI(api_key=openAIKey, organization=openOrg)

app = Flask(__name__)
CORS(app)

s3 = boto3.client('s3')
bucket_name = "gotcharcreator"

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.Table('game_of_thrones')

print(table.creation_date_time)
print(table.item_count)

@app.route('/deletechar/<character>', methods=['DELETE'])
def delete_char(character):
    print('character', character)
    response = table.delete_item(
        Key={
            'name': character
        }
    )
    return jsonify(response)
    
   
 
   

@app.route('/create-char', methods=['POST'])
def create_char():
    data = request.get_json()
    print('data', data)
    
    table.put_item(
        Item={
            'name': data['name'],
            'house': data['house'],
            'characterClass': data['characterClass'],
            'strength': data['strength'],
            'intelligence': data['intelligence'],
            'charisma': data['charisma']  
        }
    )
    return jsonify(data)

@app.route('/get-chars', methods=['GET'])
def get_chars():
    response = table.scan()
    items = response['Items']
    return jsonify(items)


@app.route('/get-image',  methods=['POST'])
def get_image():
    data = request.get_json()
    print('data', data)

    # Query DynamoDB for existing image URL
    response = table.get_item(
        Key={
            'name': data['name']
        }
    )
    item = response.get('Item', {})

    # Check if image URL already exists
    if 'image_url' in item:
        print("Existing image URL found")
        return jsonify({"url": item['image_url']})
    
    # If image URL does not exist, generate new image   
    promptString = "This is a photo of a Game of Thrones character named " + data['name'] + ". They are a " + data['characterClass'] + " from the house " + data['house'] + ". They have " + data['strength'] + " strength, " + data['intelligence'] + " intelligence, and " + data['charisma'] + " charisma.  Please generate a cool looking photo of them.  overlay the character's name, house and stats.  use house sigil as background."
    
    response = client.images.generate(
        model="dall-e-3",
        prompt=promptString,
        size="1024x1024",
        quality="standard",
        n=1,
    ) 
    
    dall_e_image_url = response.data[0].url
    
    # Download the image
    response = requests.get(dall_e_image_url)
    image = BytesIO(response.content)

      # Upload to S3
    s3_image_key = f"game_of_thrones/{data['name']}.png" 
    s3.upload_fileobj(image, bucket_name, s3_image_key)

    # Construct the S3 URL
    s3_image_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_image_key}"

    # Save S3 URL to DynamoDB
    table.update_item(
        Key={'name': data['name']},
        UpdateExpression='SET image_url = :val1',
        ExpressionAttributeValues={':val1': s3_image_url}
    )
    return jsonify({"url": s3_image_url})
   


    

if __name__ == '__main__':
    app.run(debug=True)
