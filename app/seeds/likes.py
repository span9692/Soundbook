# from app.models import db, friend_list
# from sqlalchemy import insert

# def seed_friend_list():
#     db.session.execute(friend_list.insert().values(friendAdder_id=1, friendReceiver_id=2, confirmed=True))

#     db.session.commit()

# def undo_friend_list():
#     db.session.execute('TRUNCATE friend_list RESTART IDENTITY CASCADE;')
#     db.session.commit()
