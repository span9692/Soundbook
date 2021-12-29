from app.models import db, Comment

def seed_comments():
    comment1 = Comment(comment_content='hi', user_id=1, post_id=3)
    comment2 = Comment(comment_content='who you?', user_id=2, post_id=3)
    comment3 = Comment(comment_content='i\'m a small artist, can u get me in?', user_id=1, post_id=3)
    comment4 = Comment(comment_content='no', user_id=2, post_id=3)
    comment5 = Comment(comment_content='hi again', user_id=1, post_id=4)
    comment6 = Comment(comment_content='hello?', user_id=1, post_id=4)
    comment7 = Comment(comment_content='please listen', user_id=1, post_id=4)
    comment8 = Comment(comment_content='ay what\'s good kanye', user_id=2, post_id=5)
    comment9 = Comment(comment_content='nuthin much,  you?', user_id=4, post_id=5)
    comment10 = Comment(comment_content='chillin', user_id=2, post_id=5)
    comment11 = Comment(comment_content='yayy!!', user_id=5, post_id=2)
    comment12 = Comment(comment_content='congrats my dude', user_id=8, post_id=2)
    comment13 = Comment(comment_content='nice', user_id=4, post_id=2)
    comment14 = Comment(comment_content='good work', user_id=11, post_id=1)



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
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)


    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
