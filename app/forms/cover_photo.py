from flask_wtf import FlaskForm
from wtforms import FileField
from wtforms.validators import DataRequired

class CoverForm(FlaskForm):
    cover_photo = FileField('cover_photo', validators=[DataRequired()])
