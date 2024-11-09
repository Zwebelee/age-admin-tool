from flask import Blueprint, request, jsonify, session, redirect, request, url_for, flash
from flasgger import swag_from
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity


proteced_bp = Blueprint('protected', __name__)


@proteced_bp.route('/protected', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Protected'],
    'parameters': [
        {
            'name': 'Authorization',
            'in': 'header',
            'type': 'string',
            'required': True,
            'description': 'Bearer <JWT>'
        }
    ],
    'responses': {
        200: {
            'description': 'Request successful',
            'schema': {
                'type': 'object',
                'properties': {
                    'logged_in_as': {'type': 'string'}
                }
            }
        },
        401: {
            'description': 'Unauthorized',
            'schema': {
                'type': 'object',
                'properties': {
                    'msg': {'type': 'string'}
                }
            }
        }
    }
})
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
