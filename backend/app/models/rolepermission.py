from ..db import db

role_permission = db.Table('role_permission',
                           db.Column('toolrole_guid', db.UUID, db.ForeignKey('toolroles.guid'), primary_key=True),
                           db.Column('permission_guid', db.UUID, db.ForeignKey('permissions.guid'), primary_key=True)
                           )