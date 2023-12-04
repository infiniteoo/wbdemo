from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3

app = Flask(__name__)
CORS(app, origins=['http://localhost:4200'])

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

    

if __name__ == '__main__':
    app.run(debug=True)
