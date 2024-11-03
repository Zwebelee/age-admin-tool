from ..db import db
from sqlalchemy import UUID


class Portalusergroup(db.Model):
    __tablename__ = 'portalusergroups'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    id = db.Column(db.String(120), nullable=False)
    capabilities = db.Column(db.String(255), nullable=True)
    owner = db.Column(db.String(120), nullable=False)
    createdat = db.Column(db.String(120), nullable=False)
    modifiedat = db.Column(db.String(120), nullable=False)
    access = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    snippet = db.Column(db.String(255), nullable=True)
    thumbnail = db.Column(db.String(255), nullable=True)
    homepage = db.Column(db.String(255), nullable=True)
    tags = db.Column(db.String(255), nullable=True)
    membercount = db.Column(db.Integer, nullable=False)
    contentcount = db.Column(db.Integer, nullable=False)
    leavingdisallowed = db.Column(db.Boolean, nullable=False)
    isreadonly = db.Column(db.Boolean, nullable=False)
    isviewonly = db.Column(db.Boolean, nullable=False)
    isprotected = db.Column(db.Boolean, nullable=False)
    hiddenmembers = db.Column(db.Boolean, nullable=False)
    isinvitationonly = db.Column(db.Boolean, nullable=False)
    iseditinggroup = db.Column(db.Boolean, nullable=False)
    type = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            "guid": self.guid,
            "id": self.id,
            "capabilities": self.capabilities,
            "owner": self.owner,
            "createdat": self.createdat,
            "modifiedat": self.modifiedat,
            "access": self.access,
            "title": self.title,
            "description": self.description,
            "snippet": self.snippet,
            "thumbnail": self.thumbnail,
            "homepage": self.homepage,
            "tags": self.tags,
            "membercount": self.membercount,
            "contentcount": self.contentcount,
            "leavingdisallowed": self.leavingdisallowed,
            "isreadonly": self.isreadonly,
            "isviewonly": self.isviewonly,
            "isprotected": self.isprotected,
            "hiddenmembers": self.hiddenmembers,
            "isinvitationonly": self.isinvitationonly,
            "iseditinggroup": self.iseditinggroup,
            "type": self.type
        }

    def __repr__(self):
        return f'Portal User Group {self.title}'
