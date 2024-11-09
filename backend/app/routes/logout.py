from flask import Blueprint, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required, get_jwt
import os

from app.extensions.jwtmanager import jwt_redis_blocklist

logout_bp = Blueprint('logout', __name__)

@logout_bp.route('/logout', methods=['DELETE'])
@jwt_required(verify_type=False)
@swag_from({
    'tags': ['Logout'],
    'responses': {
        200: {
            'description': 'Logout successful',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def logout():
    token = get_jwt()
    jti = token["jti"]
    ttype = token["type"]
    jwt_redis_blocklist.set(jti, "", ex=os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    return jsonify(msg=f"{ttype.capitalize()} token successfully revoked")
