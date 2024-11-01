from ..db import db
from sqlalchemy import UUID


class Test(db.Model):
    __tablename__ = 'test'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    guid = db.Column(UUID, nullable=False, unique=True)
    nr = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "guid": self.guid,
            "nr": self.nr
        }

    def __repr__(self):
        return f"<Test {self.id} - {self.nr}>"
