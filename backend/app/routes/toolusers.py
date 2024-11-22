from flasgger import swag_from
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.tooluser import Tooluser

toolusers_bp = Blueprint('toolusers', __name__)

@toolusers_bp.route('/toolusers', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
    'responses': {
        200: {
            'description': 'Profile information retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'username': {'type': 'string'},
                    'language': {'type': 'string'},
                    'theme': {'type': 'string'},
                    }
            }
        },
        404: {
            'description': 'User not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_profile():
    username = get_jwt_identity()
    tooluser = Tooluser.query.filter_by(username=username).first()
    if tooluser:
        return jsonify(tooluser.to_dict()), 200
    else:
        return jsonify({"message": "User not found"}), 404