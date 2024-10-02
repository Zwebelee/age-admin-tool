from flask import Flask
from modules.settings import settings
from .db import db
from pathlib import Path

# init global settings
settings.init(Path(Path.cwd() / "configs"), "prod")


class Config:
    db_connection = settings.get('db_connection')
    host = db_connection['host']
    user = db_connection['user']
    password = db_connection['password']
    db_name = db_connection['db_name']
    SQLALCHEMY_DATABASE_URI = f"mariadb+mariadbconnector://{user}:{password}@{host}/{db_name}"  # TODO: FIX
    SQLALCHEMY_TRACK_MODIFICATIONS = False


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    with app.app_context():
        # Import routes
        from .routes import main
        app.register_blueprint(main)

        # Create the tables
        db.create_all()  # TODO: Shift to utils db_scheme_writer!

    return app
