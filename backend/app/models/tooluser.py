from .tasktooluser import task_tooluser
from .tooluserrole import tooluser_role
from ..db import db


class Tooluser(db.Model):
    __tablename__ = 'toolusers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    tasks = db.relationship('Task', secondary=task_tooluser, backref='toolusers')
    roles = db.relationship('Toolrole', secondary=tooluser_role, backref='toolusers')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def __repr__(self):
        return f'Tooluser {self.name}'
