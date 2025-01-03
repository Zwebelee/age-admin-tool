from ..db import db

class TaskComment(db.Model):
    __tablename__ = 'task_comments'

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    tooluser_id = db.Column(db.Integer, db.ForeignKey('toolusers.id'))
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    def to_dict(self):
        return {
            "id": self.id,
            "task_id": self.task_id,
            "comment": self.comment,
            "tooluser_id": self.tooluser_id,
            "created_at": self.created_at
        }
