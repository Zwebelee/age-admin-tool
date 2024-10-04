from app.models import Test
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
from sqlalchemy import create_engine,text, inspect
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
    choice = input("Do you want to drop tables? (0=skip, 1=drop model tables, 2=drop all tables): ")

    if choice == "1":
        print('Dropping model tables...')
        Base.metadata.drop_all(engine)
    elif choice == "2":
        print('Dropping all tables...')
        inspector = inspect(engine)

        with engine.connect() as conn:
            conn.execute(text("SET FOREIGN_KEY_CHECKS = 0;"))
            for table_name in inspector.get_table_names():
                conn.execute(text(f"DROP TABLE IF EXISTS {table_name};"))
            conn.execute(text("SET FOREIGN_KEY_CHECKS = 1;"))
    else:
        print("Tables not dropped.")

    # Create tables for all models
    Base.metadata.create_all(engine)

    # Test Data
    test_data = [
        Test(id=1, nr=21),
        Test(id=2, nr=5),
        Test(id=3, nr=65),
    ]  # TODO: Export to testdata-file
    # Insert test data
    session = Session()
    session.add_all(test_data)
    session.commit()

    print("Tables created successfully.")
