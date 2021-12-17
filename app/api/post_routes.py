from flask import Blueprint
from app.models.db import db
from app.models import Post, User, Comment

post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:id>')
def posts(id):
    # posts = Post.query.options(joinload(User.id)).filter(Post.profile_id == id)
    # posts = db.session.query(Post, User.first_name).join(User, Post.owner_id == User.id).filter(Post.profile_id == id)
    # posts = db.session.query(Post, User.first_name).join(User, Post.owner_id == User.id).filter(Post.profile_id == id)
    # posts = db.session.query(Post, User).join(User, Post.owner_id == User.id).filter(Post.profile_id == id)

    # posts = Post.query.filter(Post.profile_id == id).to_dict()
    # print('mmmmmmmmmmmmmmmmmmmmmmmmmmm posts mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', posts)
    # users = User.query.filter(User.id == id)
    # comments = Comment.query.filter(Comment.user_id == User.id).filter(Comment.post_id == Post.id)

    # posts['users']  = [user.to_dict() for user in users]
    # posts['comments'] = [comment.to_dict() for comment in comments]
    # return posts
    # print('mmmmmmmmmmmmmm', posts, 'mmmmmmmmmmmmmmmmmmmmmmmm')
    posts = Post.query.filter(Post.profile_id == id)
    users = User.query.filter(User.id == id)
    comments = Comment.query.filter(Comment.user_id == User.id).filter(Comment.post_id == Post.id)

    res = {'posts': [post.to_dict() for post in posts]}
    res['users'] = [user.to_dict() for user in users]
    res['comments'] = [comment.to_dict() for comment in comments]

    return res
    # posts = Post.query.filter(Post.profile_id == id)
    # return {'posts': [post.to_dict() for post in posts]}
