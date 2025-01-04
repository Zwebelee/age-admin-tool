from ..db import db

tooluser_role = db.Table('tooluser_role',
                         db.Column('tooluser_guid', db.UUID, db.ForeignKey('toolusers.guid'), primary_key=True),
                         db.Column('toolrole_guid', db.UUID, db.ForeignKey('toolroles.guid'), primary_key=True)
                         )
