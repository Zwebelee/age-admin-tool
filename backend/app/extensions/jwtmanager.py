import redis
import os
from flask_jwt_extended import JWTManager

jwt = JWTManager()

jwt_redis_blocklist = redis.StrictRedis(
    host=os.getenv('REDIS_HOST'), port=6379, db=0, decode_responses=True
)


# Callback function to check if a JWT exists in the redis blocklist
@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token_in_redis = jwt_redis_blocklist.get(jti)
    return token_in_redis is not None
