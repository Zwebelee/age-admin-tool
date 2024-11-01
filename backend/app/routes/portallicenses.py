from flasgger import swag_from
from flask import Blueprint, jsonify

from app.models.portallicenses import Portallicense

portallicenses_bp = Blueprint('portallicenses', __name__)

@portallicenses_bp.route('/portallicenses')
@swag_from({
    'tags': ['Portallicenses'],
    'responses': {
        200: {
            'description': 'List of portal licenses',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'id': {'type': 'string'},
                        'name': {'type': 'string'},
                        'description': {'type': 'string'},
                        'level': {'type': 'string'},
                        'state': {'type': 'string'},
                        'maxusers': {'type': 'integer'}
                    }
                }
            }
        }
    }
})
def get_portallicenses():
    portallicenses = Portallicense.query.all()
    return jsonify([license.to_dict() for license in portallicenses])
