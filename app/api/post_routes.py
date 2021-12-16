from flask import Blueprint
from app.models.db import db
from app.models import Post, User

post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:id>')
def posts(id):
    # posts = Post.query.options(joinload(User.id)).filter(Post.profile_id == id)
    # posts = db.session.query(Post, User).filter(Post.owner_id == User.id).filter(Post.profile_id == id)
    posts = Post.query.filter(Post.profile_id == id)
    return {'posts': [post.to_dict() for post in posts]}
