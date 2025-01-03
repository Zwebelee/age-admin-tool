from flask import Blueprint, request, jsonify
from flasgger import swag_from
from ..db import db
from ..models.taskcomment import TaskComment

taskcomments_bp = Blueprint('taskcomments', __name__)

# Get all comments
@taskcomments_bp.route('/taskcomments', methods=['GET'])
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
                        'id': {'type': 'integer'},
                        'task_id': {'type': 'integer'},
                        'content': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_all_comments():
    comments = TaskComment.query.all()
    return jsonify([comment.to_dict() for comment in comments])

# Get a specific comment by ID
@taskcomments_bp.route('/comments/<int:id>', methods=['GET'])
@swag_from({
    'tags': ['Task-Comments'],
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
            'description': 'Retrieve a specific comment by ID',
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
def get_comment(id):
    comment = TaskComment.query.get_or_404(id)
    return jsonify(comment.to_dict())

# Update a comment
@taskcomments_bp.route('/comments/<int:id>', methods=['PUT'])
@swag_from({
    'tags': ['Task-Comments'],
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
def update_comment(id):
    comment = TaskComment.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(comment, key, value)
    db.session.commit()
    return jsonify(comment.to_dict())

# Delete a comment
@taskcomments_bp.route('/comments/<int:id>', methods=['DELETE'])
@swag_from({
    'tags': ['Task-Comments'],
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
def delete_comment(id):
    comment = TaskComment.query.get_or_404(id)
    db.session.delete(comment)
    db.session.commit()
    return '', 204