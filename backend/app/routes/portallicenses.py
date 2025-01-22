from flasgger import swag_from
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.models.portallicense import Portallicense
from ..db import db
import uuid

portallicenses_bp = Blueprint('portallicenses', __name__)


@portallicenses_bp.route('/portallicenses', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portal - Licenses', 'AGE', 'AGE - Portal'],
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
    return jsonify([portallicense.to_dict() for portallicense in portallicenses])


@portallicenses_bp.route('/portallicenses', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portal - Licenses', 'AGE', 'AGE - Portal'],
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


@portallicenses_bp.route('/portallicenses/<uuid:guid>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portal - Licenses', 'AGE', 'AGE - Portal'],
    'parameters': [
        {
            'name': 'guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        }
    ],
    'responses': {
        200: {
            'description': 'Retrieve a specific portal license',
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
def get_portallicense(guid):
    portallicense = Portallicense.query.get_or_404(guid)
    return jsonify(portallicense.to_dict())


@portallicenses_bp.route('/portallicenses/<uuid:guid>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portal - Licenses', 'AGE', 'AGE - Portal'],
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

    # Validate input data
    required_fields = ['id', 'name', 'level', 'state', 'maxusers', 'currentusers']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'Missing required field: {field}'}), 400

    # Update fields if present in request data
    portallicense.id = data.get('id', portallicense.id)
    portallicense.name = data.get('name', portallicense.name)
    portallicense.description = data.get('description', portallicense.description)
    portallicense.level = data.get('level', portallicense.level)
    portallicense.state = data.get('state', portallicense.state)
    portallicense.maxusers = data.get('maxusers', portallicense.maxusers)
    portallicense.currentusers = data.get('currentusers', portallicense.currentusers)

    try:
        db.session.commit()
        return jsonify(portallicense.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Internal server error {e}'}), 500


@portallicenses_bp.route('/portallicenses/<uuid:guid>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portal - Licenses', 'AGE', 'AGE - Portal'],
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
