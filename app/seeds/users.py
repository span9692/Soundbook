from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(first_name='Demo', last_name='User', email='demo@aa.io', password='password', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639338101/kid%20friendly%20profile%20pics/HtwPZgej_400x400_itffcg.jpg', cover_photo='https://res.cloudinary.com/photofinder/image/upload/v1639594414/fb%20cover%20photo/NWA_ws2bjn.jpg')
    Sean = User(first_name='Sean', last_name='Pan', email='span@gmail.com', password='password')
    Kanye = User(first_name='Kanye', last_name='West', email='kwest@gmail.com', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(Sean)
    db.session.add(Kanye)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
