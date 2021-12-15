from .db import db
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post_content = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=False), default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=False), default=func.now())

    users = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='posts', cascade='all, delete-orphan')
