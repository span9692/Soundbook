from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments
from .friend_list import seed_friend_list, undo_friend_list
from .likes import seed_likes, undo_likes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_posts()
    seed_photos()
    seed_comments()
    seed_friend_list()
    seed_likes()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_photos()
    undo_comments()
    undo_friend_list()
    undo_likes()
    # Add other undo functions here
