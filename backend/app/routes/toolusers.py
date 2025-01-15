import uuid

from flasgger import swag_from
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..db import db
from ..models.permission import Permission
from ..models.rolepermission import role_permission
from ..models.toolrole import ToolRole
from ..models.tooluser import ToolUser
from ..models.tooluserrole import tooluser_role

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
                        'guid': {'type': 'string'},
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
                    'guid': {'type': 'string'},
                    'username': {'type': 'string'},
                    'language': {'type': 'string'},
                    'theme': {'type': 'string'},
                }
            }
        }
    }
})
def add_tooluser():
    data = request.get_json()
    active_role_data = data.get('active_role')
    active_role_guid = uuid.UUID(active_role_data.get('guid'))

    active_role = ToolRole.query.get(active_role_guid)
    if not active_role:
        return jsonify({"message": "Role not found"}), 404

    new_tooluser = ToolUser(
        guid=uuid.uuid4(),
        username=data['username'],
        language=data.get('language', 'en'),
        theme=data.get('theme', 'dark'),
        active_role_guid=active_role_guid,
        active_role=active_role
    )
    new_tooluser.set_password(data['password'])

    # Assign role to the new user
    role_name = active_role_data.get('name', 'viewer')
    role = ToolRole.query.filter_by(name=role_name).first()
    if role:
        new_tooluser.roles.append(role)
    else:
        return jsonify({"message": "Role not found"}), 400

    db.session.add(new_tooluser)
    db.session.commit()

    return jsonify(new_tooluser.to_dict()), 201


@toolusers_bp.route('/toolusers/<uuid:guid>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
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
            'description': 'User retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
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
def get_tooluser(guid):
    tooluser = ToolUser.query.filter_by(guid=guid).first_or_404()
    return jsonify(tooluser.to_dict()), 200


@toolusers_bp.route('/toolusers/<uuid:guid>', methods=['PUT'])
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
                    'guid': {'type': 'string'},
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
def update_tooluser(guid):
    tooluser = ToolUser.query.filter_by(guid=guid).first_or_404()
    data = request.json
    tooluser.username = data['username']
    tooluser.language = data.get('language', tooluser.language)
    tooluser.theme = data.get('theme', tooluser.theme)
    db.session.commit()
    return jsonify(tooluser.to_dict()), 200


@toolusers_bp.route('/toolusers/<uuid:guid>', methods=['DELETE'])
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
def delete_tooluser(guid):
    tooluser = ToolUser.query.filter_by(guid=guid).first_or_404()
    db.session.delete(tooluser)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


@toolusers_bp.route('/toolusers/<guid>/active_role', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
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
            'description': 'Active role retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'active_role_guid': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'User not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def get_active_role(guid):
    user = ToolUser.query.get(guid)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"active_role_guid": user.active_role_guid})


@toolusers_bp.route('/toolusers/<guid>/active_role', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
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
                    'role_guid': {'type': 'string', 'example': 'role-guid-example'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Active role updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'},
                    'active_role_guid': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'User or role not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def set_active_role(guid):
    user = ToolUser.query.get(guid)
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.get_json()
    role_guid = data.get('role_guid')
    role = ToolRole.query.get(role_guid)
    if not role:
        return jsonify({"error": "Role not found"}), 404
    user.active_role_guid = role_guid
    db.session.commit()
    return jsonify({"message": "Active role updated", "active_role_guid": user.active_role_guid})


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
                    'guid': {'type': 'string'},
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
                    'guid': {'type': 'string'},
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

    # Update active_role if provided
    active_role = data.get('active_role')
    if active_role:
        active_role_guid = uuid.UUID(active_role.get('guid'))
        active_role = ToolRole.query.get(active_role_guid)
        if not active_role:
            return jsonify({"message": "Role not found"}), 404
        tooluser.active_role_guid = active_role_guid
        tooluser.active_role = active_role

    db.session.commit()
    return jsonify(tooluser.to_dict()), 200


@toolusers_bp.route('/toolusers/profile/permissions', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Toolusers'],
    'responses': {
        200: {
            'description': 'List of permissions for the user',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'name': {'type': 'string'}
                    }
                }
            }
        },
        404: {
            'description': 'User not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def get_user_permissions():
    username = get_jwt_identity()
    user = ToolUser.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    active_role_guid = user.active_role_guid
    permissions = db.session.query(Permission).join(role_permission).filter(
        role_permission.c.toolrole_guid == active_role_guid).all()
    return jsonify([permission.to_dict() for permission in permissions]), 200


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
