from flask import Blueprint, render_template_string
from flasgger import swag_from

home_bp = Blueprint('home', __name__)

html_content = '''
<html>
    <head>
        <title>Welcome to AGE-Admin Tool Backend</title>
    </head>
    <body>
        <h1>Welcome to the AGE-Admin Tool Backend</h1>
        <p>This is the backend service for the AGE-Admin Tool, built with Flask and MariaDB.</p>
        <p>For API documentation, visit <a href="/apidocs">API Docs</a>.</p>
    </body>
</html>
'''

@home_bp.route('/')

@home_bp.route('/')
@swag_from({
    'responses': {
        200: {
            'description': 'Welcome message for the AGE-Admin Tool Backend',
            'content': {
                'text/plain': {
                    'example': 'Welcome to the AGE-Admin Tool Backend - Flask & MariaDB'
                },
                'text/html': {
                    'example': html_content
                }
            }
        }
    }
})
def home():
    return render_template_string(html_content)
