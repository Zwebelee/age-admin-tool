from .tasktooluser import task_tooluser
from .tooluserrole import tooluser_role
from ..db import db
from werkzeug.security import generate_password_hash, check_password_hash


class Tooluser(db.Model):
    __tablename__ = 'toolusers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    tasks = db.relationship('Task', secondary=task_tooluser, backref='toolusers')
    roles = db.relationship('Toolrole', secondary=tooluser_role, backref='toolusers')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }

    def __repr__(self):
        return f'Tooluser {self.username}'
