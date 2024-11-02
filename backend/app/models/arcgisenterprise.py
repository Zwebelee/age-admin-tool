from ..db import db
from sqlalchemy import UUID


class Arcgisenterprise(db.Model):
    __tablename__ = 'arcgisenterprises'
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(120), nullable=False)
    alias = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'guid': self.guid,
            'name': self.name,
            'alias': self.alias,
            'description': self.description
        }

    def __repr__(self):
        return f'<Arcgisenterprise {self.name}>'
