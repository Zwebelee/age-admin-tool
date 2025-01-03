from flask import Blueprint, request, jsonify
from flasgger import swag_from
from ..models.task import Task
from ..models.taskcomments import TaskComment
from ..db import db

tasks_bp = Blueprint('tasks', __name__)

# Task Routes
@tasks_bp.route('/tasks', methods=['GET'])
@swag_from({
    'tags': ['Tasks'],
    'responses': {
        200: {
            'description': 'Retrieve a list of all tasks',
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
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@tasks_bp.route('/tasks/<int:id>', methods=['GET'])
@swag_from({
    'tags': ['Tasks'],
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
            'description': 'Retrieve a specific task by ID',
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
            'description': 'Task not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_task(id):
    task = Task.query.get_or_404(id)
    return jsonify(task.to_dict())

@tasks_bp.route('/tasks', methods=['POST'])
@swag_from({
    'tags': ['Tasks'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string', 'example': 'Task Name'},
                    'description': {'type': 'string', 'example': 'Task Description'}
                },
                'required': ['name']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Task created',
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
def create_task():
    data = request.get_json()
    task = Task(**data)
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@tasks_bp.route('/tasks/<int:id>', methods=['PUT'])
@swag_from({
    'tags': ['Tasks'],
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
                    'name': {'type': 'string', 'example': 'Task Name'},
                    'description': {'type': 'string', 'example': 'Task Description'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Task updated',
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
            'description': 'Task not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(task, key, value)
    db.session.commit()
    return jsonify(task.to_dict())

@tasks_bp.route('/tasks/<int:id>', methods=['DELETE'])
@swag_from({
    'tags': ['Tasks'],
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
            'description': 'Task deleted'
        },
        404: {
            'description': 'Task not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return '', 204

# Task Comment Routes
@tasks_bp.route('/tasks/<int:task_id>/comments', methods=['GET'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        200: {
            'description': 'Retrieve a list of comments for a specific task',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'task_id': {'type': 'integer'},
                        'content': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_task_comments(task_id):
    comments = TaskComment.query.filter_by(task_id=task_id).all()
    return jsonify([comment.to_dict() for comment in comments])

@tasks_bp.route('/tasks/<int:task_id>/comments/<int:id>', methods=['GET'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        },
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        200: {
            'description': 'Retrieve a specific comment by ID for a specific task',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'task_id': {'type': 'integer'},
                    'content': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Comment not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_task_comment(task_id, id):
    comment = TaskComment.query.filter_by(id=id, task_id=task_id).first_or_404()
    return jsonify(comment.to_dict())

@tasks_bp.route('/tasks/<int:task_id>/comments', methods=['POST'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_id',
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
                    'content': {'type': 'string', 'example': 'Comment content'}
                },
                'required': ['content']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Comment created',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'task_id': {'type': 'integer'},
                    'content': {'type': 'string'}
                }
            }
        }
    }
})
def create_task_comment(task_id):
    data = request.get_json()
    comment = TaskComment(task_id=task_id, **data)
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@tasks_bp.route('/tasks/<int:task_id>/comments/<int:id>', methods=['PUT'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        },
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
                    'content': {'type': 'string', 'example': 'Updated comment content'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Comment updated',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'task_id': {'type': 'integer'},
                    'content': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Comment not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_task_comment(task_id, id):
    comment = TaskComment.query.filter_by(id=id, task_id=task_id).first_or_404()
    data = request.get_json()
    for key, value in data.items():
        setattr(comment, key, value)
    db.session.commit()
    return jsonify(comment.to_dict())

@tasks_bp.route('/tasks/<int:task_id>/comments/<int:id>', methods=['DELETE'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        },
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        204: {
            'description': 'Comment deleted'
        },
        404: {
            'description': 'Comment not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_task_comment(task_id, id):
    comment = TaskComment.query.filter_by(id=id, task_id=task_id).first_or_404()
    db.session.delete(comment)
    db.session.commit()
    return '', 204
