import argparse
from app.app import create_app

# Setup argument parser
parser = argparse.ArgumentParser(description="Run the Flask app.")
parser.add_argument('--debug', action='store_true', help="Run the app in debug mode.")
args = parser.parse_args()

if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port=int("5000"), debug=args.debug)
