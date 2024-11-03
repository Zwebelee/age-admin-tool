from ..db import db


class Toolrole(db.Model):
    __tablename__ = 'toolroles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

    def __repr__(self):
        return f'Toolrole {self.name}'
