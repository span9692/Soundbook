from app.models import db, User
import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(first_name='Demo', last_name='User', email='demo@aa.io', password='password', cover_photo='https://res.cloudinary.com/photofinder/image/upload/v1639647559/ice%20cube%20nwa/LwoaE.0.0_uzqoe9.jpg', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1639647173/ice%20cube%20nwa/image_ok9xkp.jpg', birthday=datetime.date(1992, 9, 6), gender='Male')
    Dre = User(first_name='Andre', last_name='Young', email='andrey@gmail.com', password='password', cover_photo='https://res.cloudinary.com/photofinder/image/upload/v1640124937/dr%20dre%20nwa/beats_e2abep.jpg', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1640124937/dr%20dre%20nwa/profilepic_dvybnf.jpg', birthday=datetime.date(1965, 2, 18), gender='Male')
    Kanye = User(first_name='Kanye', last_name='West', email='kwest@gmail.com', password='password', birthday=datetime.date(1992, 9, 6), gender='Male')
    Ariana = User(first_name='Ariana', last_name='Grande', email='agrande@gmail.com', password='password', cover_photo='https://res.cloudinary.com/photofinder/image/upload/v1640126351/ariana%20grande/image_ex43rp.jpg', profile_pic='https://res.cloudinary.com/photofinder/image/upload/v1640126349/ariana%20grande/Ariana_Grande_at_the_2020_Grammy_Awards_yf1j2y.jpg', birthday=datetime.date(1993, 6, 26), gender='Female')
    # Kanye = User(first_name='Kanye', last_name='West', email='kwest@gmail.com', password='password', birthday=datetime.date(1992, 9, 6), gender='Male')
    # Kanye = User(first_name='Kanye', last_name='West', email='kwest@gmail.com', password='password', birthday=datetime.date(1992, 9, 6), gender='Male')
    # Kanye = User(first_name='Kanye', last_name='West', email='kwest@gmail.com', password='password', birthday=datetime.date(1992, 9, 6), gender='Male')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(Dre)
    db.session.add(Kanye)
    db.session.add(Ariana)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
