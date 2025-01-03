from flask import Blueprint, request, jsonify
from flasgger import swag_from
from ..db import db
from ..models.taskrule import TaskRule

taskrules_bp = Blueprint('taskrules', __name__)


# Task Rule Routes
@taskrules_bp.route('/taskrules', methods=['GET'])
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
                        'id': {'type': 'integer'},
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


@taskrules_bp.route('/taskrules/<int:id>', methods=['GET'])
@swag_from({
    'tags': ['Task Rules'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        200: {
            'description': 'Retrieve a specific task rule by ID',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
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
def get_task_rule(id):
    task_rule = TaskRule.query.get_or_404(id)
    return jsonify(task_rule.to_dict())


@taskrules_bp.route('/taskrules', methods=['POST'])
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
                    'description': {'type': 'string', 'example': 'Task Rule Description'}
                },
                'required': ['name']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Task rule created',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'name': {'type': 'string'},
                    'description': {'type': 'string'}
                }
            }
        }
    }
})
def create_task_rule():
    data = request.get_json()
    task_rule = TaskRule(**data)
    db.session.add(task_rule)
    db.session.commit()
    return jsonify(task_rule.to_dict()), 201


@taskrules_bp.route('/taskrules/<int:id>', methods=['PUT'])
@swag_from({
    'tags': ['Task Rules'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
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
                    'id': {'type': 'integer'},
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
def update_task_rule(id):
    task_rule = TaskRule.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(task_rule, key, value)
    db.session.commit()
    return jsonify(task_rule.to_dict())


@taskrules_bp.route('/taskrules/<int:id>', methods=['DELETE'])
@swag_from({
    'tags': ['Task Rules'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
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
def delete_task_rule(id):
    task_rule = TaskRule.query.get_or_404(id)
    db.session.delete(task_rule)
    db.session.commit()
    return '', 204
