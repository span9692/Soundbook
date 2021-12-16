from app.models import db, Post

def seed_posts():
    post1 = Post(post_content='Bruh', owner_id=1, profile_id=1)
    post2 = Post(post_content='New album droppin sometime next month, best be ready for some heat', owner_id=1, profile_id=1)
    post3 = Post(post_content='this site is dope', owner_id=1, profile_id=1)
    post4 = Post(post_content='Yo wut up Cube?', owner_id=2, profile_id=1)

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
