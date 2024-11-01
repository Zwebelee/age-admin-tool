import json
from pathlib import Path
from sqlalchemy import UUID

from app.models.ageportal import Ageportal
from app.models.arcgisenterprise import Arcgisenterprise
from app.models.portalcomponents import Agecomponent
from app.models.portallicenses import Portallicense
from app.models.tests import Test
from app.models.portaluser import Portaluser
from app.db import db
from uuid import UUID as UUIDType


def load_sample_data():
    json_path = Path(__file__).parent.parent.parent / 'data' / 'sample_data.json'
    with open(json_path, 'r') as file:
        data = json.load(file)
        return data


def initialize_sample_data(model, data):
    if model.query.first() is None:
        for item in data:
            for column in model.__table__.columns:
                if isinstance(column.type, UUID):
                    if column.name in item:
                        item[column.name] = UUIDType(item[column.name])
            new_item = model(**item)
            db.session.add(new_item)
        db.session.commit()
        print(f"Sample data initialized for {model.__tablename__}.")
    else:
        print(f"Sample data already exists for {model.__tablename__}.")


def init_all_sample_data():
    data = load_sample_data()
    initialize_sample_data(Ageportal, data["ageportals"])
    initialize_sample_data(Test, data["tests"])
    initialize_sample_data(Portaluser, data["portalusers"])
    initialize_sample_data(Portallicense, data["portallicenses"])
    initialize_sample_data(Arcgisenterprise, data["arcgisenterprises"])
    initialize_sample_data(Agecomponent, data["agecomponents"])
