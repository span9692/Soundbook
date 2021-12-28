from app.models import db, Comment

def seed_comments():
    comment1 = Comment(comment_content='hi', user_id=3, post_id=1)
    comment2 = Comment(comment_content='who you?', user_id=2, post_id=1)
    comment3 = Comment(comment_content='i\'m a small artist, can u get me in?', user_id=3, post_id=1)
    comment4 = Comment(comment_content='no', user_id=2, post_id=1)
    comment5 = Comment(comment_content='hi again', user_id=3, post_id=2)
    comment6 = Comment(comment_content='hello?', user_id=3, post_id=2)
    comment7 = Comment(comment_content='please listen', user_id=3, post_id=2)
    comment8 = Comment(comment_content='ay what\'s good kanye', user_id=2, post_id=3)
    comment9 = Comment(comment_content='nuthin much,  you?', user_id=4, post_id=3)
    comment10 = Comment(comment_content='chillin', user_id=2, post_id=3)


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
