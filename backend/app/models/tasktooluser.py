from ..db import db
# relationship table between tasks and toolusers

task_tooluser = db.Table('task_tooluser',
                         db.Column('task_id', db.Integer, db.ForeignKey('tasks.id'), primary_key=True),
                         db.Column('tooluser_id', db.Integer, db.ForeignKey('toolusers.id'), primary_key=True)
                         )
