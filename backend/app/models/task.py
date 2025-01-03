from sqlalchemy import ForeignKey

from ..db import db


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    task_rule_id = db.Column(db.Integer, db.ForeignKey('task_rules.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(255), nullable=False, default='pending')
    priority = db.Column(db.String(255), nullable=False, default='normal')
    assigned_to = db.Column(db.String(255), ForeignKey('toolusers.id'))
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())

    task_rule = db.relationship('TaskRule', backref='tasks')
    comments = db.relationship('TaskComment', backref='tasks')


    def to_dict(self):
        return {
            "id": self.id,
            "task_rule_id": self.task_rule_id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "priority": self.priority,
            "assigned_to": self.assigned_to,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f'Task {self.title}'
