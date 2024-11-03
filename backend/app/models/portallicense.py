from ..db import db
from sqlalchemy import UUID


class Portallicense(db.Model):
    __tablename__ = 'portallicenses'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    id = db.Column(db.String(120), nullable=False, unique=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    level = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    maxusers = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "guid": self.guid,
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "level": self.level,
            "state": self.state,
            "maxusers": self.maxusers
        }

    def __repr__(self):
        return f"<Portallicense {self.guid} - {self.name}>"
