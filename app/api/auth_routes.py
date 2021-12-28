from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}

@auth_routes.route('/update/<int:userId>', methods=['PUT'])
def update_info(userId):
    user = User.query.get(userId)
    data = request.get_json()
    user.education = data['education']
    user.work = data['work']
    user.location = data['location']
    user.birthday = data['birthday']
    user.gender = data['gender']
    db.session.commit()
    return user.to_dict()

@auth_routes.route('/display/<int:userId>', methods=['PUT'])
def update_display(userId):
    user = User.query.get(userId)
    data = request.get_json()
    user.first_name = data['firstName']
    user.last_name = data['lastName']
    user.alias = data['alias']
    db.session.commit()
    return user.to_dict()

@auth_routes.route('/cover/<int:userId>', methods=['PUT'])
def update_cover(userId):
    user = User.query.get(userId)
    data = request.get_json()
    user.cover_photo = data['coverPhoto']
    db.session.commit()
    return user.to_dict()

@auth_routes.route('/profilephoto/<int:userId>', methods=['PUT'])
def update_profilephoto(userId):
    user = User.query.get(userId)
    data = request.get_json()
    print('qqqqqqqqqqqqqqqqqqqqqqq', data,'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
    user.profile_pic = data['ProfilePhoto']
    db.session.commit()
    return user.to_dict()

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    data = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('we in the signup route in the back')
        user = User(
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            email=form.data['email'],
            password=form.data['password'],
            birthday=data['birthday'],
            gender=data['gender']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
