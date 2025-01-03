from flask import Blueprint, jsonify, request
from flasgger import swag_from
from app.models.portaluser import PortalUser

portalusers_bp = Blueprint('portalusers', __name__)


@portalusers_bp.route('/portalusers', methods=['GET'])
@swag_from({
    'tags': ['AGE - Portal - Users', 'AGE', 'AGE - Portal'],
    'responses': {
        200: {
            'description': 'List of portalusers',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'guid': {'type': 'string'},
                        'userid': {'type': 'string'},
                        'username': {'type': 'string'},
                        'lastname': {'type': 'string'},
                        'firstname': {'type': 'string'},
                        'fullname': {'type': 'string'},
                        'email': {'type': 'string'},
                        'homepage': {'type': 'string'},
                        'description': {'type': 'string'},
                        'status': {'type': 'string'},
                        'lastlogin': {'type': 'string'},
                        'modified': {'type': 'string'},
                        'created': {'type': 'string'},
                        'provider': {'type': 'string'},
                        'role': {'type': 'string'},
                        'roleid': {'type': 'string'},
                        'customrole': {'type': 'string'},
                        'disabled': {'type': 'boolean'},
                        'licensetype': {'type': 'string'},
                        'usertype': {'type': 'string'},
                        'access': {'type': 'string'},
                        'storeage': {'type': 'integer'},
                        'itemcount': {'type': 'integer'},
                        'groupcount': {'type': 'integer'},
                        'adstatus': {'type': 'string'},
                        'department': {'type': 'string'},
                        'agency': {'type': 'string'},
                        'division': {'type': 'string'},
                        'team': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_users():
    portalusers = PortalUser.query.all()
    return jsonify([portaluser.to_dict() for portaluser in portalusers])


@portalusers_bp.route('/portalusers/statistics', methods=['GET'])
@swag_from({
    'tags': ['AGE - Portal - Users', 'AGE', 'AGE - Portal'],
    'parameters': [
        {
            'name': 'type',
            'in': 'query',
            'type': 'string',
            'required': True,
            'description': 'Type of statistic to retrieve (e.g., count, status)',
            'example': 'count'
        },
        {
            'name': 'status',
            'in': 'query',
            'type': 'string',
            'required': False,
            'description': 'Status to filter by (e.g., active, deleted, pending)',
            'example': 'active'
        }
    ],
    'responses': {
        200: {
            'description': 'Statistics result',
            'schema': {
                'type': 'object',
                'properties': {
                    'count': {'type': 'integer'}
                }
            }
        }
    }
})
def get_portaluser_statistics():
    stat_type = request.args.get('type')
    status = request.args.get('status')

    if stat_type == 'count':
        if status:
            count = PortalUser.query.filter_by(status=status).count()
        else:
            count = PortalUser.query.count()
        return jsonify({"count": count})
    return jsonify({"message": "Invalid statistic type"}), 400


# route for getting a single portaluser
@portalusers_bp.route('/portalusers/<guid>', methods=['GET'])
@swag_from({
    'tags': ['AGE - Portal - Users', 'AGE', 'AGE - Portal'],
    'parameters': [
        {
            'name': 'guid',
            'in': 'path',
            'type': 'string',
            'required': True,
            'description': 'GUID of the portaluser to retrieve',
            'example': '123e4567-e89b-12d3-a456-426614174000'
        }
    ],
    'responses': {
        200: {
            'description': 'PortalUser object retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'guid': {'type': 'string'},
                    'userid': {'type': 'string'},
                    'username': {'type': 'string'},
                    'lastname': {'type': 'string'},
                    'firstname': {'type': 'string'},
                    'fullname': {'type': 'string'},
                    'email': {'type': 'string'},
                    'homepage': {'type': 'string'},
                    'description': {'type': 'string'},
                    'status': {'type': 'string'},
                    'lastlogin': {'type': 'string'},
                    'modified': {'type': 'string'},
                    'created': {'type': 'string'},
                    'provider': {'type': 'string'},
                    'role': {'type': 'string'},
                    'roleid': {'type': 'string'},
                    'customrole': {'type': 'string'},
                    'disabled': {'type': 'boolean'},
                    'licensetype': {'type': 'string'},
                    'usertype': {'type': 'string'},
                    'access': {'type': 'string'},
                    'storeage': {'type': 'integer'},
                    'itemcount': {'type': 'integer'},
                    'groupcount': {'type': 'integer'},
                    'adstatus': {'type': 'string'},
                    'department': {'type': 'string'},
                    'section': {'type': 'string'},
                    'division': {'type': 'string'},
                    'team': {'type': 'string'}
                }
            }
        }
    }
})
def get_portaluser_by_guid(guid):
    portaluser = PortalUser.query.get_or_404(guid)
    return jsonify(portaluser.to_dict())
