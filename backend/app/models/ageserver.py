from ..db import db
from sqlalchemy import UUID


class Ageserver(db.Model):
    __tablename__ = 'ageserver'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    id = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    adminUrl = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=True)
    isHosted = db.Column(db.Boolean, nullable=False)
    serverType = db.Column(db.String(120), nullable=False)
    serverRole = db.Column(db.String(120), nullable=False)
    serverFunction = db.Column(db.String(120), nullable=True)

    def to_dict(self):
        return {
            "guid": self.guid,
            "id": self.id,
            "name": self.name,
            "adminUrl": self.adminUrl,
            "url": self.url,
            "isHosted": self.isHosted,
            "serverType": self.serverType,
            "serverRole": self.serverRole,
            "serverFunction": self.serverFunction
        }

    def __repr__(self):
        return f'AGE Server {self.name}'



