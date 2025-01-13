from flasgger import swag_from
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from ..models.toolrole import ToolRole

toolroles_bp = Blueprint('toolroles', __name__)

@toolroles_bp.route('/toolroles', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Tool Roles'],
    'responses': {
        200: {
            'description': 'Retrieve all tool roles',
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
def get_all_toolroles():
    roles = ToolRole.query.all()
    return jsonify([role.to_dict() for role in roles])