import uuid
from flask import Blueprint, request, jsonify
from flasgger import swag_from
from ..models.agecomponent import Agecomponent
from ..models.agewebadaptor import Agewebadaptor
from ..db import db
from ..models.arcgisenterprise import Arcgisenterprise
from ..utils.validate_required_fields import validate_required_fields

agewebadaptor_bp = Blueprint('agewebadaptor', __name__)


@agewebadaptor_bp.route('/agewebadaptors', methods=['GET'])
@swag_from({
    'tags': ['AGE - Webadaptors', 'AGE'],
    'responses': {
        200: {
            'description': 'Retrieve the agewebadaptor',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'machineName': {'type': 'string'},
                    'machineIP': {'type': 'string'},
                    'webAdaptorURL': {'type': 'string'},
                    'id': {'type': 'string'},
                    'description': {'type': 'string'},
                    'httpPort': {'type': 'integer'},
                    'httpsPort': {'type': 'integer'},
                    'refreshServerListInterval': {'type': 'integer'},
                    'reconnectServerOnFailureInterval': {'type': 'integer'}
                }
            }
        },
        404: {
            'description': 'Agewebadaptor not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_agewebadaptors():
    agewebadaptors = Agewebadaptor.query.all()
    return jsonify([agewebadaptor.to_dict() for agewebadaptor in agewebadaptors])


@agewebadaptor_bp.route('/agewebadaptors', methods=['POST'])
@swag_from({
    'tags': ['AGE - Webadaptors', 'AGE'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'machineName': {'type': 'string', 'example': 'Machine Name'},
                    'machineIP': {'type': 'string', 'example': '192.168.1.1'},
                    'webAdaptorURL': {'type': 'string', 'example': 'http://webadaptor.url'},
                    'id': {'type': 'string', 'example': 'webadaptor1'},
                    'description': {'type': 'string', 'example': 'Description'},
                    'httpPort': {'type': 'integer', 'example': 80},
                    'httpsPort': {'type': 'integer', 'example': 443},
                    'refreshServerListInterval': {'type': 'integer', 'example': 10},
                    'reconnectServerOnFailureInterval': {'type': 'integer', 'example': 5}
                },
                'required': ['machineName', 'machineIP', 'webAdaptorURL', 'id', 'httpPort', 'httpsPort',
                             'refreshServerListInterval', 'reconnectServerOnFailureInterval']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Agewebadaptor created',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'machineName': {'type': 'string'},
                    'machineIP': {'type': 'string'},
                    'webAdaptorURL': {'type': 'string'},
                    'id': {'type': 'string'},
                    'description': {'type': 'string'},
                    'httpPort': {'type': 'integer'},
                    'httpsPort': {'type': 'integer'},
                    'refreshServerListInterval': {'type': 'integer'},
                    'reconnectServerOnFailureInterval': {'type': 'integer'}
                }
            }
        }
    }
})
def create_agewebadaptor():
    data = request.get_json()
    new_agewebadaptor = Agewebadaptor(
        guid=uuid.uuid4(),
        machineName=data['machineName'],
        machineIP=data['machineIP'],
        webAdaptorURL=data['webAdaptorURL'],
        id=data['id'],
        description=data.get('description'),
        httpPort=data['httpPort'],
        httpsPort=data['httpsPort'],
        refreshServerListInterval=data['refreshServerListInterval'],
        reconnectServerOnFailureInterval=data['reconnectServerOnFailureInterval']
    )
    db.session.add(new_agewebadaptor)
    db.session.commit()

    # Add entry to agecomponents table
    ageguid = Arcgisenterprise.query.first().guid
    new_agecomponent = Agecomponent(
        guid=uuid.uuid4(),
        ageguid=ageguid,
        refguid=new_agewebadaptor.guid,
        reftype='WebAdaptor'
    )
    db.session.add(new_agecomponent)
    db.session.commit()

    return jsonify(new_agewebadaptor.to_dict()), 201


@agewebadaptor_bp.route('/agewebadaptors/<uuid:guid>', methods=['GET'])
@swag_from({
    'tags': ['AGE - Webadaptors', 'AGE'],
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
            'description': 'Retrieve a specific agewebadaptor',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'machineName': {'type': 'string'},
                    'machineIP': {'type': 'string'},
                    'webAdaptorURL': {'type': 'string'},
                    'id': {'type': 'string'},
                    'description': {'type': 'string'},
                    'httpPort': {'type': 'integer'},
                    'httpsPort': {'type': 'integer'},
                    'refreshServerListInterval': {'type': 'integer'},
                    'reconnectServerOnFailureInterval': {'type': 'integer'}
                }
            }
        },
        404: {
            'description': 'Agewebadaptor not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_agewebadaptor(guid):
    agewebadaptor = Agewebadaptor.query.get_or_404(guid)
    return jsonify(agewebadaptor.to_dict())

@agewebadaptor_bp.route('/agewebadaptors/<uuid:guid>', methods=['PUT'])
@swag_from({
    'tags': ['AGE - Webadaptors', 'AGE'],
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
                    'machineName': {'type': 'string', 'example': 'Machine Name'},
                    'machineIP': {'type': 'string', 'example': '192.168.1.1'},
                    'webAdaptorURL': {'type': 'string', 'example': 'http://webadaptor.url'},
                    'id': {'type': 'string', 'example': 'webadaptor1'},
                    'description': {'type': 'string', 'example': 'Description'},
                    'httpPort': {'type': 'integer', 'example': 80},
                    'httpsPort': {'type': 'integer', 'example': 443},
                    'refreshServerListInterval': {'type': 'integer', 'example': 10},
                    'reconnectServerOnFailureInterval': {'type': 'integer', 'example': 5}
                },
                'required': ['machineName', 'machineIP', 'webAdaptorURL', 'id', 'httpPort', 'httpsPort',
                             'refreshServerListInterval', 'reconnectServerOnFailureInterval']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Agewebadaptor updated',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'machineName': {'type': 'string'},
                    'machineIP': {'type': 'string'},
                    'webAdaptorURL': {'type': 'string'},
                    'id': {'type': 'string'},
                    'description': {'type': 'string'},
                    'httpPort': {'type': 'integer'},
                    'httpsPort': {'type': 'integer'},
                    'refreshServerListInterval': {'type': 'integer'},
                    'reconnectServerOnFailureInterval': {'type': 'integer'}
                }
            }
        },
        404: {
            'description': 'Agewebadaptor not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_agewebadaptor(guid):
    data = request.get_json()
    validate_required_fields(Agewebadaptor, data)

    agewebadaptor = Agewebadaptor.query.get_or_404(guid)
    agewebadaptor.machineName = data['machineName']
    agewebadaptor.machineIP = data['machineIP']
    agewebadaptor.webAdaptorURL = data['webAdaptorURL']
    agewebadaptor.id = data['id']
    agewebadaptor.description = data.get('description')
    agewebadaptor.httpPort = data['httpPort']
    agewebadaptor.httpsPort = data['httpsPort']
    agewebadaptor.refreshServerListInterval = data['refreshServerListInterval']
    agewebadaptor.reconnectServerOnFailureInterval = data['reconnectServerOnFailureInterval']
    db.session.commit()
    return jsonify(agewebadaptor.to_dict())


@agewebadaptor_bp.route('/agewebadaptors/<uuid:guid>', methods=['DELETE'])
@swag_from({
    'tags': ['AGE - Webadaptors', 'AGE'],
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
            'description': 'Agewebadaptor deleted'
        },
        404: {
            'description': 'Agewebadaptor not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_agewebadaptor(guid):
    agewebadaptor = Agewebadaptor.query.get_or_404(guid)

    # Delete related agecomponent entries
    Agecomponent.query.filter_by(refguid=guid).delete()

    db.session.delete(agewebadaptor)
    db.session.commit()
    return '', 204
