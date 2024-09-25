import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from modules.settings import settings


class Config:
    db_connection = settings.get('db_connection')
    SQLALCHEMY_DATABASE_URI = f"mariadb+mariadbconnector://{db_connection['host']}:{db_connection['password']}@{db_connection['host']}/{db_connection['name']}" #TODO: FIX
    SQLALCHEMY_TRACK_MODIFICATIONS = False

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        # Import routes
        from .routes import main
        app.register_blueprint(main)

        # Create the tables
        db.create_all()

    return app
