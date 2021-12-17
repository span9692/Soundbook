from flask import Blueprint, request, jsonify
from app.models.db import db
from app.models import Post, User, Comment

post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:id>')
def posts(id):
    # posts = Post.query.options(joinload(User.id)).filter(Post.profile_id == id)
    # posts = db.session.query(Post, User.first_name).join(User, Post.owner_id == User.id).filter(Post.profile_id == id)
    # posts = db.session.query(Post, User.first_name).join(User, Post.owner_id == User.id).filter(Post.profile_id == id)
    # posts = db.session.query(Post, User).join(User, Post.owner_id == User.id).filter(Post.profile_id == id).all()

    # posts = Post.query.filter(Post.profile_id == id).all()
    # print('mmmmmmmmmmmmmmmmmmmmmmmmmmm posts mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', posts)
    # users = User.query.filter(User.id == id)
    # comments = Comment.query.filter(Comment.user_id == User.id).filter(Comment.post_id == Post.id)

    # posts['users']  = [user.to_dict() for user in users]
    # posts['comments'] = [comment.to_dict() for comment in comments]
    # return posts
    # print('mmmmmmmmmmmmmm', posts, 'mmmmmmmmmmmmmmmmmmmmmmmm')

    # posts = Post.query.filter(Post.profile_id == id)
    # comments = Comment.query.filter(Comment.user_id == User.id).filter(Comment.post_id == Post.id)
    # # users = User.query.filter(User.id == id)
    # res = {'posts': [post.to_dict() for post in posts]}
    # res['comments'] = [comment.to_dict() for comment in comments]
    # # res['users'] = [user.to_dict() for user in users]
    # return res

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
    print('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', data, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
    return {"asdf":"asdf"}
