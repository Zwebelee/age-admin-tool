from flask import Blueprint, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required

from app.models.portalgroup import Portalgroup

portalgroups_bp = Blueprint('portalgroups', __name__)


@portalgroups_bp.route('/portalgroups', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portal - Groups', 'AGE', 'AGE - Portal'],
    'responses': {
        200: {
            'description': 'List of portalgroups',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'id': {'type': 'string'},
                        'capabilities': {'type': 'string'},
                        'owner': {'type': 'string'},
                        'createdat': {'type': 'string'},
                        'modifiedat': {'type': 'string'},
                        'access': {'type': 'string'},
                        'title': {'type': 'string'},
                        'description': {'type': 'string'},
                        'snippet': {'type': 'string'},
                        'thumbnail': {'type': 'string'},
                        'homepage': {'type': 'string'},
                        'tags': {'type': 'string'},
                        'membercount': {'type': 'integer'},
                        'contentcount': {'type': 'integer'},
                        'leavingdisallowed': {'type': 'boolean'},
                        'isreadonly': {'type': 'boolean'},
                        'isviewonly': {'type': 'boolean'},
                        'isprotected': {'type': 'boolean'},
                        'hiddenmembers': {'type': 'boolean'},
                        'isinvitationonly': {'type': 'boolean'},
                        'iseditinggroup': {'type': 'boolean'},
                        'type': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_groups():
    portalgroups = Portalgroup.query.all()
    return jsonify([portalgroup.to_dict() for portalgroup in portalgroups])


@portalgroups_bp.route('/portalgroups/<guid>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['AGE - Portal - Groups', 'AGE', 'AGE - Portal'],
    'parameters': [
        {
            'name': 'guid',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'GUID of the portalgroup to retrieve',
            'example': '123e4567-e89b-12d3-a456-426614174000'
        }
    ],
    'responses': {
        200: {
            'description': 'Portalgroup object retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'id': {'type': 'string'},
                    'capabilities': {'type': 'string'},
                    'owner': {'type': 'string'},
                    'createdat': {'type': 'string'},
                    'modifiedat': {'type': 'string'},
                    'access': {'type': 'string'},
                    'title': {'type': 'string'},
                    'description': {'type': 'string'},
                    'snippet': {'type': 'string'},
                    'thumbnail': {'type': 'string'},
                    'homepage': {'type': 'string'},
                    'tags': {'type': 'string'},
                    'membercount': {'type': 'integer'},
                    'contentcount': {'type': 'integer'},
                    'leavingdisallowed': {'type': 'boolean'},
                    'isreadonly': {'type': 'boolean'},
                    'isviewonly': {'type': 'boolean'},
                    'isprotected': {'type': 'boolean'},
                    'hiddenmembers': {'type': 'boolean'},
                    'isinvitationonly': {'type': 'boolean'},
                    'iseditinggroup': {'type': 'boolean'},
                    'type': {'type': 'string'}
                }
            }
        }
    }
})
def get_portalgroup_by_guid(guid):
    portalgroup = Portalgroup.query.get_or_404(guid)
    return jsonify(portalgroup.to_dict())
