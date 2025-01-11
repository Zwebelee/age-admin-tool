from ..db import db

class Permission(db.Model):
    __tablename__ = 'permissions'
    guid = db.Column(db.UUID, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    def to_dict(self):
        return {
            "guid": self.guid,
            "name": self.name
        }

    def __repr__(self):
        return f'Permission {self.name}'