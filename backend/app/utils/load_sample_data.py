import json
from pathlib import Path
from sqlalchemy import UUID

from app.models.agedatastore import Agedatastore
from app.models.ageportal import Ageportal
from app.models.ageserver import Ageserver
from app.models.ageservice import Ageservice
from app.models.agewebadaptor import Agewebadaptor
from app.models.arcgisenterprise import Arcgisenterprise
from app.models.portalcomponent import Agecomponent
from app.models.portallicense import Portallicense
from app.models.portalusergroup import Portalusergroup
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
    initialize_sample_data(Ageportal, data["ageportals"])  # type: ignore[attr-defined]
    initialize_sample_data(Test, data["tests"])  # type: ignore[attr-defined]
    initialize_sample_data(Portaluser, data["portalusers"])  # type: ignore[attr-defined]
    initialize_sample_data(Portallicense, data["portallicenses"])  # type: ignore[attr-defined]
    initialize_sample_data(Arcgisenterprise, data["arcgisenterprises"])  # type: ignore[attr-defined]
    initialize_sample_data(Agecomponent, data["agecomponents"])  # type: ignore[attr-defined]
    initialize_sample_data(Agewebadaptor, data["agewebadaptors"])
    initialize_sample_data(Agedatastore, data["agedatastores"])
    initialize_sample_data(Ageserver, data["ageservers"])
    initialize_sample_data(Ageservice, data["ageservices"])
    initialize_sample_data(Portalusergroup, data["portalusergroups"])


