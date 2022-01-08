from flask import Blueprint, request
from app.models import friend_list, db
from sqlalchemy import or_
from app.socket import handle_confirm_friend, handle_decline_friend, handle_add_friend

friend_list_routes = Blueprint('friend_list', __name__)

@friend_list_routes.route('/<int:id>')
def friend(id):
    friends = db.session.query(friend_list).filter(or_(friend_list.c.friendAdder_id == id, friend_list.c.friendReceiver_id == id)).all()
    return {'friends':[{'friendAdder_id':friend.friendAdder_id, 'friendReceiver_id':friend.friendReceiver_id, 'confirmed':friend.confirmed} for friend in friends]}

@friend_list_routes.route('/first', methods=['POST'])
def firstFriend():
    data = request.get_json()
    db.session.execute(friend_list.insert().values(confirmed=True, friendAdder_id=data['adderId'], friendReceiver_id=data['recieverId']))
    db.session.commit()
    return {'friends':{'confirmed':True, 'friendAdder_id':data['adderId'], 'friendReceiver_id':data['recieverId']}}

@friend_list_routes.route('/add', methods=['POST'])
def newFriend():
    data = request.get_json()
    db.session.execute(friend_list.insert().values(confirmed=False, friendAdder_id=data['adderId'], friendReceiver_id=data['recieverId']))
    db.session.commit()
    handle_add_friend({'friends':{'confirmed':False, 'friendAdder_id':data['adderId'], 'friendReceiver_id':data['recieverId']}})
    return {'friends':{'confirmed':False, 'friendAdder_id':data['adderId'], 'friendReceiver_id':data['recieverId']}}

@friend_list_routes.route('/cancel', methods=['DELETE'])
def removeFriendRequest():
    data = request.get_json()
    db.session.execute(friend_list.delete().where(friend_list.c.friendAdder_id==data['adderId']).where(friend_list.c.friendReceiver_id==data['recieverId']))
    db.session.commit()
    handle_decline_friend({'friends':{'confirmed':False, 'friendAdder_id':data['adderId'], 'friendReceiver_id':data['recieverId']}})
    return {'friends':{'confirmed':False, 'friendAdder_id':data['adderId'], 'friendReceiver_id':data['recieverId']}}

@friend_list_routes.route('/accept', methods=['PUT'])
def acceptFriendRequest():
    data = request.get_json()
    db.session.execute(friend_list.update().where(friend_list.c.friendAdder_id==data['recieverId']).where(friend_list.c.friendReceiver_id==data['adderId']).values(confirmed=True))
    db.session.commit()
    handle_confirm_friend({'friends':{'confirmed':True, 'friendAdder_id':data['adderId'], 'friendReceiver_id':data['recieverId']}})
    return {'friends':{'confirmed':True, 'friendAdder_id':data['adderId'], 'friendReceiver_id':data['recieverId']}}

# users = User.query.filter(or_(User.first_name.ilike(f'%{data}%'), User.last_name.ilike(f'%{data}%')))
