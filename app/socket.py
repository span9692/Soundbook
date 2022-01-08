from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://sound-book.herokuapp.com',
        'https://sound-book.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle add friend
def handle_add_post(data):
    socketio.emit("add_post", data, broadcast=True)

def handle_delete_post(data):
    socketio.emit("delete_post", data, broadcast=True)

def handle_edit_post(data):
    socketio.emit("edit_post", data, broadcast=True)

def handle_add_comment(data):
    socketio.emit("add_comment", data, broadcast=True)

def handle_delete_comment(data):
    socketio.emit("delete_comment", data, broadcast=True)

def handle_edit_comment(data):
    socketio.emit("edit_comment", data, broadcast=True)

def handle_add_like_post(data):
    socketio.emit("add_like_post", data, broadcast=True)

def handle_delete_like_post(data):
    socketio.emit("delete_like_post", data, broadcast=True)

def handle_add_like_comment(data):
    socketio.emit("add_like_comment", data, broadcast=True)

def handle_delete_like_comment(data):
    socketio.emit("delete_like_comment", data, broadcast=True)

def handle_confirm_friend(data):
    socketio.emit("confirm_friend", data, broadcast=True)
