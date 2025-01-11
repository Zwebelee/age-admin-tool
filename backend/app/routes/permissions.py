from flask import Blueprint, request, jsonify
from flasgger import swag_from
from flask_jwt_extended import jwt_required

from ..db import db
from ..models.permission import Permission
from ..models.rolepermission import role_permission
from ..models.toolrole import ToolRole

permissions_bp = Blueprint('permissions', __name__)

@permissions_bp.route('/permissions', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Permissions'],
    'responses': {
        200: {
            'description': 'List of all permissions',
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
        }
    }
})
def get_all_permissions():
    permissions = Permission.query.all()
    return jsonify([permission.to_dict() for permission in permissions]), 200

@permissions_bp.route('/permissions', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Permissions'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string', 'example': 'view:dashboard'}
                }
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Permission created successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'name': {'type': 'string'}
                }
            }
        }
    }
})
def add_permission():
    data = request.json
    new_permission = Permission(name=data['name'])
    db.session.add(new_permission)
    db.session.commit()
    return jsonify(new_permission.to_dict()), 201

@permissions_bp.route('/roles/<uuid:role_guid>/permissions', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['RolePermissions'],
    'parameters': [
        {
            'name': 'role_guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        }
    ],
    'responses': {
        200: {
            'description': 'List of permissions for the role',
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
            'description': 'Role not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def get_role_permissions(role_guid):
    role = ToolRole.query.get(role_guid)
    if not role:
        return jsonify({"error": "Role not found"}), 404
    permissions = db.session.query(Permission).join(role_permission).filter(role_permission.c.toolrole_guid == role_guid).all()
    return jsonify([permission.to_dict() for permission in permissions]), 200

@permissions_bp.route('/roles/<uuid:role_guid>/permissions', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['RolePermissions'],
    'parameters': [
        {
            'name': 'role_guid',
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
                    'permission_guid': {'type': 'string', 'example': 'permission-guid-example'}
                }
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Permission assigned to role successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'role_guid': {'type': 'string'},
                    'permission_guid': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Role or permission not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def assign_permission_to_role(role_guid):
    role = ToolRole.query.get(role_guid)
    if not role:
        return jsonify({"error": "Role not found"}), 404
    data = request.json
    permission_guid = data['permission_guid']
    permission = Permission.query.get(permission_guid)
    if not permission:
        return jsonify({"error": "Permission not found"}), 404
    stmt = role_permission.insert().values(toolrole_guid=role_guid, permission_guid=permission_guid)
    db.session.execute(stmt)
    db.session.commit()
    return jsonify({"role_guid": role_guid, "permission_guid": permission_guid}), 201

@permissions_bp.route('/roles/<uuid:role_guid>/permissions/<uuid:permission_guid>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['RolePermissions'],
    'parameters': [
        {
            'name': 'role_guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        },
        {
            'name': 'permission_guid',
            'in': 'path',
            'required': True,
            'type': 'string'
        }
    ],
    'responses': {
        200: {
            'description': 'Permission removed from role successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Role or permission not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def remove_permission_from_role(role_guid, permission_guid):
    stmt = role_permission.delete().where(role_permission.c.toolrole_guid == role_guid).where(role_permission.c.permission_guid == permission_guid)
    result = db.session.execute(stmt)
    if result.rowcount == 0:
        return jsonify({"error": "Role or permission not found"}), 404
    db.session.commit()
    return jsonify({"message": "Permission removed from role successfully"}), 200
