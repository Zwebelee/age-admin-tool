from .tasktooluser import task_tooluser
from ..db import db


class Tooluser(db.Model):
    __tablename__ = 'toolusers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    tasks = db.relationship('Task', secondary=task_tooluser, backref='toolusers')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def __repr__(self):
        return f'Tooluser {self.name}'
