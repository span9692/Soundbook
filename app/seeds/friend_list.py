from app.models import db, friend_list
from sqlalchemy import insert

def seed_friend_list():
    db.session.execute(friend_list.insert().values(friendAdder_id=11, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=14, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=13, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=2, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=3, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=4, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=5, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=6, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=7, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=8, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=9, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=10, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=12, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=15, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=16, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=17, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=18, friendReceiver_id=1, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=2, friendReceiver_id=3, confirmed=True))
    db.session.execute(friend_list.insert().values(friendAdder_id=5, friendReceiver_id=2, confirmed=False))
    db.session.execute(friend_list.insert().values(friendAdder_id=6, friendReceiver_id=2, confirmed=False))
    db.session.execute(friend_list.insert().values(friendAdder_id=7, friendReceiver_id=2, confirmed=False))
    db.session.execute(friend_list.insert().values(friendAdder_id=8, friendReceiver_id=2, confirmed=False))
    db.session.execute(friend_list.insert().values(friendAdder_id=9, friendReceiver_id=2, confirmed=False))
    db.session.execute(friend_list.insert().values(friendAdder_id=10, friendReceiver_id=2, confirmed=False))
    db.session.execute(friend_list.insert().values(friendAdder_id=4, friendReceiver_id=2, confirmed=False))
    db.session.execute(friend_list.insert().values(friendAdder_id=3, friendReceiver_id=11, confirmed=True))

    db.session.commit()

def undo_friend_list():
    db.session.execute('TRUNCATE friend_list RESTART IDENTITY CASCADE;')
    db.session.commit()
