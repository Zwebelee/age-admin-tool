import uuid

from flask import Blueprint, request, jsonify
from flasgger import swag_from

from ..models.agecomponent import Agecomponent
from ..models.ageserver import Ageserver
from ..db import db
from ..models.arcgisenterprise import Arcgisenterprise
from ..utils.validate_required_fields import validate_required_fields

ageservers_bp = Blueprint('ageservers', __name__)


@ageservers_bp.route('/ageservers', methods=['GET'])
@swag_from({
    'tags': ['AGE - Servers', 'AGE'],
    'responses': {
        200: {
            'description': 'Retrieve all ageservers',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'id': {'type': 'string'},
                        'name': {'type': 'string'},
                        'adminUrl': {'type': 'string'},
                        'url': {'type': 'string'},
                        'isHosted': {'type': 'boolean'},
                        'serverType': {'type': 'string'},
                        'serverRole': {'type': 'string'},
                        'serverFunction': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_ageservers():
    ageservers = Ageserver.query.all()
    return jsonify([ageserver.to_dict() for ageserver in ageservers])


@ageservers_bp.route('/ageservers', methods=['POST'])
@swag_from({
    'tags': ['AGE - Servers', 'AGE'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'string', 'example': 'server1'},
                    'name': {'type': 'string', 'example': 'Server Name'},
                    'adminUrl': {'type': 'string', 'example': 'http://admin.url'},
                    'url': {'type': 'string', 'example': 'http://url'},
                    'isHosted': {'type': 'boolean', 'example': True},
                    'serverType': {'type': 'string', 'example': 'Type'},
                    'serverRole': {'type': 'string', 'example': 'Role'},
                    'serverFunction': {'type': 'string', 'example': 'Function'}
                },
                'required': ['id', 'name', 'adminUrl', 'isHosted', 'serverType', 'serverRole']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Ageserver created',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'id': {'type': 'string'},
                    'name': {'type': 'string'},
                    'adminUrl': {'type': 'string'},
                    'url': {'type': 'string'},
                    'isHosted': {'type': 'boolean'},
                    'serverType': {'type': 'string'},
                    'serverRole': {'type': 'string'},
                    'serverFunction': {'type': 'string'}
                }
            }
        }
    }
})
def create_ageserver():
    data = request.get_json()
    new_ageserver = Ageserver(
        guid=uuid.uuid4(),
        id=data['id'],
        name=data['name'],
        adminUrl=data['adminUrl'],
        url=data.get('url'),
        isHosted=data['isHosted'],
        serverType=data['serverType'],
        serverRole=data['serverRole'],
        serverFunction=data.get('serverFunction')
    )
    db.session.add(new_ageserver)
    db.session.commit()

    # Add entry to agecomponents table
    ageguid = Arcgisenterprise.query.first().guid
    new_agecomponent = Agecomponent(
        guid=uuid.uuid4(),
        ageguid=ageguid,
        refguid=new_ageserver.guid,
        reftype='Server'
    )
    db.session.add(new_agecomponent)
    db.session.commit()

    return jsonify(new_ageserver.to_dict()), 201


@ageservers_bp.route('/ageservers/<uuid:guid>', methods=['GET'])
@swag_from({
    'tags': ['AGE - Servers', 'AGE'],
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
            'description': 'Retrieve a specific ageserver',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'id': {'type': 'string'},
                    'name': {'type': 'string'},
                    'adminUrl': {'type': 'string'},
                    'url': {'type': 'string'},
                    'isHosted': {'type': 'boolean'},
                    'serverType': {'type': 'string'},
                    'serverRole': {'type': 'string'},
                    'serverFunction': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Ageserver not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_ageserver(guid):
    ageserver = Ageserver.query.get_or_404(guid)
    return jsonify(ageserver.to_dict())


@ageservers_bp.route('/ageservers/<uuid:guid>', methods=['PUT'])
@swag_from({
    'tags': ['AGE - Servers', 'AGE'],
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
                    'id': {'type': 'string', 'example': 'server1'},
                    'name': {'type': 'string', 'example': 'Server Name'},
                    'adminUrl': {'type': 'string', 'example': 'http://admin.url'},
                    'url': {'type': 'string', 'example': 'http://url'},
                    'isHosted': {'type': 'boolean', 'example': True},
                    'serverType': {'type': 'string', 'example': 'Type'},
                    'serverRole': {'type': 'string', 'example': 'Role'},
                    'serverFunction': {'type': 'string', 'example': 'Function'}
                },
                'required': ['id', 'name', 'adminUrl', 'isHosted', 'serverType', 'serverRole']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Ageserver updated',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'id': {'type': 'string'},
                    'name': {'type': 'string'},
                    'adminUrl': {'type': 'string'},
                    'url': {'type': 'string'},
                    'isHosted': {'type': 'boolean'},
                    'serverType': {'type': 'string'},
                    'serverRole': {'type': 'string'},
                    'serverFunction': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Ageserver not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_ageserver(guid):
    data = request.get_json()
    validate_required_fields(Ageserver, data)

    ageserver = Ageserver.query.get_or_404(guid)
    ageserver.id = data['id']
    ageserver.name = data['name']
    ageserver.adminUrl = data['adminUrl']
    ageserver.url = data.get('url')
    ageserver.isHosted = data['isHosted']
    ageserver.serverType = data['serverType']
    ageserver.serverRole = data['serverRole']
    ageserver.serverFunction = data.get('serverFunction')
    db.session.commit()
    return jsonify(ageserver.to_dict())


@ageservers_bp.route('/ageservers/<uuid:guid>', methods=['DELETE'])
@swag_from({
    'tags': ['AGE - Servers', 'AGE'],
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
            'description': 'Ageserver deleted'
        },
        404: {
            'description': 'Ageserver not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_ageserver(guid):
    ageserver = Ageserver.query.get_or_404(guid)

    # Delete related agecomponent entries
    Agecomponent.query.filter_by(refguid=guid).delete()

    db.session.delete(ageserver)
    db.session.commit()
    return '', 204
