from ..db import db
from sqlalchemy import UUID


class Ageservice(db.Model):
    # TODO: Overthink Services, origin and portalitem overlap
    #  foreign key to server where service lies

    __tablename__ = 'ageservices'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    status = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(120), nullable=False)
    serverurl = db.Column(db.String(255), nullable=False)
    folder = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    serviceurl = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            "guid": self.guid,
            "status": self.status,
            "name": self.name,
            "type": self.type,
            "serverurl": self.serverurl,
            "folder": self.folder,
            "url": self.url,
            "serviceurl": self.serviceurl,
            "username": self.username
        }

    def __repr__(self):
        return f'AGE Service {self.name}'
