from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()

mongo_uri = os.getenv('MONGO_URI')

app = Flask(__name__)
app.config['MONGO_URI'] = mongo_uri
mongo = PyMongo(app)

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify({'message': 'Get items endpoint'})


@app.route('/items', methods=['POST'])
def post_item():   
    return jsonify({'message': 'Post item endpoint'})


@app.route('/items/<id>', methods=['GET'])
def get_item(id):
    return jsonify({'message': 'Get item endpoint'})

@app.route('/items/<id>', methods=['PUT'])
def put_item(id):
    return jsonify({'message': 'Put item endpoint'})

@app.route('/items/<id>', methods=['DELETE'])
def delete_item(id):
    return jsonify({'message': 'Delete item endpoint'})



if __name__ == '__main__':
    app.run(debug=True)
