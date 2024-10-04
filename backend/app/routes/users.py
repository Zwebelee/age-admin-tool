from flask import Blueprint, jsonify
from flasgger import swag_from
from ..models import User

users_bp = Blueprint('users', __name__)


@users_bp.route('/users')
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
    return jsonify([{"guid": user.guid, "name": user.name} for user in users])
