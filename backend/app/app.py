from flask import Flask
from flasgger import Swagger
from modules.settings import settings
from .db import db
from pathlib import Path

from .routes.home import home_bp
from .routes.users import users_bp
from .routes.tests import tests_bp



# init global settings
settings.init(Path(Path.cwd() / "configs"), "prod")


class Config:
    db_connection = settings.get('db_connection')
    host = db_connection['host']
    user = db_connection['user']
    password = db_connection['password']
    db_name = db_connection['db_name']
    SQLALCHEMY_DATABASE_URI = f"mariadb+mariadbconnector://{user}:{password}@{host}/{db_name}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    swagger = Swagger(app)

    with app.app_context():
        # Import routes
        app.register_blueprint(home_bp)
        app.register_blueprint(users_bp)
        app.register_blueprint(tests_bp)

    return app
