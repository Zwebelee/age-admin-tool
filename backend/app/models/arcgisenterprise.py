from ..db import db
from sqlalchemy import UUID


class Arcgisenterprise(db.Model):
    __tablename__ = 'arcgisenterprises'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(120), nullable=False)
    alias = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255), nullable=True)
