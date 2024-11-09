from flask import Blueprint, request, jsonify, session, redirect, request, url_for, flash
from flasgger import swag_from
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

refresh_bp = Blueprint('refresh', __name__)


@refresh_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)
