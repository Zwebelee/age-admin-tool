from flask import Blueprint, request, jsonify, session, redirect, request, url_for, flash
from flasgger import swag_from
from ..db import db
from ..models.tooluser import Tooluser

register_bp = Blueprint('register', __name__)


@register_bp.route('/register', methods=['POST'])
@swag_from({
    'tags': ['Register'],
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

    tooluser = Tooluser.query.filter_by(username=username).first()
    if tooluser:
        return jsonify({
            'message': 'User already exists'
        }), 409
    else:
        new_tooluser = Tooluser(username=username)
        new_tooluser.set_password(password)
        db.session.add(new_tooluser)
        db.session.commit()
        session['name'] = username
        return jsonify({
            'message': f'User "{username}" created'
        }), 200
