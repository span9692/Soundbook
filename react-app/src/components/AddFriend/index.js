import { addFriend } from "../../store/friend_list"
import { useDispatch } from 'react-redux'

function AddFriend({loggedUser, profile_owner}) {
    const dispatch = useDispatch()
    const newFriendRequest = () => {
        dispatch(addFriend(loggedUser, profile_owner))
    }

    return (
        <>
            <button className='profile-nav-links edit-profileBtn' onClick={()=>newFriendRequest()}><i class="fas fa-user-plus"></i>&nbsp; Add Friend</button>
        </>
    )
}

export default AddFriend
