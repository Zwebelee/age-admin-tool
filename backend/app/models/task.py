from ..db import db


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())
    flagrule_id = db.Column(db.Integer, db.ForeignKey('flagrules.id'), nullable=False)
    flagrule = db.relationship('Flagrule', backref='tasks')

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "flagrule_id": self.flagrule_id
        }

    def __repr__(self):
        return f'Task {self.description}'
