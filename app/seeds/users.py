from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(first_name='Demo', last_name='User', email='demo@aa.io', password='password')
    Sean = User(first_name='Sean', last_name='Pan', email='span@gmail.com', password='password')
    Sharon = User(first_name='Sharon', last_name='Truong', email='struong@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(Sean)
    db.session.add(Sharon)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
