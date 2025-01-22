from flask import Blueprint, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required, get_jwt
import os
from app.extensions.jwtmanager import jwt_redis_blocklist

logout_bp = Blueprint('logout', __name__)


@logout_bp.route('/logout', methods=['DELETE'])
@jwt_required(verify_type=False)
@swag_from({
    'tags': ['Authentication'],
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
    if "jti" not in token or "type" not in token:
        return jsonify(msg="Invalid Token provided"), 400

    jti = token["jti"]
    ttype = str(token["type"])
    expiry = os.getenv('JWT_ACCESS_TOKEN_EXPIRES', "3600")
    # 3600 as default if not set

    jwt_redis_blocklist.set(jti, "True", ex=expiry)  # marking jti as revoked
    return jsonify(msg=f"{ttype.capitalize()} token successfully revoked"), 200
