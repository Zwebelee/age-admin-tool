from ..db import db


class TaskRule(db.Model):
    __tablename__ = 'task_rules'
    guid = db.Column(db.UUID, primary_key=True, unique=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    action = db.Column(db.String(255), nullable=False)
    rule_conditions = db.Column(db.JSON, nullable=False)
    whitelist = db.Column(db.JSON)
    blacklist = db.Column(db.JSON)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())
    tasks = db.relationship('Task', backref='task_rule')

    def to_dict(self):
        return {
            "guid": self.guid,
            "name": self.name,
            "description": self.description,
            "action": self.action,
            "rule_conditions": self.rule_conditions,
            "whitelist": self.whitelist,
            "blacklist": self.blacklist,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f'TaskRule {self.name}'
