from app.models import db, Comment

def seed_comments():
    comment1 = Comment(comment_content='beep boop 🤖', user_id=6, post_id=2)
    comment2 = Comment(comment_content='yayy!! 🎉🎉', user_id=5, post_id=3)
    comment3 = Comment(comment_content='congrats my dude', user_id=8, post_id=3)
    comment4 = Comment(comment_content='nice', user_id=4, post_id=3)
    comment5 = Comment(comment_content='wow this is really amazing!', user_id=16, post_id=3)
    comment6 = Comment(comment_content='welcome!', user_id=17, post_id=4)
    comment7 = Comment(comment_content='this site\'s actually dope', user_id=2, post_id=5)
    comment8 = Comment(comment_content='sean pan, he\'s an up-and-coming pianist', user_id=3, post_id=6)
    comment9 = Comment(comment_content='he\'s got a YouTube channel, check it out', user_id=11, post_id=6)
    comment10 = Comment(comment_content='LISAAAAAAAA', user_id=18, post_id=8)
    comment11 = Comment(comment_content='Hi Lisa!', user_id=15, post_id=8)
    comment12 = Comment(comment_content='🔥🔥🔥', user_id=8, post_id=9)
    comment13 = Comment(comment_content='Hey how you doin?', user_id=2, post_id=10)
    comment14 = Comment(comment_content='You have a funny name 🤣', user_id=6, post_id=10)
    comment15 = Comment(comment_content='yeee', user_id=4, post_id=13)
    comment16 = Comment(comment_content='sure, my manager will contact you', user_id=5, post_id=18)
    comment17 = Comment(comment_content='awesome', user_id=9, post_id=18)
    comment18 = Comment(comment_content='Haha no worries!', user_id=10, post_id=20)
    comment19 = Comment(comment_content='it really is 🤩', user_id=15, post_id=17)
    comment20 = Comment(comment_content='Ay! Workin hard on my new album! Bouta bring some heat 🔥', user_id=8, post_id=21)
    comment21 = Comment(comment_content='awesome! looking forward to it', user_id=17, post_id=21)
    comment22 = Comment(comment_content='yeee I\'ll drop you the link when it\'s ready', user_id=8, post_id=21)
    comment23 = Comment(comment_content='bro just tell us', user_id=2, post_id=22)
    comment24 = Comment(comment_content='are you the real slim shady?', user_id=3, post_id=23)
    comment25 = Comment(comment_content='you already know', user_id=11, post_id=24)
    comment26 = Comment(comment_content='of course!! Jenny and I love you music too 🤩', user_id=6, post_id=26)
    comment27 = Comment(comment_content='IKR', user_id=15, post_id=27)
    # comment28 = Comment(comment_content='', user_id=, post_id=)
    # comment29 = Comment(comment_content='', user_id=, post_id=)
    # comment30 = Comment(comment_content='', user_id=, post_id=)



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
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.add(comment23)
    db.session.add(comment24)
    db.session.add(comment25)
    db.session.add(comment26)
    db.session.add(comment27)



    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
