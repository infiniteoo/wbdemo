from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/your_db_name'
mongo = PyMongo(app)

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify({'message': 'Get items endpoint'})



if __name__ == '__main__':
    app.run(debug=True)
