from flasgger import swag_from
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..db import db
from ..models.toolrole import ToolRole
from ..models.tooluser import ToolUser

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
    toolusers = ToolUser.query.all()
    return jsonify([tooluser.to_dict() for tooluser in toolusers]), 200


@toolusers_bp.route('/toolusers', methods=['POST'])
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
                    'username': {'type': 'string', 'example': 'Peter'},
                    'password': {'type': 'string', 'example': '12345'},
                    'language': {'type': 'string', 'example': 'en'},
                    'theme': {'type': 'string', 'example': 'dark'}
                }
            }
        }
    ],
    'responses': {
        201: {
            'description': 'User created successfully',
            'schema': {
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
})
def add_tooluser():
    data = request.json
    new_tooluser = ToolUser(
        username=data['username'],
        language=data.get('language', 'en'),
        theme=data.get('theme', 'light')
    )
    new_tooluser.set_password(data['password'])

    # Assign role to the new user
    role_name = data.get('role', 'user')
    role = ToolRole.query.filter_by(name=role_name).first()
    if role:
        new_tooluser.roles.append(role)
    else:
        return jsonify({"message": "Role not found"}), 400

    db.session.add(new_tooluser)
    db.session.commit()
    return jsonify(new_tooluser.to_dict()), 201


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
    tooluser = ToolUser.query.get_or_404(id)
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
    tooluser = ToolUser.query.get_or_404(id)
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
    tooluser = ToolUser.query.get_or_404(id)
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
    tooluser = ToolUser.query.filter_by(username=username).first()
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
    tooluser = ToolUser.query.filter_by(username=username).first()
    if not tooluser:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    tooluser.username = data.get('username', tooluser.username)
    tooluser.language = data.get('language', tooluser.language)
    tooluser.theme = data.get('theme', tooluser.theme)
    db.session.commit()
    return jsonify(tooluser.to_dict()), 200


@toolusers_bp.route('/toolusers/change_password', methods=['PUT'])
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
                    'current_password': {'type': 'string', 'example': 'oldpassword'},
                    'new_password': {'type': 'string', 'example': 'newpassword'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Password changed successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        400: {
            'description': 'Invalid current password',
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
def change_password():
    username = get_jwt_identity()
    tooluser = ToolUser.query.filter_by(username=username).first()
    if not tooluser:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    current_password = data['current_password']
    new_password = data['new_password']

    if not tooluser.check_password(current_password):
        return jsonify({"message": "Invalid current password"}), 400

    tooluser.set_password(new_password)
    db.session.commit()

    # TODO: Revoke tokens / blacklist tokens on redis, create and return new acces/refhresh tokens

    return jsonify({"message": "Password changed successfully"}), 200
