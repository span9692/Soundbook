from app.models import db, Comment

def seed_comments():
    comment1 = Comment(comment_content='beep boop 🤖', user_id=6, post_id=2)
    comment2 = Comment(comment_content='yayy!! 🎉🎉', user_id=5, post_id=3)
    comment3 = Comment(comment_content='congrats my dude', user_id=8, post_id=3)
    comment4 = Comment(comment_content='nice', user_id=4, post_id=3)
    comment5 = Comment(comment_content='wow this is really amazing!', user_id=16, post_id=3)
    comment6 = Comment(comment_content='welcome!', user_id=17, post_id=4)
    comment7 = Comment(comment_content='this site\'s actually dope', user_id=2, post_id=5)
    comment8 = Comment(comment_content='Sean Pan, he\'s an up-and-coming pianist', user_id=3, post_id=6)
    comment9 = Comment(comment_content='He\'s got a YouTube channel, check it out', user_id=11, post_id=6)
    comment10 = Comment(comment_content='LISAAAAAAAA', user_id=18, post_id=8)
    comment11 = Comment(comment_content='Hi Lisa!', user_id=15, post_id=8)
    comment12 = Comment(comment_content='🔥🔥🔥', user_id=8, post_id=9)
    comment13 = Comment(comment_content='Hey how you doin?', user_id=2, post_id=10)
    comment14 = Comment(comment_content='You have a funny name 🤣', user_id=6, post_id=10)
    comment15 = Comment(comment_content='', user_id=, post_id=)
    comment16 = Comment(comment_content='', user_id=, post_id=)
    comment17 = Comment(comment_content='', user_id=, post_id=)
    comment18 = Comment(comment_content='', user_id=, post_id=)
    comment19 = Comment(comment_content='', user_id=, post_id=)
    comment20 = Comment(comment_content='', user_id=, post_id=)



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
