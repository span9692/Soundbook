from .db import db
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment_content = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=func.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=func.now())

    posts = db.relationship('Post', back_populates='comments')
    users = db.relationship('User', back_populates='comments')
