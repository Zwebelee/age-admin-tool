from flask import Blueprint, jsonify, request
from flasgger import swag_from
import uuid
from app.models.tests import Test
from app.db import db

tests_bp = Blueprint('tests', __name__)


@tests_bp.route('/tests')
@swag_from({
    'tags': ['Tests'],
    'responses': {
        200: {
            'description': 'List of test objects',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'nr': {'type': 'integer'},
                        'guid': {'type': 'string'}
                    }
                }
            }
        }
    }})
def get_tests():
    tests = Test.query.all()
    return jsonify([test.to_dict() for test in tests])


@tests_bp.route('/tests', methods=['POST'])
@swag_from({
    'tags': ['Tests'],
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
                    'nr': {'type': 'integer'},
                    'guid': {'type': 'string'}
                }
            }
        }
    }
})
def add_test():
    data = request.get_json()
    new_test = Test(nr=data['nr'], guid=uuid.uuid4())
    db.session.add(new_test)
    db.session.commit()
    return jsonify(new_test.to_dict()), 201


@tests_bp.route('/test/<int:id>', methods=['GET'])
@swag_from({
    'tags': ['Tests'],
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
                    'nr': {'type': 'integer'},
                    'guid': {'type': 'string'}
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
        return jsonify(test.to_dict())
    else:
        return jsonify({"message": "Test object not found"}), 404


@tests_bp.route('/test/<int:id>', methods=['PUT'])
@swag_from({
    'tags': ['Tests'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the test entry to update'
        },
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
        200: {
            'description': 'Test entry updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'nr': {'type': 'integer'},
                    'guid': {'type': 'string'}
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
def update_test(id):
    data = request.get_json()
    test = Test.query.get(id)
    if test:
        test.nr = data['nr']
        db.session.commit()
        return jsonify(test.to_dict())
    else:
        return jsonify({"message": "Test object not found"}), 404
