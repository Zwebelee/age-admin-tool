from ..db import db

class TaskComment(db.Model):
    __tablename__ = 'task_comments'

    guid = db.Column(db.UUID, primary_key=True, unique=True)
    task_guid = db.Column(db.UUID, db.ForeignKey('tasks.guid'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    tooluser_guid = db.Column(db.UUID, db.ForeignKey('toolusers.guid'))
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            "guid": self.guid,
            "task_guid": self.task_guid,
            "comment": self.comment,
            "tooluser_guid": self.tooluser_guid,
            "created_at": self.created_at
        }
