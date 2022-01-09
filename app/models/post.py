from .db import db
from datetime import timedelta
# from app.models import User
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post_content = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    picture = db.Column(db.String(500), nullable=True)
    profile_id = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.DateTime(timezone=False), default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=False), default=func.now())

    users = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='posts', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='posts', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "post_content": self.post_content,
            "owner_id": self.owner_id,
            "profile_id": self.profile_id,
            "poster_info": self.users.to_dict(),
            "createdAt": (self.createdAt - timedelta(hours=8)).strftime('%b %d, %Y %I:%M %p'),
            "updatedAt": (self.updatedAt - timedelta(hours=8)).strftime('%b %d, %Y %I:%M %p')
        }
