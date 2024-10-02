from modules.settings import settings
from pathlib import Path

"""
    This script drops and (re-)creates the database and tables for the models defined in app/models.py.
"""

# TODO: Fix so imports can be top level but settings are always first initialized!!!
#  move out of app init

# init settings
config_path = Path(__file__).parent.parent / 'configs'
settings.init(config_path, "prod")

from sqlalchemy.orm import sessionmaker
from app.db import db
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database

Base = db.Model

if __name__ == '__main__':

    db_connection = settings.get('db_connection')
    host = db_connection['host']
    user = db_connection['user']
    password = db_connection['password']
    db_name = db_connection['db_name']

    # Create the database db_name if not exists
    print("Creating database if not exists...")

    db_uri = f"mariadb+mariadbconnector://{user}:{password}@{host}/{db_name}"
    if not database_exists(db_uri):
        create_database(db_uri)
        print("Database created successfully.")
    else:
        print("Database already exists.")


    # Initialize the database connection
    engine = create_engine(db_uri)
    Session = sessionmaker(bind=engine)

    # Drop all tables
    print("Existing tables won't be overwritten.")
    if input("Do you want to drop all tables? (y/n): ") == "y":
        print('Dropping tables...')
        Base.metadata.drop_all(engine)
    else:
        print("Tables not dropped.")

    # Create tables for all models
    Base.metadata.create_all(engine)

    print("Tables created successfully.")
