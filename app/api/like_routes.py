from flask import Blueprint, request, jsonify
from app.models.db import db
from app.socket import handle_add_like_post, handle_delete_like_post
from app.models import Like

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def allLikes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}

@like_routes.route('/post', methods=['POST'])
def likePost():
    data = request.get_json()
    newLike = Like(
        user_id=data['userId'],
        post_id=data['postId']
    )
    db.session.add(newLike)
    db.session.commit()
    handle_add_like_post(newLike.to_dict())
    return newLike.to_dict()

@like_routes.route('/post/<int:postId>/<int:userId>', methods=['DELETE'])
def unlikePost(postId, userId):
    unlike = Like.query.filter(Like.user_id == userId).filter(Like.post_id == postId).all()[0]
    db.session.delete(unlike)
    db.session.commit()
    handle_delete_like_post({'postId':postId, 'userId':userId})
    return jsonify({'message': 'Like has been deleted'}), 200

@like_routes.route('/comment', methods=['POST'])
def likeComment():
    data = request.get_json()
    newLike = Like(
        user_id=data['userId'],
        comment_id=data['commentId']
    )

    db.session.add(newLike)
    db.session.commit()
    return newLike.to_dict()

@like_routes.route('/comment/<int:commentId>/<int:userId>', methods=['DELETE'])
def unlikeComment(commentId, userId):
    unlike = Like.query.filter(Like.user_id == userId).filter(Like.comment_id == commentId).all()[0]
    db.session.delete(unlike)
    db.session.commit()
    return jsonify({'message': 'Like has been deleted'}), 200
