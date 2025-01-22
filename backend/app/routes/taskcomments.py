import uuid
from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required

from ..db import db
from ..models.taskcomment import TaskComment

taskcomments_bp = Blueprint('taskcomments', __name__)


# Get all comments
@taskcomments_bp.route('/taskcomments', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Task-Comments'],
    'responses': {
        200: {
            'description': 'Retrieve a list of all comments',
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
def get_all_comments():
    comments = TaskComment.query.all()
    return jsonify([comment.to_dict() for comment in comments])


@taskcomments_bp.route('/taskcomments', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Task-Comments'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'task_guid': {'type': 'string', 'example': 'Task GUID'},
                    'comment': {'type': 'string', 'example': 'Comment content'},
                    'tooluser_guid': {'type': 'string'}
                },
                'required': ['task_guid', 'comment']
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
def create_comment():
    data = request.get_json()
    data['guid'] = uuid.uuid4()
    if 'tooluser_guid' in data:
        data['tooluser_guid'] = uuid.UUID(data['tooluser_guid'])
    comment = TaskComment(**data)
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201


# Get a specific comment by GUID
@taskcomments_bp.route('/comments/<uuid:guid>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Task-Comments'],
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
            'description': 'Retrieve a specific comment by GUID',
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
def get_comment(guid):
    comment = TaskComment.query.get_or_404(guid)
    return jsonify(comment.to_dict())


# Update a comment
@taskcomments_bp.route('/comments/<uuid:guid>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Task-Comments'],
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
def update_comment(guid):
    comment = TaskComment.query.get_or_404(guid)
    data = request.get_json()
    for key, value in data.items():
        if key == 'tooluser_guid':
            value = uuid.UUID(value)
        setattr(comment, key, value)
    db.session.commit()
    return jsonify(comment.to_dict())


# Delete a comment
@taskcomments_bp.route('/comments/<uuid:guid>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['Task-Comments'],
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
def delete_comment(guid):
    comment = TaskComment.query.get_or_404(guid)
    db.session.delete(comment)
    db.session.commit()
    return '', 204
