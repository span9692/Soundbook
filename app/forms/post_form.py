from flask_wtf import FlaskForm
from wtforms import FileField, StringField, IntegerField
# from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    post_content = StringField('post_content')
    picture = FileField('picture')
    owner_id = IntegerField('owner_id')
    profile_id = IntegerField('profile_id')
