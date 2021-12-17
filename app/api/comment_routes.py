from flask import Blueprint
from app.models import Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>')
def comments(id):
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}
