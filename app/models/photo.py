from .db import db
from sqlalchemy.sql import func

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    photo = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=False), default=func.now())

    users = db.relationship('User', back_populates='photos')
