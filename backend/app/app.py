import os
from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from .db import db
from .configs.swagger_config import SWAGGER_CONFIG
from .extensions.jwtmanager import jwt
from .routes.agedatastores import agedatastores_bp
from .routes.ageportals import ageportals_bp
from .routes.ageservers import ageservers_bp
from .routes.agewebadaptors import agewebadaptors_bp
from .routes.arcgisenterprises import arcgisenterprises_bp
from .routes.home import home_bp
from .routes.login import login_bp
from .routes.logout import logout_bp
from .routes.permissions import permissions_bp
from .routes.portalgroups import portalgroups_bp
from .routes.portalitems import portalitems_bp
from .routes.portallicenses import portallicenses_bp
from .routes.portalusers import portalusers_bp
from .routes.proteced import proteced_bp
from .routes.refresh import refresh_bp
from .routes.register import register_bp
from .routes.taskcomments import taskcomments_bp
from .routes.taskrules import taskrules_bp
from .routes.tasks import tasks_bp
from .routes.toolusers import toolusers_bp
from .routes.validatetoken import validatetoken_bp
from .utils.load_sample_data import init_all_sample_data


def get_db_uri():
    env_var = os.getenv('DATABASE_URL')
    if env_var:
        return env_var
    else:
        print(
            f" \t - Warning -"
            f"DATABASE_URL environment variable not set. Using default values and localhost for development.")
        db_prefix = os.getenv('DATABASE_URL_PREFIX')
        db_user = os.getenv('DB_USER')
        db_password = os.getenv('DB_PASSWORD')
        db_host = "localhost"
        db_port = os.getenv('DB_PORT')
        db_name = os.getenv('DB_NAME')
        return f"{db_prefix}{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"


class Config:
    """Set Flask configuration variables."""
    SQLALCHEMY_DATABASE_URI = get_db_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SWAGGER = SWAGGER_CONFIG
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    JWT_REFRESH_TOKEN_EXPIRES = int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES'))
    JWT_REFRESH_COOKIE_NAME = os.getenv('JWT_REFRESH_COOKIE_NAME')


def register_extensions(app):
    """Register Flask extensions."""
    db.init_app(app)
    Swagger(app)
    jwt.init_app(app)
    return None


def register_blueprints(app):
    """Register Flask blueprints."""
    app.register_blueprint(home_bp)
    app.register_blueprint(portalusers_bp)
    app.register_blueprint(portallicenses_bp)
    app.register_blueprint(portalitems_bp)
    app.register_blueprint(portalgroups_bp)
    app.register_blueprint(arcgisenterprises_bp)
    app.register_blueprint(ageservers_bp)
    app.register_blueprint(ageportals_bp)
    app.register_blueprint(agedatastores_bp)
    app.register_blueprint(agewebadaptors_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(register_bp)
    app.register_blueprint(logout_bp)
    app.register_blueprint(proteced_bp)
    app.register_blueprint(refresh_bp)
    app.register_blueprint(toolusers_bp)
    app.register_blueprint(tasks_bp)
    app.register_blueprint(taskrules_bp)
    app.register_blueprint(taskcomments_bp)
    app.register_blueprint(validatetoken_bp)
    app.register_blueprint(permissions_bp)
    return None


def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv('APP_SECRET_KEY')
    CORS(app, ressources={r"/*": {"origins": "http://localhost:5001"}}, supports_credentials=True)
    app.config.from_object(Config)
    register_extensions(app)
    register_blueprints(app)

    with app.app_context():
        db.create_all()
        if os.getenv('INIT_SAMPLE_DATA'):
            init_all_sample_data()

    return app
