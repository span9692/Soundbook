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
    print('\n \n in the socket', data, '\n \n \n \n \n \n \n \n')
    # data['createdAt'] = data['createdAt'].strftime(
    socketio.emit("add_post", data, broadcast=True)

# def handle_delete_post(data):
#     socketio.emit("delete_post", data, broadcast=True)

# def handle_edit_post(data):
#     socketio.emit("edit_post", data, broadcast=True)
