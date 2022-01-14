import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewFriend, cancelRequest, confirmRequest, getFriends, removeRequest, yesRequest } from '../../store/friend_list'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import './friend.css'
let socket;

function Friends() {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const loggedUser = useSelector(state => state.session.user)
    const profileId = +userId
    const allUsers = useSelector(state => state.user)
    const allUsersValues = Object.values(allUsers)
    const allFriends = useSelector(state => Object.values(state.friend_list))

    const requester_id = [];
    allFriends.forEach(friend => {
        if (friend.confirmed === false && friend.friendReceiver_id === profileId) {
            requester_id.push(friend.friendAdder_id)
        }
    })
    const friend_request_list = allUsersValues.filter(el => requester_id.includes(el.id))

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

    let unknown = []
    allUsersValues.forEach(friend => {
        if (!(friend_request_list.includes(friend)) && !(currentProfileFriends.includes(friend))) {
            unknown.push(friend)
        }
    })

    for (let i = 0; i < unknown.length; i++) {
        if (unknown[i].id === profileId) {
            unknown.splice(i, 1)
            break;
        }
    }

    const shuffle = (arr) => {
        arr.sort(()=>Math.random()-0.5);
        return arr
    }

    unknown = shuffle(unknown)

    if (unknown.length > 3) {
        unknown = unknown.slice(0,3)
    }

    useEffect(() => {
        dispatch(getFriends(profileId))
    }, [])

    useEffect(()=> {
        socket = io()

        socket.on('confirm_friend', friend => {
            dispatch(yesRequest(friend))
        })

        socket.on('decline_friend', friend => {
            dispatch(removeRequest(friend))
        })

        socket.on('add_friend', friend => {
            dispatch(addNewFriend(friend))
        })

        return () => {
            socket.disconnect();
        }
    }, [])

    const acceptRequest = (adderId) => {
        dispatch(confirmRequest(adderId, profileId))
    }

    const deleteRequest = (adderId) => {
        dispatch(cancelRequest(adderId, profileId))
    }


    return (
        <>
            <div className='friends-container'>
                {friend_request_list.length > 0 && profileId === loggedUser.id ?
                <>
                    <span className='friend-text'>Friend Request <span className='photos-counter'>({friend_request_list.length})</span></span>
                    <div className='friend-box'>
                        {friend_request_list.map(friend => (
                            <div key={friend.id} className='indiv-friend-box'>
                                <Link to={`/users/${friend.id}`}>
                                    <img className='square-portraits dim' src={friend.profile_pic}></img>
                                </Link>
                                <div className='friend-page-buttons'>
                                    <Link className='all-friends-link' to={`/users/${friend.id}`}>
                                        <div className='friend-name'>{friend.alias ? friend.alias : friend.first_name+' '+friend.last_name }</div>
                                    </Link>
                                    <div className='friend-request1-buttons'>
                                        <div className='confirm-friend-request1-btn pointer' onClick={() => acceptRequest(friend.id)}>Confirm</div>
                                        <div className='delete-friend-request1-btn pointer' onClick={() => deleteRequest(friend.id)}>Delete</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{marginTop:'.5rem'}}></div>
                </>
                : null
                }

                <span className='friend-text'>Friends <span className='photos-counter'>({currentProfileFriends.length})</span></span>
                <div className='friend-box'>
                    {currentProfileFriends.length > 0 ?
                    (currentProfileFriends.map(friend => (
                        <div key={friend.id} className='indiv-friend-box'>
                            <Link to={`/users/${friend.id}`}>
                                <img className='square-portraits dim' src={friend.profile_pic}></img>
                            </Link>
                            <Link className='all-friends-link' to={`/users/${friend.id}`}>
                                <div className='friend-name'>{friend.alias ? friend.alias : friend.first_name+' '+friend.last_name }</div>
                            </Link>
                        </div>
                    )))
                    : null
                    }
                </div>
                {friend_request_list.length > 0 && profileId === loggedUser.id ?
                <>
                    <div style={{marginTop:'.5rem'}}></div>
                    <span className='friend-text'>People You May Know </span>
                    <div className='friend-box'>
                        {unknown.length > 0 ?
                        (unknown.map(friend => (
                            <div key={friend.id} className='indiv-friend-box'>
                                <Link to={`/users/${friend.id}`}>
                                    <img className='square-portraits dim' src={friend.profile_pic}></img>
                                </Link>
                                <Link className='all-friends-link' to={`/users/${friend.id}`}>
                                    <div className='friend-name'>{friend.alias ? friend.alias : friend.first_name+' '+friend.last_name }</div>
                                </Link>
                            </div>
                        )))
                        : null
                        }
                    </div>
                </>
                : null }
            </div>
        </>
    )
}

export default Friends
