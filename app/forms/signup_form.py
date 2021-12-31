from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired(), Length(min=3, max=20, message='First name must be between 3 and 20 characters.')])
    lastName = StringField('lastName', validators=[DataRequired(), Length(min=3, max=20, message='Last name must be between 3 and 20 characters.')])
    password = StringField('password', validators=[DataRequired(), Length(min=8, max=20, message='Password must be between 8 and 20 characters.')])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
