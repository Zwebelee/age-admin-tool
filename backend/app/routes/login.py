from flask import Blueprint, request, jsonify, session, redirect, request, url_for, flash
from flasgger import swag_from
from ..db import db
from ..models.tooluser import Tooluser

login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
@swag_from({
    'tags': ['Login'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {'type': 'string', 'example': 'Alice'},
                    'password': {'type': 'string', 'example': '12345'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Login successful',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        401: {
            'description': 'Login failed',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    tooluser = Tooluser.query.filter_by(username=username).first()
    if tooluser and tooluser.check_password(password):
        session['username'] = username
        return jsonify({
            'message': 'Login successful'
        }), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401
