from flask import Blueprint, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required, get_jwt_identity

validatetoken_bp = Blueprint('validate-token', __name__)


@validatetoken_bp.route('/validate-token', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Authentication'],
    'responses': {
        200: {
            'description': 'Token is valid',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        401: {
            'description': 'Token is invalid or expired',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def validate_token():
    identity = get_jwt_identity()
    return jsonify(message="Token is valid")
