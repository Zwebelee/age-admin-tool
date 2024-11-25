from flasgger import swag_from
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..db import db
from app.models.tooluser import Tooluser

toolusers_bp = Blueprint('toolusers', __name__)


@toolusers_bp.route('/toolusers', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
    'responses': {
        200: {
            'description': 'List of all toolusers',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'username': {'type': 'string'},
                        'language': {'type': 'string'},
                        'theme': {'type': 'string'},
                    }
                }
            }
        }
    }
})
def get_all_toolusers():
    toolusers = Tooluser.query.all()
    return jsonify([tooluser.to_dict() for tooluser in toolusers]), 200


# TODO: IMPLEMENT LATER for adding users
# @toolusers_bp.route('/toolusers', methods=['POST'])
# @jwt_required()
# @swag_from({
#     'tags': ['Toolusers'],
#     'parameters': [
#         {
#             'name': 'body',
#             'in': 'body',
#             'required': True,
#             'schema': {
#                 'type': 'object',
#                 'properties': {
#                     'username': {'type': 'string', 'example': 'Alice'},
#                     'password': {'type': 'string', 'example': '12345'},
#                     'language': {'type': 'string', 'example': 'en'},
#                     'theme': {'type': 'string', 'example': 'dark'}
#                 }
#             }
#         }
#     ],
#     'responses': {
#         201: {
#             'description': 'User created successfully',
#             'schema': {
#                 'type': 'object',
#                 'properties': {
#                     'id': {'type': 'integer'},
#                     'username': {'type': 'string'},
#                     'language': {'type': 'string'},
#                     'theme': {'type': 'string'},
#                 }
#             }
#         }
#     }
# })
# def add_tooluser():
#     data = request.json
#     new_tooluser = Tooluser(
#         username=data['username'],
#         password=data['password'],
#         language=data.get('language', 'en'),
#         theme=data.get('theme', 'light')
#     )
#     db.session.add(new_tooluser)
#     db.session.commit()
#     return jsonify(new_tooluser.to_dict()), 201


@toolusers_bp.route('/toolusers/<int:id>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
    'responses': {
        200: {
            'description': 'User retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'username': {'type': 'string'},
                    'language': {'type': 'string'},
                    'theme': {'type': 'string'},
                }
            }
        },
        404: {
            'description': 'User not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_tooluser(id):
    tooluser = Tooluser.query.get_or_404(id)
    return jsonify(tooluser.to_dict()), 200


@toolusers_bp.route('/toolusers/<int:id>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {'type': 'string', 'example': 'Alice'},
                    'language': {'type': 'string', 'example': 'en'},
                    'theme': {'type': 'string', 'example': 'dark'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'User updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'username': {'type': 'string'},
                    'language': {'type': 'string'},
                    'theme': {'type': 'string'},
                }
            }
        },
        404: {
            'description': 'User not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_tooluser(id):
    tooluser = Tooluser.query.get_or_404(id)
    data = request.json
    tooluser.username = data['username']
    tooluser.language = data.get('language', tooluser.language)
    tooluser.theme = data.get('theme', tooluser.theme)
    db.session.commit()
    return jsonify(tooluser.to_dict()), 200


@toolusers_bp.route('/toolusers/<int:id>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
    'responses': {
        200: {
            'description': 'User deleted successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'User not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def delete_tooluser(id):
    tooluser = Tooluser.query.get_or_404(id)
    db.session.delete(tooluser)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


@toolusers_bp.route('/toolusers/profile', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
    'responses': {
        200: {
            'description': 'User profile retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'username': {'type': 'string'},
                    'language': {'type': 'string'},
                    'theme': {'type': 'string'},
                }
            }
        },
        404: {
            'description': 'User not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def get_user_profile():
    username = get_jwt_identity()
    tooluser = Tooluser.query.filter_by(username=username).first()
    if tooluser:
        return jsonify(tooluser.to_dict()), 200
    else:
        return jsonify({"message": "User not found"}), 404


@toolusers_bp.route('/toolusers/profile', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {'type': 'string', 'example': 'Alice'},
                    'language': {'type': 'string', 'example': 'en'},
                    'theme': {'type': 'string', 'example': 'dark'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'User profile updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'username': {'type': 'string'},
                    'language': {'type': 'string'},
                    'theme': {'type': 'string'},
                }
            }
        },
        404: {
            'description': 'User not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_user_profile():
    username = get_jwt_identity()
    tooluser = Tooluser.query.filter_by(username=username).first()
    if not tooluser:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    tooluser.username = data.get('username', tooluser.username)
    tooluser.language = data.get('language', tooluser.language)
    tooluser.theme = data.get('theme', tooluser.theme)
    db.session.commit()
    return jsonify(tooluser.to_dict()), 200
