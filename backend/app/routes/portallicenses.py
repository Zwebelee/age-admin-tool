from flasgger import swag_from
from flask import Blueprint, jsonify, request
from app.models.portallicense import Portallicense
from app import db
import uuid

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
                        'maxusers': {'type': 'integer'},
                        'currentusers': {'type': 'integer'}
                    }
                }
            }
        }
    }
})
def get_portallicenses():
    portallicenses = Portallicense.query.all()
    return jsonify([license.to_dict() for license in portallicenses])

@portallicenses_bp.route('/portallicenses', methods=['POST'])
@swag_from({
    'tags': ['Portallicenses'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'string', 'example': 'license1'},
                    'name': {'type': 'string', 'example': 'License Name'},
                    'description': {'type': 'string', 'example': 'Description'},
                    'level': {'type': 'string', 'example': 'Level'},
                    'state': {'type': 'string', 'example': 'State'},
                    'maxusers': {'type': 'integer', 'example': 100},
                    'currentusers': {'type': 'integer', 'example': 0}
                },
                'required': ['id', 'name', 'level', 'state', 'maxusers', 'currentusers']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Portallicense created',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'id': {'type': 'string'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'level': {'type': 'string'},
                    'state': {'type': 'string'},
                    'maxusers': {'type': 'integer'},
                    'currentusers': {'type': 'integer'}
                }
            }
        }
    }
})
def create_portallicense():
    data = request.get_json()
    new_portallicense = Portallicense(
        guid=uuid.uuid4(),
        id=data['id'],
        name=data['name'],
        description=data.get('description'),
        level=data['level'],
        state=data['state'],
        maxusers=data['maxusers'],
        currentusers=data['currentusers']
    )
    db.session.add(new_portallicense)
    db.session.commit()
    return jsonify(new_portallicense.to_dict()), 201

@portallicenses_bp.route('/portallicenses/<uuid:guid>', methods=['PUT'])
@swag_from({
    'tags': ['Portallicenses'],
    'parameters': [
        {
            'name': 'guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        },
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'string', 'example': 'license1'},
                    'name': {'type': 'string', 'example': 'License Name'},
                    'description': {'type': 'string', 'example': 'Description'},
                    'level': {'type': 'string', 'example': 'Level'},
                    'state': {'type': 'string', 'example': 'State'},
                    'maxusers': {'type': 'integer', 'example': 100},
                    'currentusers': {'type': 'integer', 'example': 0}
                },
                'required': ['id', 'name', 'level', 'state', 'maxusers', 'currentusers']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Portallicense updated',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'id': {'type': 'string'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'level': {'type': 'string'},
                    'state': {'type': 'string'},
                    'maxusers': {'type': 'integer'},
                    'currentusers': {'type': 'integer'}
                }
            }
        },
        404: {
            'description': 'Portallicense not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_portallicense(guid):
    data = request.get_json()
    portallicense = Portallicense.query.get_or_404(guid)
    portallicense.id = data['id']
    portallicense.name = data['name']
    portallicense.description = data.get('description')
    portallicense.level = data['level']
    portallicense.state = data['state']
    portallicense.maxusers = data['maxusers']
    portallicense.currentusers = data['currentusers']
    db.session.commit()
    return jsonify(portallicense.to_dict())

@portallicenses_bp.route('/portallicenses/<uuid:guid>', methods=['DELETE'])
@swag_from({
    'tags': ['Portallicenses'],
    'parameters': [
        {
            'name': 'guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        }
    ],
    'responses': {
        204: {
            'description': 'Portallicense deleted'
        },
        404: {
            'description': 'Portallicense not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_portallicense(guid):
    portallicense = Portallicense.query.get_or_404(guid)
    db.session.delete(portallicense)
    db.session.commit()
    return '', 204
