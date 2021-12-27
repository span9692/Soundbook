import { Link } from 'react-router-dom'
import './friend.css'

function Friends({profileId, allFriends, allUsersValues}) {

    let profile_owner_friends = [];
    allFriends.forEach(friend => {
        if (friend.confirmed === true && friend.friendAdder_id === +profileId) {
            profile_owner_friends.push(friend.friendReceiver_id)
        }
        if (friend.confirmed === true && friend.friendReceiver_id === +profileId) {
            profile_owner_friends.push(friend.friendAdder_id)
        }
    })

    let currentProfileFriends = allUsersValues.filter(el => profile_owner_friends.includes(el.id))

    return (
        <>
            <div className='friends-container'>
                Friends
                <div className={currentProfileFriends.length % 3 === 0 ? 'friend-box' : 'friend-box1'}>
                    {currentProfileFriends.length > 0 ?
                    (currentProfileFriends.map(friend => (
                        <div className='indiv-friend-box'>
                            <Link to={`/users/${friend.id}`}>
                                <img className='square-portraits' src={friend.profile_pic}></img>
                            </Link>
                            <Link className='all-friends-link' to={`/users/${friend.id}`}>
                                <div className='friend-name'>{friend.alias ? friend.alias : friend.first_name+' '+friend.last_name }</div>
                            </Link>
                        </div>
                    )))
                    : null
                    }
                </div>
            </div>
        </>
    )
}

export default Friends