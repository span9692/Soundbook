from .db import db


friend_list = db.Table(
    "friend_list",
    # db.Column('id', db.Integer, primary_key=True),
    db.Column('friendAdder_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friendReceiver_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('confirmed', db.Boolean, primary_key=False, default=False),
)
