from flask import Blueprint
from app.models.db import db
from app.models import Like

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def allLikes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}