from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
from sqlalchemy import or_

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    print('data', data, 'mmmmmmmmmmmmmmmmmmmmmmmmm')
    users = User.query.filter(or_(User.first_name.ilike(f'%{data}%'), User.last_name.ilike(f'%{data}%')))
    return {'users': [user.to_dictionary() for user in users]}