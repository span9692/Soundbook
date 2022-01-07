from .db import db
from sqlalchemy.sql import func
from datetime import timedelta

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    photo = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=False), default=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "photo": self.photo,
            "owner_id": self.owner_id,
            # "photographer": self.users.to_dict(),
            "createdAt": (self.createdAt - timedelta(hours=8)).strftime('%Y')
        }

    users = db.relationship('User', back_populates='photos')
