from flask import Blueprint, request, jsonify
from app.models.db import db
from app.models import Comment
from app.socket import handle_add_comment, handle_delete_comment, handle_edit_comment
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
    handle_add_comment(newComment.to_dict())
    return newComment.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    handle_delete_comment(id)
    return jsonify({'message': f'Comment {id} has been deleted'}), 200

@comment_routes.route('/edit', methods=['PUT'])
def edit_comment():
    data = request.get_json()
    comment = Comment.query.get(data['commentId'])
    comment.comment_content = data['editCommentValue']
    comment.updatedAt = func.now()
    db.session.commit()
    handle_edit_comment(comment.to_dict())
    return comment.to_dict()
