from ..db import db
from sqlalchemy import UUID


class Agedatastore(db.Model):
    __tablename__ = 'agedatastores'

    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    name = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            "guid": self.guid,
            "name": self.name
        }

    def __repr__(self):
        return f'AGE Data Store {self.name}'
