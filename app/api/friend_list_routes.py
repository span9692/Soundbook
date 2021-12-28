from flask import Blueprint, request
from app.models import friend_list, db
from sqlalchemy import or_

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

# users = User.query.filter(or_(User.first_name.ilike(f'%{data}%'), User.last_name.ilike(f'%{data}%')))
