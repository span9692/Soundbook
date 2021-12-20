from flask import Blueprint, request
from app.models.db import db
from app.models import Comment
from sqlalchemy.sql import func

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>')
def comments(id):
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/new', methods=['POST'])
def new_comment():
    data = request.get_json()
    newComment = Comment(
        comment_content=data['comment_content'],
        post_id=data['post_id'],
        user_id=data['user_id']
    )
    db.session.add(newComment)
    db.session.commit()
    return newComment.to_dict()