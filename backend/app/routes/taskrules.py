import uuid

from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required

from ..db import db
from ..models.taskrule import TaskRule

taskrules_bp = Blueprint('taskrules', __name__)


# Task Rule Routes
@taskrules_bp.route('/taskrules', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Task Rules'],
    'responses': {
        200: {
            'description': 'Retrieve a list of all task rules',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'name': {'type': 'string'},
                        'description': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_task_rules():
    task_rules = TaskRule.query.all()
    return jsonify([task_rule.to_dict() for task_rule in task_rules])


@taskrules_bp.route('/taskrules', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Task Rules'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string', 'example': 'Task Rule Name'},
                    'description': {'type': 'string', 'example': 'Task Rule Description'},
                    'action': {'type': 'string', 'example': 'Action to be taken'},
                    'rule_conditions': {'type': 'object', 'example': {'condition_key': 'condition_value'}},
                    'whitelist': {'type': 'array', 'items': {'type': 'string'}, 'example': ['item1', 'item2']},
                    'blacklist': {'type': 'array', 'items': {'type': 'string'}, 'example': ['item3', 'item4']},
                    'is_active': {'type': 'boolean', 'example': True}
                },
                'required': ['name', 'description', 'action', 'rule_conditions']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Task rule created',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'action': {'type': 'string'},
                    'rule_conditions': {'type': 'object'},
                    'whitelist': {'type': 'array', 'items': {'type': 'string'}},
                    'blacklist': {'type': 'array', 'items': {'type': 'string'}},
                    'is_active': {'type': 'boolean'},
                    'created_at': {'type': 'string', 'format': 'date-time'},
                    'updated_at': {'type': 'string', 'format': 'date-time'}
                }
            }
        }
    }
})
def create_task_rule():
    data = request.get_json()
    data['guid'] = uuid.uuid4()
    task_rule = TaskRule(**data)
    db.session.add(task_rule)
    db.session.commit()
    return jsonify(task_rule.to_dict()), 201


@taskrules_bp.route('/taskrules/<uuid:guid>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Task Rules'],
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
            'description': 'Retrieve a specific task rule by GUID',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Task rule not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_task_rule(guid):
    task_rule = TaskRule.query.filter_by(guid=guid).first_or_404()
    return jsonify(task_rule.to_dict())


@taskrules_bp.route('/taskrules/<uuid:guid>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Task Rules'],
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
                    'name': {'type': 'string', 'example': 'Updated Task Rule Name'},
                    'description': {'type': 'string', 'example': 'Updated Task Rule Description'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Task rule updated',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Task rule not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_task_rule(guid):
    task_rule = TaskRule.query.filter_by(guid=guid).first_or_404()
    data = request.get_json()
    for key, value in data.items():
        setattr(task_rule, key, value)
    db.session.commit()
    return jsonify(task_rule.to_dict())


@taskrules_bp.route('/taskrules/<uuid:guid>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['Task Rules'],
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
            'description': 'Task rule deleted'
        },
        404: {
            'description': 'Task rule not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_task_rule(guid):
    task_rule = TaskRule.query.filter_by(guid=guid).first_or_404()
    db.session.delete(task_rule)
    db.session.commit()
    return '', 204
