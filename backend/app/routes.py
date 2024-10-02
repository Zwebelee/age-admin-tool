# app/routes.py
from flask import Blueprint, jsonify, request
from flasgger import swag_from
from .models import User, Test
from . import db

main = Blueprint('main', __name__)

@main.route('/')
@swag_from({
    'responses': {
        200: {
            'description': 'Welcome message',
            'content': {
                'text/plain': {
                    'example': 'Welcome to the Flask MariaDB app!'
                }
            }
        }
    }
})
def home():
    return "Welcome to the Flask MariaDB app!"

@main.route('/users')
@swag_from({
    'responses': {
        200: {
            'description': 'List of users',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'name': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_users():
    users = User.query.all()
    print(users)
    return jsonify([{"guid": user.guid, "name": user.name} for user in users])

@main.route('/tests')
def get_test():
    tests = Test.query.all()
    print(tests)
    return jsonify([{"id": test.id, "nr": test.nr} for test in tests])

@main.route('/test', methods=['POST'])
def add_test():
    data = request.get_json()
    new_test = Test(id=data['id'], nr=data['nr'])
    db.session.add(new_test)
    db.session.commit()
    return jsonify({"message": "Test object created successfully"}), 201