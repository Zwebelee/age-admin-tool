from ..db import db

tooluser_role = db.Table('tooluser_role',
                         db.Column('tooluser_id', db.Integer, db.ForeignKey('toolusers.id'), primary_key=True),
                         db.Column('toolrole_id', db.Integer, db.ForeignKey('toolroles.id'), primary_key=True)
                         )
