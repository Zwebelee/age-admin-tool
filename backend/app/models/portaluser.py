from ..db import db
from sqlalchemy import UUID
import enum


class StatusEnum(enum.Enum):
    active = 'active'
    deleted = 'deleted'
    pending = 'pending'


class Portaluser(db.Model):
    __tablename__ = 'portalusers'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    userid = db.Column(db.String(120), nullable=False, unique=True)
    username = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    firstname = db.Column(db.String(120), nullable=False)
    fullname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    homepage = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Enum(StatusEnum), nullable=False, default=StatusEnum.active)
    lastlogin = db.Column(db.DateTime, nullable=True)
    modified = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    provider = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(120), nullable=False)
    roleid = db.Column(db.String(120), nullable=False)
    customrole = db.Column(db.String(120), nullable=False)
    disabled = db.Column(db.Boolean, nullable=False)
    licensetype = db.Column(db.String(120), nullable=False)
    usertype = db.Column(db.String(120), nullable=False)
    access = db.Column(db.String(120), nullable=False)
    storeage = db.Column(db.Integer, nullable=False)
    itemcount = db.Column(db.Integer, nullable=False)
    groupcount = db.Column(db.Integer, nullable=False)
    adstatus = db.Column(db.String(120), nullable=False)
    division1 = db.Column(db.String(120), nullable=False)
    division2 = db.Column(db.String(120), nullable=False)
    division3 = db.Column(db.String(120), nullable=False)
    division4 = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            "guid": self.guid,
            "userid": self.userid,
            "username": self.username,
            "lastname": self.lastname,
            "firstname": self.firstname,
            "fullname": self.fullname,
            "email": self.email,
            "homepage": self.homepage,
            "description": self.description,
            "status": self.status.name if self.status else None,
            "lastlogin": self.lastlogin,
            "modified": self.modified,
            "created": self.created,
            "provider": self.provider,
            "role": self.role,
            "roleid": self.roleid,
            "customrole": self.customrole,
            "disabled": self.disabled,
            "licensetype": self.licensetype,
            "usertype": self.usertype,
            "access": self.access,
            "storeage": self.storeage,
            "itemcount": self.itemcount,
            "groupcount": self.groupcount,
            "adstatus": self.adstatus,
            "division1": self.division1,
            "division2": self.division2,
            "division3": self.division3,
            "division4": self.division4
        }

    def __repr__(self):
        return f"<Username {self.username}>"
