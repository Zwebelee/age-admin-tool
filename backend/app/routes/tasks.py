import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify
from flasgger import swag_from

from ..models.task import Task
from ..models.taskcomment import TaskComment
from ..db import db
from ..models.tasktooluser import task_tooluser

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
                        'guid': {'type': 'string'},
                        'task_rule_guid': {'type': 'string'},
                        'title': {'type': 'string'},
                        'description': {'type': 'string'},
                        'status': {'type': 'string'},
                        'priority': {'type': 'string'},
                        'assigned_to': {'type': 'string'},
                        'linked_object_guid': {'type': 'string'},
                        'linked_object_type': {'type': 'string'},
                        'created_at': {'type': 'string', 'format': 'date-time'},
                        'updated_at': {'type': 'string', 'format': 'date-time'}
                    }
                }
            }
        }
    }
})
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@tasks_bp.route('/tasks/<uuid:guid>', methods=['GET'])
@swag_from({
    'tags': ['Tasks'],
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
            'description': 'Retrieve a specific task by GUID',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'task_rule_guid': {'type': 'string'},
                    'title': {'type': 'string'},
                    'description': {'type': 'string'},
                    'status': {'type': 'string'},
                    'priority': {'type': 'string'},
                    'assigned_to': {'type': 'string'},
                    'linked_object_guid': {'type': 'string'},
                    'linked_object_type': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'},
                    'updated_at': {'type': 'string', 'format': 'date-time'}
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
def get_task(guid):
    task = Task.query.get_or_404(guid)
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
                    'task_rule_guid': {'type': 'string'},
                    'title': {'type': 'string', 'example': 'Task Title'},
                    'description': {'type': 'string', 'example': 'Task Description'},
                    'status': {'type': 'string', 'example': 'pending'},
                    'priority': {'type': 'string', 'example': 'normal'},
                    'assigned_to': {'type': 'string'},
                    'linked_object_guid': {'type': 'string'},
                    'linked_object_type': {'type': 'string'}
                },
                'required': ['task_rule_guid', 'title', 'description', 'linked_object_guid']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Task created',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'task_rule_guid': {'type': 'string'},
                    'title': {'type': 'string'},
                    'description': {'type': 'string'},
                    'status': {'type': 'string'},
                    'priority': {'type': 'string'},
                    'assigned_to': {'type': 'string'},
                    'linked_object_guid': {'type': 'string'},
                    'linked_object_type': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'},
                    'updated_at': {'type': 'string', 'format': 'date-time'}
                }
            }
        }
    }
})
def create_task():
    data = request.get_json()
    task = Task(
        guid=uuid.uuid4(),
        task_rule_guid=uuid.UUID(data["task_rule_guid"]),
        title=data["title"],
        description=data["description"],
        status=data["status"],
        priority=data["priority"],
        assigned_to=uuid.UUID(data.get("assigned_to")),
        linked_object_guid=uuid.UUID(data["linked_object_guid"]),
        linked_object_type=data["linked_object_type"])

    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@tasks_bp.route('/tasks/<uuid:guid>', methods=['PUT'])
@swag_from({
    'tags': ['Tasks'],
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
                    'task_rule_guid': {'type': 'string', 'example': 'Task Rule GUID'},
                    'title': {'type': 'string', 'example': 'Task Title'},
                    'description': {'type': 'string', 'example': 'Task Description'},
                    'status': {'type': 'string', 'example': 'pending'},
                    'priority': {'type': 'string', 'example': 'normal'},
                    'assigned_to': {'type': 'string', 'example': 'Assigned User GUID'},
                    'linked_object_guid': {'type': 'string', 'example': 'Linked Object GUID'},
                    'linked_object_type': {'type': 'string', 'example': 'Linked Object Type'}
                },
                'required': ['task_rule_guid', 'title', 'description', 'linked_object_guid']
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Task updated',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'task_rule_guid': {'type': 'string'},
                    'title': {'type': 'string'},
                    'description': {'type': 'string'},
                    'status': {'type': 'string'},
                    'priority': {'type': 'string'},
                    'assigned_to': {'type': 'string'},
                    'linked_object_guid': {'type': 'string'},
                    'linked_object_type': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'},
                    'updated_at': {'type': 'string', 'format': 'date-time'}
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
def update_task(guid):
    task = Task.query.filter_by(guid=guid).first_or_404()
    data = request.get_json()
    new_assigned_to = None
    for key, value in data.items():
        if key in ['guid', 'task_rule_guid', 'assigned_to', 'linked_object_guid']:
            value = uuid.UUID(value)
        if key in ['created_at', 'updated_at']:
            #TODO: improve - solve generic
            value = datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d %H:%M:%S')

        if key == 'assigned_to':
            new_assigned_to = value
        setattr(task, key, value)

    db.session.commit()

    if new_assigned_to:
        db.session.execute(task_tooluser.delete().where(task_tooluser.c.task_guid == guid))
        db.session.execute(task_tooluser.insert().values(task_guid=guid, tooluser_guid=new_assigned_to))
        db.session.commit()

    return jsonify(task.to_dict())

@tasks_bp.route('/tasks/<uuid:guid>', methods=['DELETE'])
@swag_from({
    'tags': ['Tasks'],
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
def delete_task(guid):
    task = Task.query.filter_by(guid=guid).first_or_404()
    db.session.delete(task)
    db.session.commit()
    return '', 204

# Task Comment Routes
@tasks_bp.route('/tasks/<uuid:task_guid>/comments', methods=['GET'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_guid',
            'in': 'path',
            'required': True,
            'type': 'string'
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
                        'guid': {'type': 'string'},
                        'task_guid': {'type': 'string'},
                        'comment': {'type': 'string'},
                        'tooluser_guid': {'type': 'string'},
                        'created_at': {'type': 'string', 'format': 'date-time'}
                    }
                }
            }
        }
    }
})
def get_task_comments(task_guid):
    comments = TaskComment.query.filter_by(task_guid=task_guid).all()
    return jsonify([comment.to_dict() for comment in comments])

@tasks_bp.route('/tasks/<uuid:task_guid>/comments/<uuid:guid>', methods=['GET'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        },
        {
            'name': 'guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        }
    ],
    'responses': {
        200: {
            'description': 'Retrieve a specific comment by GUID for a specific task',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'task_guid': {'type': 'string'},
                    'comment': {'type': 'string'},
                    'tooluser_guid': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'}
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
def get_task_comment(task_guid, guid):
    comment = TaskComment.query.filter_by(guid=guid, task_guid=task_guid).first_or_404()
    return jsonify(comment.to_dict())

@tasks_bp.route('/tasks/<uuid:task_guid>/comments', methods=['POST'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_guid',
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
                    'comment': {'type': 'string', 'example': 'Comment content'},
                    'tooluser_guid': {'type': 'string'}
                },
                'required': ['comment']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Comment created',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'task_guid': {'type': 'string'},
                    'comment': {'type': 'string'},
                    'tooluser_guid': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'}
                }
            }
        }
    }
})
def create_task_comment(task_guid):
    data = request.get_json()

    # task = Task.query.filter_by(guid=guid).first_or_404()
    # data = request.get_json()
    # for key, value in data.items():
    #     if key in ['guid', 'task_rule_guid', 'assigned_to', 'linked_object_guid']:
    #         value = uuid.UUID(value)
    #     setattr(task, key, value)
    # db.session.commit()
    # return jsonify(task.to_dict())



    data['task_guid'] = task_guid
    data['guid'] = uuid.uuid4()
    if 'tooluser_guid' in data:
        data['tooluser_guid'] = uuid.UUID(data['tooluser_guid'])
    comment = TaskComment(**data)
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@tasks_bp.route('/tasks/<uuid:task_guid>/comments/<uuid:guid>', methods=['PUT'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        },
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
                    'comment': {'type': 'string', 'example': 'Updated comment content'},
                    'tooluser_guid': {'type': 'string'}
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
                    'guid': {'type': 'string'},
                    'task_guid': {'type': 'string'},
                    'comment': {'type': 'string'},
                    'tooluser_guid': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'}
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
def update_task_comment(task_guid, guid):
    comment = TaskComment.query.filter_by(guid=guid, task_guid=task_guid).first_or_404()
    data = request.get_json()
    for key, value in data.items():
        if key == 'tooluser_guid':
            value = uuid.UUID(value)
        setattr(comment, key, value)
    db.session.commit()
    return jsonify(comment.to_dict())

@tasks_bp.route('/tasks/<uuid:task_guid>/comments/<uuid:guid>', methods=['DELETE'])
@swag_from({
    'tags': ['Task Comments'],
    'parameters': [
        {
            'name': 'task_guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        },
        {
            'name': 'guid',
            'in': 'path',
            'required': True,
            'type': 'string'
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
def delete_task_comment(task_guid, guid):
    comment = TaskComment.query.filter_by(guid=guid, task_guid=task_guid).first_or_404()
    db.session.delete(comment)
    db.session.commit()
    return '', 204
