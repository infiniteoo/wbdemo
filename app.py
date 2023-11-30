from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/your_db_name'
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
