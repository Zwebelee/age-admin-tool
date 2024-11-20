import uuid

from flask import Blueprint, request, jsonify
from flasgger import swag_from
from ..db import db
from ..models.arcgisenterprise import Arcgisenterprise
from ..utils.validate_required_fields import validate_required_fields

arcgisenterprise_bp = Blueprint('arcgisenterprises', __name__)


@arcgisenterprise_bp.route('/arcgisenterprises', methods=['GET'])
@swag_from({
    'tags': ['AGE - Enterprises', 'AGE'],
    'responses': {
        200: {
            'description': 'Retrieve ArcGIS - Enterprises',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'name': {'type': 'string'},
                        'alias': {'type': 'string'},
                        'description': {'type': 'string'}
                    }
                }
            }
        },
        404: {
            'description': 'Arcgisenterprise entry not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_arcgisenterprises():
    arcgisenterprises = Arcgisenterprise.query.all()
    if arcgisenterprises:
        return jsonify([arcgisenterprise.to_dict() for arcgisenterprise in arcgisenterprises])


@arcgisenterprise_bp.route('/arcgisenterprises', methods=['POST'])
@swag_from({
    'tags': ['AGE - Enterprises', 'AGE'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string', 'example': 'My EnterpriseMachine Name'},
                    'alias': {'type': 'string', 'example': 'My Enterprise Alias'},
                    'description': {'type': 'string', 'example': 'This is my example description'}
                },
                'required': ['name', 'alias']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Arcgisenterprise entry created successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'alias': {'type': 'string'},
                    'description': {'type': 'string'}
                }
            }
        },
        400: {
            'description': 'Invalid input',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def create_arcgisenterprise():
    data = request.get_json()
    validate_required_fields(Arcgisenterprise, data)

    new_arcgisenterprise = Arcgisenterprise(
        guid=uuid.uuid4(),
        name=data['name'],
        alias=data['alias'],
        description=data.get('description')
    )
    db.session.add(new_arcgisenterprise)
    db.session.commit()
    return jsonify(new_arcgisenterprise.to_dict()), 201


@arcgisenterprise_bp.route('/arcgisenterprises/<uuid:guid>', methods=['GET'])
@swag_from({
    'tags': ['AGE - Enterprises', 'AGE'],
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
            'description': 'Retrieve a specific ArcGIS - Enterprise',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'alias': {'type': 'string'},
                    'description': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Arcgisenterprise entry not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_arcgisenterprise(guid):
    arcgisenterprise = Arcgisenterprise.query.get_or_404(guid)
    return jsonify(arcgisenterprise.to_dict())


@arcgisenterprise_bp.route('/arcgisenterprises/<uuid:guid>', methods=['PUT'])
@swag_from({
    'tags': ['AGE - Enterprises', 'AGE'],
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
                    'name': {'type': 'string', 'example': 'My EnterpriseMachine Name'},
                    'alias': {'type': 'string', 'example': 'My Enterprise Alias'},
                    'description': {'type': 'string', 'example': 'This is my example description'}
                },
                'required': ['name', 'alias']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Arcgisenterprise entry updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'alias': {'type': 'string'},
                    'description': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Arcgisenterprise entry not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_arcgisenterprise(guid):
    data = request.get_json()
    validate_required_fields(Arcgisenterprise, data)

    arcgisenterprise = Arcgisenterprise.query.get_or_404(guid)
    arcgisenterprise.name = data['name']
    arcgisenterprise.alias = data['alias']
    arcgisenterprise.description = data.get('description')
    db.session.commit()
    return jsonify(arcgisenterprise.to_dict())


@arcgisenterprise_bp.route('/arcgisenterprises/<uuid:guid>', methods=['DELETE'])
@swag_from({
    'tags': ['AGE - Enterprises', 'AGE'],
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
            'description': 'Arcgisenterprise entry deleted'
        },
        404: {
            'description': 'Arcgisenterprise entry not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_arcgisenterprise(guid):
    arcgisenterprise = Arcgisenterprise.query.get_or_404(guid)
    db.session.delete(arcgisenterprise)
    db.session.commit()
    return '', 204
