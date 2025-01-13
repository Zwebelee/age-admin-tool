from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_jwt_extended import create_access_token, create_refresh_token, get_csrf_token
from ..models.tooluser import ToolUser

login_bp = Blueprint('login', __name__)


@login_bp.route('/login', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
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
    tooluser = ToolUser.query.filter_by(username=username).first()

    if tooluser and tooluser.check_password(password):
        # expiration is defined in jwt-manager via environment variable
        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)
        csrf_token = get_csrf_token(refresh_token)
        return jsonify(access_token=access_token, refresh_token=refresh_token, csrf_token=csrf_token), 200

    else:
        return jsonify({"message": "Invalid username or password"}), 401
