import uuid
from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required

from ..models.agecomponent import Agecomponent
from ..models.agedatastore import Agedatastore
from ..db import db
from ..models.arcgisenterprise import Arcgisenterprise
from ..utils.validate_required_fields import validate_required_fields

agedatastores_bp = Blueprint('agedatastores', __name__)


@agedatastores_bp.route('/agedatastores', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Datastore', 'AGE'],
    'responses': {
        200: {
            'description': 'Retrieve the agedatastores',
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
                    'status': {'type': 'string'},
                    'capacity_gb': {'type': 'integer'},
                    'used_gb': {'type': 'integer'}
                }
            }
        },
        401: {
            'description': 'Unauthorized',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Agedatastore not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_agedatastores():
    agedatastores = Agedatastore.query.all()
    return jsonify([agedatastore.to_dict() for agedatastore in agedatastores])


@agedatastores_bp.route('/agedatastores', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Datastore', 'AGE'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string', 'example': 'Datastore Name'},
                    'alias': {'type': 'string', 'example': 'Datastore Alias'},
                    'description': {'type': 'string', 'example': 'Description'},
                    'url': {'type': 'string', 'example': 'http://url'},
                    'type': {'type': 'string', 'example': 'Type'},
                    'ishosted': {'type': 'boolean', 'example': True},
                    'status': {'type': 'string', 'example': 'Active'},
                    'capacity_gb': {'type': 'integer', 'example': 100},
                    'used_gb': {'type': 'integer', 'example': 50}
                },
                'required': ['name', 'alias', 'ishosted', 'status', 'capacity_gb', 'used_gb']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Agedatastore created',
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
                    'status': {'type': 'string'},
                    'capacity_gb': {'type': 'integer'},
                    'used_gb': {'type': 'integer'}
                }
            }
        }
    }
})
def create_agedatastore():
    data = request.get_json()
    new_agedatastore = Agedatastore(
        guid=uuid.uuid4(),
        name=data['name'],
        alias=data['alias'],
        description=data.get('description'),
        url=data.get('url'),
        type=data.get('type'),
        ishosted=data['ishosted'],
        status=data['status'],
        capacity_gb=data['capacity_gb'],
        used_gb=data['used_gb']
    )
    db.session.add(new_agedatastore)
    db.session.commit()

    # Add entry to agecomponents table
    ageguid = Arcgisenterprise.query.first().guid
    new_agecomponent = Agecomponent(
        guid=uuid.uuid4(),
        ageguid=ageguid,
        refguid=new_agedatastore.guid,
        reftype='DataStore'
    )
    db.session.add(new_agecomponent)
    db.session.commit()

    return jsonify(new_agedatastore.to_dict()), 201


@agedatastores_bp.route('/agedatastores/<uuid:guid>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Datastore', 'AGE'],
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
            'description': 'Retrieve a specific agedatastore',
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
                    'status': {'type': 'string'},
                    'capacity_gb': {'type': 'integer'},
                    'used_gb': {'type': 'integer'}
                }
            }
        },
        404: {
            'description': 'Agedatastore not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_agedatastore(guid):
    agedatastore = Agedatastore.query.get_or_404(guid)
    return jsonify(agedatastore.to_dict())


@agedatastores_bp.route('/agedatastores/<uuid:guid>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Datastore', 'AGE'],
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
                    'name': {'type': 'string', 'example': 'Datastore Name'},
                    'alias': {'type': 'string', 'example': 'Datastore Alias'},
                    'description': {'type': 'string', 'example': 'Description'},
                    'url': {'type': 'string', 'example': 'http://url'},
                    'type': {'type': 'string', 'example': 'Type'},
                    'ishosted': {'type': 'boolean', 'example': True},
                    'status': {'type': 'string', 'example': 'Active'},
                    'capacity_gb': {'type': 'integer', 'example': 100},
                    'used_gb': {'type': 'integer', 'example': 50}
                },
                'required': ['name', 'alias', 'ishosted', 'status', 'capacity_gb', 'used_gb']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Agedatastore updated',
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
                    'status': {'type': 'string'},
                    'capacity_gb': {'type': 'integer'},
                    'used_gb': {'type': 'integer'}
                }
            }
        },
        404: {
            'description': 'Agedatastore not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_agedatastore(guid):
    data = request.get_json()
    validate_required_fields(Agedatastore, data)

    agedatastore = Agedatastore.query.get_or_404(guid)
    agedatastore.name = data['name']
    agedatastore.alias = data['alias']
    agedatastore.description = data.get('description')
    agedatastore.url = data.get('url')
    agedatastore.type = data.get('type')
    agedatastore.ishosted = data['ishosted']
    agedatastore.status = data['status']
    agedatastore.capacity_gb = data['capacity_gb']
    agedatastore.used_gb = data['used_gb']
    db.session.commit()
    return jsonify(agedatastore.to_dict())


@agedatastores_bp.route('/agedatastores/<uuid:guid>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Datastore', 'AGE'],
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
            'description': 'Agedatastore deleted'
        },
        404: {
            'description': 'Agedatastore not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_agedatastore(guid):
    agedatastore = Agedatastore.query.get_or_404(guid)

    # Delete related agecomponent entries
    Agecomponent.query.filter_by(refguid=guid).delete()

    db.session.delete(agedatastore)
    db.session.commit()
    return '', 204
