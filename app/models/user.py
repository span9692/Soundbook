from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), nullable=False, default='https://media.discordapp.net/attachments/917541871457275925/918846475897798727/default-user.jpeg')
    cover_photo = db.Column(db.String(255), nullable=False, default='https://res.cloudinary.com/photofinder/image/upload/v1639506962/orionthemes-placeholder-image_twhbxf.jpg')
    hashed_password = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    posts = db.relationship('Post', back_populates='users', cascade='all, delete-orphan')
    photos = db.relationship('Photo', back_populates='users', cascade='all, delete-orphan')
