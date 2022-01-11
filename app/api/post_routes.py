from flask import Blueprint, request, jsonify
from app.models.db import db
from app.models import Post
from app.forms import PostForm
from sqlalchemy.sql import func
from app.socket import handle_add_post, handle_delete_post, handle_edit_post
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
    post = PostForm()
    post['csrf_token'].data = request.cookies['csrf_token']

    url = None

    if post["picture"].data:

        image = post.data["picture"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]

    if post.validate_on_submit():
        newPost = Post(
            post_content=post['post_content'].data,
            owner_id=post['owner_id'].data,
            profile_id=post['profile_id'].data,
            picture=url
        )
        # print('\n \n', newPost, '\n \n')
        db.session.add(newPost)
        db.session.commit()
        handle_add_post(newPost.to_dict())
        return newPost.to_dict()

@post_routes.route('/<int:id>', methods=["DELETE"])
def delete_posts(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    handle_delete_post(id)
    return jsonify({'message': f'Post {id} has been deleted'}), 200

@post_routes.route('/edit', methods=['PUT'])
def edit_post():
    data = request.get_json()
    post = Post.query.get(data['postId'])
    post.post_content = data['editValue']
    post.updatedAt = func.now()
    db.session.commit()
    handle_edit_post(post.to_dict())
    return post.to_dict()
