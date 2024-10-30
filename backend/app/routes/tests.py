from flask import Blueprint, jsonify, request
from flasgger import swag_from
from ..models import Test
from app.db import db

tests_bp = Blueprint('tests', __name__)


@tests_bp.route('/tests')
def get_tests():
    tests = Test.query.all()
    return jsonify([{"id": test.id, "nr": test.nr} for test in tests])


@tests_bp.route('/tests', methods=['POST'])
@swag_from({
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'nr': {'type': 'integer'}
                },
                'required': ['nr']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Test object created successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'nr': {'type': 'integer'}
                }
            }
        }
    }
})
def add_test():
    data = request.get_json()
    new_test = Test(nr=data['nr'])
    db.session.add(new_test)
    db.session.commit()
    return jsonify({"id": new_test.id, "nr": new_test.nr}), 201


@tests_bp.route('/test/<int:id>', methods=['GET'])
@swag_from({
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the test entry to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'Test entry retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'nr': {'type': 'integer'}
                }
            }
        },
        404: {
            'description': 'Test object not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_test_by_id(id):
    test = Test.query.get(id)
    if test:
        return jsonify({"id": test.id, "nr": test.nr})
    else:
        return jsonify({"message": "Test object not found"}), 404
