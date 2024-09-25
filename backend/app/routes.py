# app/routes.py
from flask import Blueprint, jsonify
from .models import User
from . import db

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return "Welcome to the Flask MariaDB app!"

@main.route('/users')
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "username": user.username, "email": user.email} for user in users])
