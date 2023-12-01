from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
from model import Item  

load_dotenv()

mongo_uri = os.getenv('MONGO_URI')

app = Flask(__name__)

# CORS(app)
CORS(app, origins=['http://localhost:4200'])

app.config['MONGO_URI'] = mongo_uri

app.config['MONGODB_SETTINGS'] = {
    'host': mongo_uri
}


mongo = PyMongo(app)

@app.route('/items', methods=['GET'])
def get_items():
    items = Item.objects.all()
    return jsonify({'items': [item.to_json() for item in items]})



@app.route('/items', methods=['POST'])
def post_item():   
    data = request.get_json()
    item = Item(**data)
    item.save()
    return jsonify({'message': 'Item created successfully', 'id': str(item.id)})


@app.route('/items/<id>', methods=['GET'])
def get_item(id):
    item = Item.objects(id=id).first()
    if item:
        return jsonify(item.to_json())
    else:
        return jsonify({'message': 'Item not found'}), 404


@app.route('/items/<id>', methods=['PUT'])
def put_item(id):
    item = Item.objects(id=id).first()
    if item:
        data = request.get_json()
        item.update(**data)
        return jsonify({'message': 'Item updated successfully'})
    else:
        return jsonify({'message': 'Item not found'}), 404


@app.route('/items/<id>', methods=['DELETE'])
def delete_item(id):
    item = Item.objects(id=id).first()
    if item:
        item.delete()
        return jsonify({'message': 'Item deleted successfully'})
    else:
        return jsonify({'message': 'Item not found'}), 404




if __name__ == '__main__':
    app.run(debug=True)
