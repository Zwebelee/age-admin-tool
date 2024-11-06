from flask import Blueprint, request, jsonify, session, redirect, request, url_for, flash
from flasgger import swag_from
from ..db import db
from ..models.tooluser import Tooluser

logout_bp = Blueprint('logout', __name__)
@logout_bp.route('/logout', methods=['POST'])
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
    session.pop('username', None)
    return jsonify({
        'message': 'Logout successful'
    })

