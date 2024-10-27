import argparse
import os
from app.app import create_app
from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect

# load environment variables
load_dotenv()

# Setup argument parser
parser = argparse.ArgumentParser(description="Run the Flask app.")
parser.add_argument('--debug', action='store_true', help="Run the app in debug mode.")
args = parser.parse_args()

if __name__ == '__main__':
    app = create_app()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.run(host="0.0.0.0", port=int("5000"), debug=args.debug)
