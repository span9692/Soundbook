from flask_wtf import FlaskForm
from wtforms import FileField
from wtforms.validators import DataRequired

class ProfileForm(FlaskForm):
    profile_pic = FileField('profile_pic', validators=[DataRequired()])
