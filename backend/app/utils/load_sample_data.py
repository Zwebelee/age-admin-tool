import json
import uuid
from pathlib import Path
from sqlalchemy import UUID

from app.db import db
from app.models.agedatastore import Agedatastore
from app.models.ageportal import Ageportal
from app.models.ageserver import Ageserver
from app.models.ageservice import Ageservice
from app.models.agewebadaptor import Agewebadaptor
from app.models.arcgisenterprise import Arcgisenterprise
from app.models.agecomponent import Agecomponent
from app.models.taskcomment import TaskComment
from app.models.taskrule import TaskRule
from app.models.portalitem import Portalitem
from app.models.portallicense import Portallicense
from app.models.portalmembercategory import Portalusercategory
from app.models.portalgroup import Portalgroup
from app.models.tasktooluser import task_tooluser
from app.models.task import Task
from app.models.portaluser import PortalUser
from app.models.toolrole import ToolRole
from app.models.tooluser import ToolUser
from app.models.tooluserrole import tooluser_role
from app.models.permission import Permission
from app.models.rolepermission import role_permission


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
                for key, value in entry.items():
                    if "guid" in key:
                        entry[key] = uuid.UUID(value)
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
                            item[column.name] = uuid.UUID(item[column.name])
                new_item = model(**item)
                db.session.add(new_item)
            db.session.commit()
            print(f"Sample data initialized for {model.__tablename__}.")
        else:
            print(f"Sample data already exists for {model.__tablename__}.")


def init_all_sample_data():
    data = load_sample_data()

    # models without relationships
    initialize_sample_data(TaskRule, data["task_rules"])
    initialize_sample_data(Permission, data["permissions"])
    initialize_sample_data(ToolRole, data["toolroles"])
    initialize_sample_data(PortalUser, data["portalusers"])
    initialize_sample_data(Ageportal, data["ageportals"])
    initialize_sample_data(Portallicense, data["portallicenses"])
    initialize_sample_data(Arcgisenterprise, data["arcgisenterprises"])
    initialize_sample_data(Agedatastore, data["agedatastores"])
    initialize_sample_data(Ageserver, data["ageservers"])
    initialize_sample_data(Ageservice, data["ageservices"])
    initialize_sample_data(Portalgroup, data["portalgroups"])
    initialize_sample_data(Portalitem, data["portalitems"])
    initialize_sample_data(Agewebadaptor, data["agewebadaptors"])

    # models with relationships
    initialize_sample_data(ToolUser, data["toolusers"])
    initialize_sample_data(Task, data["tasks"])
    initialize_sample_data(TaskComment, data["task_comments"])
    initialize_sample_data(Agecomponent, data["agecomponents"])
    initialize_sample_data(Portalusercategory, data["portalusercategories"])
    initialize_sample_data(task_tooluser, data["task_tooluser"])
    initialize_sample_data(tooluser_role, data["tooluser_role"])
    initialize_sample_data(role_permission, data["role_permission"])
