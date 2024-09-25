from .db import db

# TODO: sqlacodegen -> generate files!
class User(db.Model):
    guid = db.Column(db.String(80), primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    # email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"


class Test(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    nr = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return f"<Test {self.id} - {self.nr}>"