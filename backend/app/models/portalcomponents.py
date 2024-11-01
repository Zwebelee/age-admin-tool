from ..db import db
from sqlalchemy import UUID, ForeignKey


class Agecomponent(db.Model):
    __tablename__ = 'agecomponents'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    ageguid = db.Column(UUID, ForeignKey('arcgisenterprise.guid'), nullable=False)
    refguid = db.Column(UUID, nullable=False)
    reftype = db.Column(db.String(120), nullable=False)

