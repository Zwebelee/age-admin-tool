from .portaluser import PortalUser
from sqlalchemy import UUID

from ..db import db


class Task(db.Model):
    __tablename__ = 'tasks'

    guid = db.Column(db.UUID, primary_key=True, nullable=False, unique=True)
    task_rule_guid = db.Column(db.UUID, db.ForeignKey('task_rules.guid'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(255), nullable=False, default='pending')
    priority = db.Column(db.String(255), nullable=False, default='normal')
    assigned_to = db.Column(db.UUID, db.ForeignKey('toolusers.guid'))
    linked_object_guid = db.Column(UUID, nullable=False)
    linked_object_type = db.Column(db.String(50), nullable=True)  # Type of the linked object
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())

    comments = db.relationship('TaskComment', backref='task')

    @property
    def linked_object(self):
        if self.linked_object_type == "PortalUser":
            return PortalUser.query.get(self.linked_object_guid)
        # TODO: implent more objecttypes
        # elif self.linked_object_type == "AnotherObject":
        #     return AnotherObject.query.get(self.linked_object_guid)
        return None


    def to_dict(self):
        return {
            "guid": self.guid,
            "task_rule_guid": self.task_rule_guid,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "priority": self.priority,
            "assigned_to": self.assigned_to,
            "linked_object_guid": self.linked_object_guid,
            "linked_object_type": self.linked_object_type,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f'Task {self.title}'
