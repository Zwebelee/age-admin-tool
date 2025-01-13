from flask import Blueprint, jsonify, session, request
from flasgger import swag_from
from flask_jwt_extended import jwt_required

from ..db import db
from ..models.tooluser import ToolUser

register_bp = Blueprint('register', __name__)


@register_bp.route('/register', methods=['POST'])
@jwt_required()
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
                    'username': {'type': 'string'},
                    'password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'User created',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        409: {
            'description': 'User already exists',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def register():
    username = request.json.get('username')
    password = request.json.get('password')

    tooluser = ToolUser.query.filter_by(username=username).first()
    if tooluser:
        return jsonify({
            'message': 'User already exists'
        }), 409
    else:
        new_tooluser = ToolUser(username=username)
        new_tooluser.set_password(password)
        db.session.add(new_tooluser)
        db.session.commit()
        session['name'] = username
        return jsonify({
            'message': f'User "{username}" created'
        }), 200
