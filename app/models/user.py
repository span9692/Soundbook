from .db import db
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import timedelta
from .friend_list import friend_list


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    alias = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255), nullable=False, default='https://media.discordapp.net/attachments/917541871457275925/918846475897798727/default-user.jpeg')
    cover_photo = db.Column(db.String(255), nullable=False, default='https://res.cloudinary.com/photofinder/image/upload/v1639506962/orionthemes-placeholder-image_twhbxf.jpg')
    hashed_password = db.Column(db.String(255), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(25), nullable=False)
    bio = db.Column(db.String(255), nullable=True)
    education = db.Column(db.String(50), nullable=True)
    work = db.Column(db.String(50), nullable=True)
    location = db.Column(db.String(50), nullable=True)
    createdAt = db.Column(db.DateTime(timezone=False), default=func.now())




    friend = db.relationship('User', secondary=friend_list, secondaryjoin=(friend_list.c.friendAdder_id == id), primaryjoin=(friend_list.c.friendReceiver_id == id), backref=db.backref('friend_list'))
    posts = db.relationship('Post', back_populates='users', cascade='all, delete-orphan')
    photos = db.relationship('Photo', back_populates='users', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='users', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='users', cascade='all, delete-orphan')

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
            "photos": [photo.to_dict() for photo in self.photos],
            'first_name': self.first_name,
            'last_name': self.last_name,
            'alias': self.alias,
            'birthday': self.birthday.strftime('%b %d, %Y'),
            'education': self.education,
            'bio': self.bio,
            'gender': self.gender,
            'work': self.work,
            'location': self.location,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'cover_photo': self.cover_photo,
            'createdAt': (self.createdAt - timedelta(hours=8)).strftime('%Y')
        }

    def to_dictionary(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'alias': self.alias,
            'last_name': self.last_name,
            'profile_pic': self.profile_pic,
        }
