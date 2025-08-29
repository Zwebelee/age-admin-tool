import uuid

from flask import Blueprint, jsonify, request, current_app
from flasgger import swag_from
from flask_jwt_extended import jwt_required
from ..db import db

#TODO: move to model or better utils since is general
import datetime

def from_epoch_ms(epoch_ms):
    """Convert ESRI epoch ms to UTC-aware datetime with microseconds set to 0."""
    if epoch_ms is None or epoch_ms == -1:
        return None
    dt = datetime.datetime.fromtimestamp(epoch_ms / 1000.0, datetime.UTC)
    return dt.replace(microsecond=0)

def parse_lastlogin(lastlogin_ts):
    """Convert milliseconds since epoch to UTC datetime, or None if -1."""
    if lastlogin_ts is None or lastlogin_ts == -1:
        return None
    dt = datetime.datetime.fromtimestamp(lastlogin_ts / 1000.0, datetime.UTC)
    return dt.replace(microsecond=0)

def to_utc_datetime(dt):
    """Convert MariaDB date string or naive datetime to UTC-aware datetime with microseconds set to 0."""
    if isinstance(dt, str):
        dt = datetime.datetime.strptime(dt, "%Y-%m-%d %H:%M:%S")
    if isinstance(dt, datetime.datetime):
        dt = dt.replace(microsecond=0)
        return dt if dt.tzinfo else dt.replace(tzinfo=datetime.UTC)
    return None

import app.services.EnterprisePortal
from app.models.portaluser import PortalUser, StatusEnum

portalusers_bp = Blueprint('portalusers', __name__)


@portalusers_bp.route('/portalusers', methods=['GET'])
@jwt_required()
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
@jwt_required()
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
@jwt_required()
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

@portalusers_bp.route('/portalusers/testget', methods=['GET'])
@swag_from({
    'tags': ['AGE - Portal - Users', 'AGE', 'AGE - Portal'],
    'responses': {
        200: {
            'description': 'Test route to verify the API is working',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }

})
def test_get():
    portal_session = current_app.portal_session
    gis = portal_session.get_gis()
    portal_url = gis.url
    print(f"Portal URL: {portal_url}")

    #load all users
    portal_users = gis.users.search(max_users=10000)

    for user in portal_users:
        #TODO: make a from_enterprise serializer method in the model
        new_local_user = PortalUser(
            guid=uuid.uuid4(),
            userid=user.id,
            username=user.fullName,
            lastname=user.lastName,
            firstname=user.firstName,
            fullname=user.fullName,
            email=user.email,
            homepage=user.homepage,
            description=user.description,
            status=StatusEnum.active,
            lastlogin=parse_lastlogin(user.lastLogin),
            modified=parse_lastlogin(user.modified),
            created=parse_lastlogin(user.created),
            provider='ArcGIS Online',
            role=user.role,
            roleid=user.roleId,
            customrole='',
            disabled=False,  # Assuming no disabled users for this example
            licensetype='Viewer',  # Defaulting to Viewer for simplicity
            usertype='',
            access='public',  # Assuming public access for this example
            storeage=0,  # Placeholder for storage
            itemcount=0,  # Placeholder for item count
            groupcount=0,  # Placeholder for group count
            adstatus='active',  # Assuming active AD status
            department='a',  # Placeholder for department
            agency='b',  # Placeholder for agency
            division='c',  # Placeholder for division
            team='d'  # Placeholder for team
        )

        # write all users to db
        try:
            existing_user = PortalUser.query.filter_by(userid=new_local_user.userid).first()
            if existing_user:
                # Update existing user
                for key, value in new_local_user.to_dict().items():
                    setattr(existing_user, key, value)
                db.session.commit()
            else:
                # Add new user
                db.session.add(new_local_user)
                db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error processing user {new_local_user.userid}: {e}")

    return jsonify({
        "message": "Users fetched and processed",
    }), 200

@portalusers_bp.route('/portalusers/sync', methods=['GET'])
@swag_from({
    'tags': ['AGE - Portal - Users', 'AGE', 'AGE - Portal'],
    'responses': {
        200: {
            'description': 'Test route to verify the API is working',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def portal_user_sync():
    portal_session = current_app.portal_session
    gis = portal_session.get_gis()
    portal_url = gis.url
    print(f"Portal URL: {portal_url}")

    #load all users
    #TODO: advanced search returning not object but only needed fields for key ? Faster ?
    portal_users = gis.users.search(max_users=10000)

    # Build a dict of db users: key = userid + str(modified)
    db_users = PortalUser.query.all()
    db_user_keys = {f"{user.userid}{to_utc_datetime(user.modified)}{to_utc_datetime(user.lastlogin)}": user for user in db_users}

    portal_user_keys = {}
    for user in portal_users:
        key = f"{user.id}{from_epoch_ms(user.modified)}{from_epoch_ms(user.lastLogin)}"
        portal_user_keys[key] = user

    to_sync_keys = set(portal_user_keys.keys()) - set(db_user_keys.keys())
    print(f"Users to sync: {len(to_sync_keys)}")

    for key in to_sync_keys:
        user = portal_user_keys[key]
        print('Syncing user:', user.fullName, user.id)
        new_local_user = PortalUser(
            guid=uuid.uuid4(),
            userid=user.id,
            username=user.fullName,
            lastname=user.lastName,
            firstname=user.firstName,
            fullname=user.fullName,
            email=user.email,
            homepage=user.homepage,
            description=user.description,
            status=StatusEnum.active,
            lastlogin=parse_lastlogin(user.lastLogin),
            modified=parse_lastlogin(user.modified),
            created=parse_lastlogin(user.created),
            provider='ArcGIS Online',
            role=user.role,
            roleid=user.roleId,
            customrole='',
            disabled=False,
            licensetype='Viewer',
            usertype='',
            access='public',
            storeage=0,
            itemcount=0,
            groupcount=0,
            adstatus='active',
            department='a',
            agency='b',
            division='c',
            team='d'
        )
        # Upsert logic
        existing_user = PortalUser.query.filter_by(userid=new_local_user.userid).first()
        try:
            if existing_user:
                for key, value in new_local_user.to_dict().items():
                    setattr(existing_user, key, value)
            else:
                db.session.add(new_local_user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            print(f"Error syncing user {new_local_user.userid}: {e}")

    return jsonify({
        "message": f"Synced {len(to_sync_keys)} users.",
    }), 200



# @portalusers_bp.route('/portalusers/testgetusers', methods=['GET'])
# @swag_from({
#     'tags': ['AGE - Portal - Users', 'AGE', 'AGE - Portal'],
#     'responses': {
#         200: {
#             'description': 'Test route to verify the API is working',
#             'schema': {
#                 'type': 'object',
#                 'properties': {
#                     'message': {'type': 'string'}
#                 }
#             }
#         }
#     }
#
# })
# def test_get():
#     portal_session = current_app.portal_session
#     gis = portal_session.get_gis()
#
#     #load all users
#     portal_users = gis.users.search(max_users=10000)
#
#     for user in portal_users:
#         new_local_user = PortalUser(
#             guid=uuid.uuid4(),
#             userid=user.username,
#             username=user.fullName,
#             lastname=user.lastName,
#             firstname=user.firstName,
#             fullname=user.fullName,
#             email=user.email,
#             homepage=user.homepage,
#             description=user.description,
#             status=user.status,
#             lastlogin=user.lastLogin,
#             modified=user.modified,
#             created=user.created,
#             provider='ArcGIS Online',
#             role=user.role,
#             roleid=user.roleId,
#             customrole='',
#             disabled=False,  # Assuming no disabled users for this example
#             licensetype='Viewer',  # Defaulting to Viewer for simplicity
#             usertype='',
#             access='public',  # Assuming public access for this example
#             storeage=0,  # Placeholder for storage
#             itemcount=0,  # Placeholder for item count
#             groupcount=0,  # Placeholder for group count
#             adstatus='active',  # Assuming active AD status
#             department='',  # Placeholder for department
#             agency='',  # Placeholder for agency
#             division='',  # Placeholder for division
#             team=''  # Placeholder for team
#
#         )
#
#
#
#
#
#     return jsonify({
#         "message": portal_url,
#     }), 200