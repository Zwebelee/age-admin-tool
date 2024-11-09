import os

import redis
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity
)
from flasgger import Swagger
from .db import db
from .configs.swagger_config import SWAGGER_CONFIG
from .extensions.jwtmanager import jwt
from .routes.agedatastore import agedatastore_bp
from .routes.ageportal import ageportal_bp
from .routes.ageserver import ageserver_bp
from .routes.agewebadaptor import agewebadaptor_bp
from .routes.arcgisenterprises import arcgisenterprise_bp
from .routes.home import home_bp
from .routes.login import login_bp
from .routes.logout import logout_bp
from .routes.portallicenses import portallicenses_bp
from .routes.portalusers import portalusers_bp
from .routes.proteced import proteced_bp
from .routes.refresh import refresh_bp
from .routes.register import register_bp
from .routes.tests import tests_bp
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
    app.register_blueprint(tests_bp)
    app.register_blueprint(arcgisenterprise_bp)
    app.register_blueprint(ageserver_bp)
    app.register_blueprint(ageportal_bp)
    app.register_blueprint(agedatastore_bp)
    app.register_blueprint(agewebadaptor_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(register_bp)
    app.register_blueprint(logout_bp)
    app.register_blueprint(proteced_bp)
    app.register_blueprint(refresh_bp)
    return None


def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv('APP_SECRET_KEY')
    CORS(app, ressources={r"/*": {"origins": "http://localhost:5001"}})
    app.config.from_object(Config)
    register_extensions(app)
    register_blueprints(app)

    with app.app_context():
        db.create_all()
        if os.getenv('INIT_SAMPLE_DATA'):
            init_all_sample_data()

    return app
