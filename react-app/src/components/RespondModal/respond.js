import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cancelRequest, confirmRequest } from '../../store/friend_list'
import './respond.css'

function Respond({loggedUser, profile_owner}) {
    const dispatch = useDispatch()

    const acceptRequest = (adderId) => {
        dispatch(confirmRequest(adderId, loggedUser.id))
    }

    const deleteRequest = (adderId) => {
        dispatch(cancelRequest(adderId, loggedUser.id))
    }

    return (
        <>
            <div className='individual-friend-request-modal'>
                <Link className='link-to-friend' to={`/users/${profile_owner.id}`}>
                    <img className='post-image-wall dim' src={profile_owner?.profile_pic}></img>
                </Link>
                <div className='friend-request-minus-portrait'>
                    <div>
                        <Link className='link-to-friend' to={`/users/${profile_owner.id}`}>
                            <span className='requester-name'>{profile_owner?.alias ? profile_owner?.alias : profile_owner?.first_name+' '+profile_owner?.last_name }</span> <span className='sent-you-a-friend-request'>sent you a friend request.</span>
                        </Link>
                    </div>
                    <div className='friend-request-buttons'>
                        <div className='confirm-friend-request-btn pointer' onClick={() => acceptRequest(profile_owner.id)}>Confirm</div>
                        <div className='delete-friend-request-btn pointer' onClick={() => deleteRequest(profile_owner.id)}>Delete</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Respond
