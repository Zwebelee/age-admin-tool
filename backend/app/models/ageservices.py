from ..db import db
from sqlalchemy import UUID


class Ageservice(db.Model):
    guid = db.Column(UUID, primary_key=True, nullable=False, unique=True)
    # TODO: Overthink Services, origin and portalitem overlap
    #  foreign key to server where service lies
