from flask import Blueprint, request, jsonify
from flasgger import swag_from
from ..db import db
from ..models.arcgisenterprise import Arcgisenterprise
from ..utils.validate_required_fields import validate_required_fields

arcgisenterprise_bp = Blueprint('arcgisenterprise', __name__)


@arcgisenterprise_bp.route('/arcgisenterprise', methods=['GET'])
@swag_from({
    'tags': ['Arcgisenterprise'],
    'responses': {
        200: {
            'description': 'Retrieve the Arcgisenterprise entry',
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
def get_arcgisenterprise():
    arcgisenterprise = Arcgisenterprise.query.first()
    if arcgisenterprise:
        return jsonify(arcgisenterprise.to_dict())
    else:
        return jsonify({"message": "Arcgisenterprise entry not found"}), 404


@arcgisenterprise_bp.route('/arcgisenterprise', methods=['PUT'])
@swag_from({
    'tags': ['Arcgisenterprise'],
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
def update_arcgisenterprise():
    data = request.get_json()
    validate_required_fields(Arcgisenterprise, data)

    arcgisenterprise = Arcgisenterprise.query.first()
    if arcgisenterprise:
        arcgisenterprise.name = data['name']
        arcgisenterprise.alias = data['alias']
        arcgisenterprise.description = data.get('description')
        db.session.commit()
        return jsonify(arcgisenterprise.to_dict())
    else:
        return jsonify({"message": "Arcgisenterprise entry not found"}), 404
