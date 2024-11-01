import os
from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from .db import db
from .routes.home import home_bp
from .routes.portallicenses import portallicenses_bp
from .routes.portalusers import portalusers_bp
from .routes.tests import tests_bp
from .utils.load_sample_data import init_all_sample_data


class Config:
    """Set Flask configuration variables."""
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SWAGGER = {
        'title': 'AGE-Admin-TOOL API',
        'uiversion': 3,
        'version': '0.0.1',
        'description': 'API for the AGE-Admin-TOOL',
        'tags': [
            {
                'name': 'Portalusers',
                'description': 'Operations about portalusers'
            },
            {
                'name': 'Portallicenses',
                'description': 'Operations about portallicenses'
            },
            {
                'name': 'Tests',
                'description': 'Operations about tests'
            }
        ]
    }


def register_extensions(app):
    """Register Flask extensions."""
    db.init_app(app)
    Swagger(app)
    return None


def register_blueprints(app):
    """Register Flask blueprints."""
    app.register_blueprint(home_bp)
    app.register_blueprint(portalusers_bp)
    app.register_blueprint(portallicenses_bp)
    app.register_blueprint(tests_bp)
    return None


def create_app():
    app = Flask(__name__)
    CORS(app, ressources={r"/*": {"origins": "http://localhost:5001"}})
    app.config.from_object(Config)
    register_extensions(app)
    register_blueprints(app)

    with app.app_context():
        db.create_all()
        if os.getenv('INIT_SAMPLE_DATA'):
            init_all_sample_data()

    return app
