from ..db import db

class Portalusercategory(db.Model):
    __tablename__ = 'portalusercategories'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('portalusercategories.id'), nullable=True)
    parent = db.relationship('Portalusercategory', remote_side=[id], backref='children')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "parent_id": self.parent_id
        }

    def __repr__(self):
        return f'Portal User Category {self.title}'
