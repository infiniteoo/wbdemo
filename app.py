from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
from openai import OpenAI
import os
from flask import jsonify

from dotenv import load_dotenv

load_dotenv()


openAIKey = os.getenv("OPEN_AI")
openOrg = os.getenv("ORG")

client = OpenAI(api_key=openAIKey, organization=openOrg)

app = Flask(__name__)
CORS(app)

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.Table('game_of_thrones')

print(table.creation_date_time)
print(table.item_count)

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

    promptString = "This is a photo of a Game of Thrones character named " + data['name'] + ". They are a " + data['characterClass'] + " from the house " + data['house'] + ". They have " + data['strength'] + " strength, " + data['intelligence'] + " intelligence, and " + data['charisma'] + " charisma.  Please generate a cool looking photo of them.  overlay the character's name, house and stats.  use house sigil as background."
    
    response = client.images.generate(
        model="dall-e-3",
        prompt=promptString,
        size="1024x1024",
        quality="standard",
        n=1,
    ) 
    
    image_url = response.data[0].url
    print(image_url)

    # save image url to dynamodb
    table.update_item(
        Key={
            'name': data['name']
        },
        UpdateExpression='SET image_url = :val1',
        ExpressionAttributeValues={
            ':val1': image_url
        }
    )
    return jsonify({"url": image_url})
   


    

if __name__ == '__main__':
    app.run(debug=True)
