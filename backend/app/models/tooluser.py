from .tasktooluser import task_tooluser
from .tooluserrole import tooluser_role
from ..db import db
from werkzeug.security import generate_password_hash, check_password_hash


class ToolUser(db.Model):
    __tablename__ = 'toolusers'
    guid = db.Column(db.UUID, primary_key=True, unique=True)
    username = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    language = db.Column(db.String(255), nullable=False)
    theme = db.Column(db.String(255), nullable=False)
    tasks = db.relationship('Task', secondary=task_tooluser, backref='toolusers')
    roles = db.relationship('ToolRole', secondary=tooluser_role, backref='toolusers')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "guid": self.guid,
            "username": self.username,
            "language": self.language,
            "theme": self.theme,
        }

    def __repr__(self):
        return f'ToolUser {self.username}'
