from flask import Blueprint
from flasgger import swag_from

home_bp = Blueprint('home', __name__)


@home_bp.route('/')
@swag_from({
    'responses': {
        200: {
            'description': 'Welcome message',
            'content': {
                'text/plain': {
                    'example': 'Welcome to the Flask MariaDB app!'
                }
            }
        }
    }
})
def home():
    return "Welcome to the Flask MariaDB app!"
