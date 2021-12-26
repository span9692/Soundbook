from flask import Blueprint, request, jsonify
from app.models.db import db
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
    return newLike.to_dict()

@like_routes.route('/post/<int:postId>/<int:userId>', methods=['DELETE'])
def unlikePost(postId, userId):
    unlike = Like.query.filter(Like.user_id == userId).filter(Like.post_id == postId).all()[0]
    print('mmmmmmmmmmmmmmmmmmmmm', unlike, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmm')
    db.session.delete(unlike)
    db.session.commit()
    return jsonify({'message': 'Like has been deleted'}), 200