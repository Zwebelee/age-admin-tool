import logging
from flask import Blueprint, jsonify, request
from flasgger import swag_from
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, \
    verify_jwt_in_request

refresh_bp = Blueprint('refresh', __name__)


@refresh_bp.route('/refresh', methods=['POST'])
# @jwt_required(refresh=True) # Not needed since we use httpOnly cookie
@swag_from({
    'tags': ['Authentication'],
    'responses': {
        200: {
            'description': 'Token refreshed successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'access_token': {'type': 'string'}
                }
            }
        },
        401: {
            'description': 'Token refresh failed',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def refresh():
    try:
        logging.debug(f"Cookies: {request.cookies}")
        # Verify the refresh token in the request cookies
        verify_jwt_in_request(refresh=True, locations=['cookies'])
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity)
        return jsonify(access_token=access_token), 200
    except Exception as e:
        return jsonify(message=f"Token refresh failed {e}"), 401
