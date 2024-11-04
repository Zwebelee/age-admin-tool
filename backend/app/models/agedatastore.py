from ..db import db
from sqlalchemy import UUID


class Agedatastore(db.Model):
    __tablename__ = 'agedatastores'

    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(120), nullable=False)
    alias = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(120), nullable=False)
    ishosted = db.Column(db.Boolean, nullable=False)
    url = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    capacity_gb = db.Column(db.Integer, nullable=False)
    used_gb = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "guid": self.guid,
            "name": self.name,
            "alias": self.alias,
            "description": self.description,
            "url": self.url,
            "type": self.type,
            "ishosted": self.ishosted,
            "status": self.status,
            "capacity_gb": self.capacity_gb,
            "used_gb": self.used_gb
        }

    def __repr__(self):
        return f'AGE Data Store {self.name}'
