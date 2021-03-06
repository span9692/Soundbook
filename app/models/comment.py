from .db import db
from datetime import timedelta
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
    likes = db.relationship('Like', back_populates='comments', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "comment_content": self.comment_content,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "poster_info": self.users.to_dict(),
            "createdAt": (self.createdAt - timedelta(hours=8)).strftime('%b %d, %Y %I:%M %p'),
            "updatedAt": (self.updatedAt - timedelta(hours=8)).strftime('%b %d, %Y %I:%M %p')
        }
