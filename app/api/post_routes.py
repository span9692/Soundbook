from flask import Blueprint, request, jsonify
from app.models.db import db
from app.models import Post
from sqlalchemy.sql import func
from app.socket import handle_add_post
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def allPosts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:id>')
def posts(id):
    posts = Post.query.filter(Post.profile_id == id)
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/new', methods=['POST'])
def new_posts():
    data = request.get_json()
    newPost = Post(
        post_content=data['post_content'],
        owner_id=data['owner_id'],
        profile_id=data['profile_id']
    )
    db.session.add(newPost)
    db.session.commit()
    print('\n \n \n in the route', newPost.to_dict(),'\n \n')
    # handle_add_post(newPost.to_dict())
    return newPost.to_dict()

@post_routes.route('/<int:id>', methods=["DELETE"])
def delete_posts(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': f'Post {id} has been deleted'}), 200

@post_routes.route('/edit', methods=['PUT'])
def edit_post():
    data = request.get_json()
    post = Post.query.get(data['postId'])
    post.post_content = data['editValue']
    post.updatedAt = func.now()
    db.session.commit()
    return post.to_dict()
