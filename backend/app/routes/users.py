from flask import Blueprint, jsonify
from flasgger import swag_from

from app.models.portaluser import Portaluser

portalusers_bp = Blueprint('portalusers', __name__)


@portalusers_bp.route('/portalusers')
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
    portalusers = Portaluser.query.all()
    return jsonify([{"guid": portaluser.guid, "username": portaluser.username} for portaluser in portalusers])
