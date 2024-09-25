# connect to a local maria db

import os

import uuid
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from modules.settings import settings
import mariadb
import random


if __name__ == '__main__':
    from pathlib import Path
    # Init settings
    settings.init(Path(Path.cwd().parent / "configs"), "prod")


    db_settings = settings.get('db_connection')

    host = db_settings["host"]
    user = db_settings["user"]
    password = db_settings["password"]
    database = 'testing'

    print('test setup with direct mariadb connector')

    try:
        # Connect to the MariaDB database
        conn = mariadb.connect(
            user=user,
            password=password,
            host=host,
            database=database
        )

        # Create a cursor object
        cursor = conn.cursor()

        # Execute a query to read the "users" table
        # cursor.execute("SELECT * FROM users")
        cursor.execute("SELECT * FROM test")

        # Fetch all rows from the executed query
        rows = cursor.fetchall()

        # Print the rows
        for row in rows:
            print(row)


        # add a usre with a random name and a random UUID to the table
        # create a random username
        name = f'Randomname{random.randint(0, 1000)}'
        # create a random UUID
        uuid = uuid.uuid4()
        # add the user to the table
        cursor.execute(f"INSERT INTO users (name, guid) VALUES ('{name}', '{uuid}')")
        # commit the change
        conn.commit()

        cursor.execute(f"INSERT INTO test (id, nr) VALUES ('{random.randint(0,1000)}', '{random.randint(0,1000)}')")
        conn.commit()

    except mariadb.Error as e:
        print(f"Error connecting to MariaDB: {e}")

    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if conn:
            conn.close()

    print('test a end')

    print('end')