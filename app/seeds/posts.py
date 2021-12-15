from app.models import db, Post

def seed_posts():
    post1 = Post(post_content='I love green eggs and ham', owner_id=1)
    post2 = Post(post_content='Thank you Sam I am', owner_id=1)
    post3 = Post(post_content='YOOOOOOOO WE HERE', owner_id=1)

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
