from ..db import db
from sqlalchemy import UUID


class Ageportal(db.Model):
    __tablename__ = 'agewebadaptor'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    machineName = db.Column(db.String(120), nullable=False)
    machineIP = db.Column(db.String(120), nullable=False)
    webAdaptorURL = db.Column(db.String(255), nullable=False)
    id = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    httpPort = db.Column(db.Integer, nullable=False)
    httpsPort = db.Column(db.Integer, nullable=False)
    refreshServerListInterval = db.Column(db.Integer, nullable=False)
    reconnectServerOnFailureInterval = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "guid": self.guid,
            "machineName": self.machineName,
            "machineIP": self.machineIP,
            "webAdaptorURL": self.webAdaptorURL,
            "id": self.id,
            "description": self.description,
            "httpPort": self.httpPort,
            "httpsPort": self.httpsPort,
            "refreshServerListInterval": self.refreshServerListInterval,
            "reconnectServerOnFailureInterval": self.reconnectServerOnFailureInterval
        }

    def __repr__(self):
        return f'AGE Web Adaptor {self.machineName}'
