from ..db import db
from sqlalchemy import UUID


class Ageportal(db.Model):
    __tablename__ = 'ageportal'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(120), nullable=False)
    alias = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    url = db.Column(db.String(255), nullable=True)
    type = db.Column(db.String(255), nullable=True)
    ishosted = db.Column(db.Boolean, nullable=False)
    status = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            "guid": self.guid,
            "name": self.name,
            "alias": self.alias,
            "description": self.description,
            "url": self.url,
            "type": self.type,
            "ishosted": self.ishosted,
            "status": self.status
        }

    def __repr__(self):
        return f'AGE Portal {self.name}'
