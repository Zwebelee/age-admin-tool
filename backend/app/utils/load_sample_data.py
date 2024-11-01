import json
from pathlib import Path
from app.models.tests import Test
from app.models.portaluser import Portaluser
from app.db import db
from uuid import UUID


def load_sample_data():
    json_path = Path(__file__).parent.parent.parent / 'data' / 'sample_data.json'
    with open(json_path, 'r') as file:
        data = json.load(file)
        return data


def initialize_sample_data(model, data):
    if model.query.first() is None:
        for item in data:
            if model == Portaluser and 'guid' in item:
                item['guid'] = UUID(item['guid'])
            new_item = model(**item)
            db.session.add(new_item)
        db.session.commit()
        print(f"Sample data initialized for {model.__tablename__}.")
    else:
        print(f"Sample data already exists for {model.__tablename__}.")


def init_all_sample_data():
    data = load_sample_data()
    initialize_sample_data(Test, data["tests"])
    initialize_sample_data(Portaluser, data["portalusers"])
