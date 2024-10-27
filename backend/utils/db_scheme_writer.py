"""
    This script drops and (re-)creates the database and tables for the models defined in app/models.py.
"""

import os
from dotenv import load_dotenv

load_dotenv()

from app.models import Test
from sqlalchemy.orm import sessionmaker
from app.db import db
from sqlalchemy import create_engine,text, inspect
from sqlalchemy_utils import database_exists, create_database
import os

Base = db.Model

if __name__ == '__main__':

    host = "localhost"
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")
    db_name = os.getenv("DB_NAME")
    port = os.getenv("DB_PORT")

    # Create the database db_name if not exists
    print("Creating database if not exists...")

    db_uri = f"mariadb+mariadbconnector://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{host}:{port}/{os.getenv('DB_NAME')}"
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
