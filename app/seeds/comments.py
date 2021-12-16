from app.models import db, Comment

def seed_comments():
    comment1 = Comment(comment_content='hi', user_id=2, post_id=1)

    db.session.add(comment1)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
