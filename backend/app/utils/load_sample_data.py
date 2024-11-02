import json
from pathlib import Path
from sqlalchemy import UUID

from app.models.agedatastore import Agedatastore
from app.models.ageportal import Ageportal
from app.models.ageserver import Ageserver
from app.models.ageservice import Ageservice
from app.models.agewebadaptor import Agewebadaptor
from app.models.arcgisenterprise import Arcgisenterprise
from app.models.agecomponent import Agecomponent
from app.models.flagrule import Flagrule
from app.models.portalitem import Portalitem
from app.models.portallicense import Portallicense
from app.models.portalmembercategory import Portalusercategory
from app.models.portalusergroup import Portalusergroup
from app.models.tasktooluser import task_tooluser
from app.models.task import Task
from app.models.tests import Test
from app.models.portaluser import Portaluser
from app.db import db
from uuid import UUID as UUIDType

from app.models.toolrole import Toolrole
from app.models.tooluser import Tooluser
from app.models.tooluserrole import tooluser_role


def load_sample_data():
    json_path = Path(__file__).parent.parent.parent / 'data' / 'sample_data.json'
    with open(json_path, 'r') as file:
        data = json.load(file)
        return data


def initialize_sample_data(model, data):
    if isinstance(model, db.Table):
        # Check if data is already present for association tables
        if db.session.execute(model.select()).fetchone() is None:
            # Handle insertion for association tables
            for entry in data:
                db.session.execute(model.insert().values(**entry))
            db.session.commit()
            print(f"Sample data initialized for {model.name}.")
        else:
            print(f"Sample data already exists for {model.name}.")
    else:
        # Handle insertion for regular models
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
    initialize_sample_data(Agewebadaptor, data["agewebadaptors"])
    initialize_sample_data(Agedatastore, data["agedatastores"])
    initialize_sample_data(Ageserver, data["ageservers"])
    initialize_sample_data(Ageservice, data["ageservices"])
    initialize_sample_data(Portalusergroup, data["portalusergroups"])
    initialize_sample_data(Portalitem, data["portalitems"])
    initialize_sample_data(Portalusercategory, data["portalusercategories"])
    initialize_sample_data(Flagrule, data["flagrules"])
    initialize_sample_data(Task, data["tasks"])
    initialize_sample_data(Tooluser, data["toolusers"])
    initialize_sample_data(task_tooluser, data["task_tooluser"])
    initialize_sample_data(Toolrole, data["toolroles"])
    initialize_sample_data(tooluser_role, data["tooluser_role"])
