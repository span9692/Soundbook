import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../store/user'
import './profile.css'
import Posts from '../Posts/post'
import { getPhotos } from '../../store/photo'
import { getPosts } from '../../store/post'
import { getComments } from '../../store/comment'
import { getFriends } from '../../store/friend_list'

function Profile() {
    const dispatch = useDispatch()
    const { userId } = useParams()
    // const [urlId, setUrlId] = useState(userId)
    // setUrlId(userId)
    const loggedUser = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.user)
    const allUsersValues = Object.values(allUsers)
    const profile_photos = useSelector(state => Object.values(state.photo))
    const profile_owner = allUsersValues.filter(user => user.id === +userId)[0]
    const allPosts = useSelector(state => Object.values(state.post)).filter(el => el.profile_id === +userId)
    const allComments = useSelector(state => Object.values(state.comment))
    const allFriends = useSelector(state => Object.values(state.friend_list))
    // console.log('allPosts', allPosts)
    // let profile_owner_friends = [];
    // allFriends.forEach(friend => {
    //     if (friend.confirmed === true && friend.friendAdder_id === +userId) {
    //         profile_owner_friends.push(friend.friendReceiver_id)
    //     }
    //     if (friend.confirmed === true && friend.friendReceiver_id === +userId) {
    //         profile_owner_friends.push(friend.friendAdder_id)
    //     }
    // })
    // console.log('profile_owner_friends', profile_owner_friends)
    // console.log('allFriends', allFriends)

    useEffect(()=> {
        dispatch(getUsers())
        dispatch(getPhotos(+userId))
        dispatch(getPosts(+userId))
        dispatch(getComments(+userId))
        dispatch(getFriends(+userId))
    }, [dispatch])

    return (
        <>
            <div className='profile-container'>
                <div className='profile-background-color'>
                    <div className='profile-images'>
                        <img className='cover-photo' src={profile_owner?.cover_photo}></img>
                        <img className='profile-photo' src={profile_owner?.profile_pic}></img>
                        <div className='profile-content'>
                            {profile_owner?.first_name} {profile_owner?.last_name}
                        </div>
                    </div>
                    {/* hr styling style={{marginTop:  1+'rem', marginBottom: 1+'rem'}}  */}
                    <hr style={{marginLeft:  19.4+'vw'}} size='1' width='63%' color='#dddfe2'></hr>
                    <div className='profile-nav'>
                        <div className='nav-links'>
                            <div className='profile-nav-links profile-text'>Posts</div>
                            <div className='profile-nav-links profile-text'>About</div>
                            <div className='profile-nav-links profile-text'>Friends</div>
                            <div className='profile-nav-links profile-text'>Photos</div>
                        </div>
                        <div className='edit-profile-btn'>
                            <button className='profile-nav-links edit-profileBtn'><i class="fas fa-pencil-alt"></i>&nbsp; Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-bottom-half'>
                <div className='sideColumn'>

                </div >
                <div className='mainColumn'>
                    <Posts profileId={userId} loggedUser={loggedUser} profile_owner={profile_owner} profile_photos={profile_photos} allPosts={allPosts} allComments={allComments} allFriends={allFriends} allUsersValues={allUsersValues}/>
                </div>
                <div className='sideColumn'>

                </div>
            </div>
        </>
    )
}

export default Profile
