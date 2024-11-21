from flask import Blueprint, jsonify
from flasgger import swag_from

from app.models.portalitem import Portalitem

portalitems_bp = Blueprint('portalitems', __name__)


@portalitems_bp.route('/portalitems', methods=['GET'])
@swag_from({
    'tags': ['AGE - Portal - Items', 'AGE', 'AGE - Portal'],
    'responses': {
        200: {
            'description': 'List of portalitems',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'id': {'type': 'string'},
                        'title': {'type': 'string'},
                        'type': {'type': 'string'},
                        'owner': {'type': 'string'},
                        'homepage': {'type': 'string'},
                        'url': {'type': 'string'},
                        'sizebyte': {'type': 'integer'},
                        'sharing': {'type': 'string'},
                        'groupsharing': {'type': 'string'},
                        'folder': {'type': 'string'},
                        'editable': {'type': 'boolean'},
                        'viewcount': {'type': 'integer'},
                        'usagequota': {'type': 'integer'},
                        'categories': {'type': 'string'},
                        'contentstatus': {'type': 'string'},
                        'createdat': {'type': 'string'},
                        'modifiedat': {'type': 'string'},
                        'snippet': {'type': 'string'},
                        'description': {'type': 'string'},
                        'thumbnail': {'type': 'string'},
                        'tags': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_items():
    portalitems = Portalitem.query.all()
    return jsonify([portalitem.to_dict() for portalitem in portalitems])


@portalitems_bp.route('/portalitems/<guid>', methods=['GET'])
@swag_from({
    'tags': ['AGE - Portal - Items', 'AGE', 'AGE - Portal'],
    'parameters': [
        {
            'name': 'guid',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'GUID of the portalitem to retrieve',
            'example': '123e4567-e89b-12d3-a456-426614174000'
        }
    ],
    'responses': {
        200: {
            'description': 'Portalitem object retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'id': {'type': 'string'},
                    'title': {'type': 'string'},
                    'type': {'type': 'string'},
                    'owner': {'type': 'string'},
                    'homepage': {'type': 'string'},
                    'url': {'type': 'string'},
                    'sizebyte': {'type': 'integer'},
                    'sharing': {'type': 'string'},
                    'groupsharing': {'type': 'string'},
                    'folder': {'type': 'string'},
                    'editable': {'type': 'boolean'},
                    'viewcount': {'type': 'integer'},
                    'usagequota': {'type': 'integer'},
                    'categories': {'type': 'string'},
                    'contentstatus': {'type': 'string'},
                    'createdat': {'type': 'string'},
                    'modifiedat': {'type': 'string'},
                    'snippet': {'type': 'string'},
                    'description': {'type': 'string'},
                    'thumbnail': {'type': 'string'},
                    'tags': {'type': 'string'}
                }
            }
        }
    }
})
def get_portalitem_by_guid(guid):
    portalitem = Portalitem.query.get_or_404(guid)
    return jsonify(portalitem.to_dict())
