import uuid
from flask import Blueprint, request, jsonify
from flasgger import swag_from
from ..models.agecomponent import Agecomponent
from ..models.agedatastore import Agedatastore
from ..db import db
from ..models.arcgisenterprise import Arcgisenterprise
from ..utils.validate_required_fields import validate_required_fields

agedatastore_bp = Blueprint('agedatastore', __name__)


@agedatastore_bp.route('/agedatastore', methods=['GET'])
@swag_from({
    'tags': ['Agedatastore'],
    'responses': {
        200: {
            'description': 'Retrieve the agedatastore',
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
def get_agedatastores():
    agedatastores = Agedatastore.query.all()
    return jsonify([agedatastore.to_dict() for agedatastore in agedatastores])


@agedatastore_bp.route('/agedatastore', methods=['POST'])
@swag_from({
    'tags': ['Agedatastore'],
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


@agedatastore_bp.route('/agedatastore/<uuid:guid>', methods=['PUT'])
@swag_from({
    'tags': ['Agedatastore'],
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


@agedatastore_bp.route('/agedatastore/<uuid:guid>', methods=['DELETE'])
@swag_from({
    'tags': ['Agedatastore'],
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
