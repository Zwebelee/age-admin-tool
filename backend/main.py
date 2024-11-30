# load and init env first
from dotenv import load_dotenv
import os

load_dotenv('../.env')

import argparse
from app.app import create_app

# Setup argument parser
parser = argparse.ArgumentParser(description="Run the Flask app.")
parser.add_argument('--debug', action='store_true', help="Run the app in debug mode.")
args = parser.parse_args()

if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port=int(os.getenv('BACKEND_OUTPORT')), debug=args.debug)
