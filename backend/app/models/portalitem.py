from ..db import db
from sqlalchemy import UUID

class Portalitem(db.Model):
    __tablename__ = 'portalitems'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    id = db.Column(db.String(120), nullable=False, unique=True)
    title = db.Column(db.String(255), nullable=True)
    type = db.Column(db.String(120), nullable=True)
    owner = db.Column(db.String(120), nullable=True)
    homepage = db.Column(db.String(255), nullable=True)
    url = db.Column(db.String(255), nullable=True)
    sizebyte = db.Column(db.Integer, nullable=True)
    sharing = db.Column(db.String(120), nullable=True)
    groupsharing = db.Column(db.String(255), nullable=True)
    folder = db.Column(db.String(255), nullable=True)
    editable = db.Column(db.Boolean, nullable=True)
    viewcount = db.Column(db.Integer, nullable=True)
    usagequota = db.Column(db.Integer, nullable=True)
    categories = db.Column(db.String(255), nullable=True)
    contentstatus = db.Column(db.String(120), nullable=True)
    createdat = db.Column(db.String(120), nullable=True)
    modifiedat = db.Column(db.String(120), nullable=True)
    snippet = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(500), nullable=True)
    thumbnail = db.Column(db.String(255), nullable=True)
    tags = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "guid": self.guid,
            "id": self.id,
            "title": self.title,
            "type": self.type,
            "owner": self.owner,
            "homepage": self.homepage,
            "url": self.url,
            "sizebyte": self.sizebyte,
            "sharing": self.sharing,
            "groupsharing": self.groupsharing,
            "folder": self.folder,
            "editable": self.editable,
            "viewcount": self.viewcount,
            "usagequota": self.usagequota,
            "categories": self.categories,
            "contentstatus": self.contentstatus,
            "createdat": self.createdat,
            "modifiedat": self.modifiedat,
            "snippet": self.snippet,
            "description": self.description,
            "thumbnail": self.thumbnail,
            "tags": self.tags
        }

    def __repr__(self):
        return f'Portal Item {self.title}'
    