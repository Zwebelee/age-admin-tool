from .db import db


class Test(db.Model):
    __tablename__ = 'test'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nr = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Test {self.id} - {self.nr}>"
