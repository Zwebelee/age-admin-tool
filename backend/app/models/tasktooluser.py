from ..db import db
# relationship table between tasks and toolusers

task_tooluser = db.Table('task_tooluser',
                         db.Column('task_guid', db.UUID(as_uuid=False), db.ForeignKey('tasks.guid'), primary_key=True),
                         db.Column('tooluser_guid', db.UUID(as_uuid=False), db.ForeignKey('toolusers.guid'), primary_key=True)
                         )
