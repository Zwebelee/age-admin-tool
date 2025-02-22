import uuid

from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required

from ..models.agecomponent import Agecomponent
from ..models.ageportal import Ageportal
from ..db import db
from ..models.arcgisenterprise import Arcgisenterprise
from ..utils.validate_required_fields import validate_required_fields

ageportals_bp = Blueprint('ageportals', __name__)


@ageportals_bp.route('/ageportals', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portals', 'AGE'],
    'responses': {
        200: {
            'description': 'Retrieve the ageportals',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'alias': {'type': 'string'},
                    'description': {'type': 'string'},
                    'url': {'type': 'string'},
                    'type': {'type': 'string'},
                    'ishosted': {'type': 'boolean'},
                    'status': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Ageportal not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_ageportals():
    ageportals = Ageportal.query.all()
    return jsonify([ageportal.to_dict() for ageportal in ageportals])


@ageportals_bp.route('/ageportals', methods=['POST'])
@swag_from({
    'tags': ['AGE - Portals', 'AGE'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string', 'example': 'Portal Name'},
                    'alias': {'type': 'string', 'example': 'Portal Alias'},
                    'description': {'type': 'string', 'example': 'Description'},
                    'url': {'type': 'string', 'example': 'http://url'},
                    'type': {'type': 'string', 'example': 'Type'},
                    'ishosted': {'type': 'boolean', 'example': True},
                    'status': {'type': 'string', 'example': 'Active'}
                },
                'required': ['name', 'alias', 'ishosted', 'status']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Ageportal created',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'alias': {'type': 'string'},
                    'description': {'type': 'string'},
                    'url': {'type': 'string'},
                    'type': {'type': 'string'},
                    'ishosted': {'type': 'boolean'},
                    'status': {'type': 'string'}
                }
            }
        }
    }
})
def create_ageportal():
    data = request.get_json()
    new_ageportal = Ageportal(
        guid=uuid.uuid4(),
        name=data['name'],
        alias=data['alias'],
        description=data.get('description'),
        url=data.get('url'),
        type=data.get('type'),
        ishosted=data['ishosted'],
        status=data['status']
    )
    db.session.add(new_ageportal)
    db.session.commit()

    # Add entry to agecomponents table
    ageguid = Arcgisenterprise.query.first().guid
    new_agecomponent = Agecomponent(
        guid=uuid.uuid4(),
        ageguid=ageguid,
        refguid=new_ageportal.guid,
        reftype='Portal'
    )
    db.session.add(new_agecomponent)
    db.session.commit()

    return jsonify(new_ageportal.to_dict()), 201


@ageportals_bp.route('/ageportals/<uuid:guid>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portals', 'AGE'],
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
            'description': 'Retrieve a specific ageportal',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'alias': {'type': 'string'},
                    'description': {'type': 'string'},
                    'url': {'type': 'string'},
                    'type': {'type': 'string'},
                    'ishosted': {'type': 'boolean'},
                    'status': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Ageportal not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_ageportal(guid):
    ageportal = Ageportal.query.get_or_404(guid)
    return jsonify(ageportal.to_dict())


@ageportals_bp.route('/ageportals/<uuid:guid>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portals', 'AGE'],
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
                    'name': {'type': 'string', 'example': 'Portal Name'},
                    'alias': {'type': 'string', 'example': 'Portal Alias'},
                    'description': {'type': 'string', 'example': 'Description'},
                    'url': {'type': 'string', 'example': 'http://url'},
                    'type': {'type': 'string', 'example': 'Type'},
                    'ishosted': {'type': 'boolean', 'example': True},
                    'status': {'type': 'string', 'example': 'Active'}
                },
                'required': ['name', 'alias', 'ishosted', 'status']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Ageportal updated',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'alias': {'type': 'string'},
                    'description': {'type': 'string'},
                    'url': {'type': 'string'},
                    'type': {'type': 'string'},
                    'ishosted': {'type': 'boolean'},
                    'status': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Ageportal not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_ageportal(guid):
    data = request.get_json()
    validate_required_fields(Ageportal, data)

    ageportal = Ageportal.query.get_or_404(guid)
    ageportal.name = data['name']
    ageportal.alias = data['alias']
    ageportal.description = data.get('description')
    ageportal.url = data.get('url')
    ageportal.type = data.get('type')
    ageportal.ishosted = data['ishosted']
    ageportal.status = data['status']
    db.session.commit()
    return jsonify(ageportal.to_dict())


@ageportals_bp.route('/ageportals/<uuid:guid>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portals', 'AGE'],
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
            'description': 'Ageportal deleted'
        },
        404: {
            'description': 'Ageportal not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_ageportal(guid):
    ageportal = Ageportal.query.get_or_404(guid)

    # Delete related agecomponent entries
    Agecomponent.query.filter_by(refguid=guid).delete()

    db.session.delete(ageportal)
    db.session.commit()
    return '', 204
