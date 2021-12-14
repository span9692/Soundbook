from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    post_content = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.String(255), nullable=False)
    updatedAt = db.Column(db.String(255), nullable=False)

    users = db.relationship('User', back_populates='posts', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='posts')
