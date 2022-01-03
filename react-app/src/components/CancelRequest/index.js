import { cancelRequest } from "../../store/friend_list"
import { useDispatch } from 'react-redux'

function CancelRequest({loggedUser, profile_owner}) {
    const dispatch = useDispatch()
    const cancelFriendRequest = () => {
        dispatch(cancelRequest(loggedUser, profile_owner))
    }

    return (
        <>
            <button className='profile-nav-links edit-profileBtn' onClick={()=>cancelFriendRequest()}><i class="fas fa-ban"></i>&nbsp; Cancel Request</button>
        </>
    )
}

export default CancelRequest
