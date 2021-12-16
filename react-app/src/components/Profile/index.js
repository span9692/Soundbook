import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../store/user'
import './profile.css'

function Profile() {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const allUsers = useSelector(state => Object.values(state.user))
    const profile_owner = allUsers.filter(user => user.id === +userId)[0]

    useEffect(()=> {
        dispatch(getUsers())
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
                    <hr style={{marginTop:  1+'rem', marginBottom: 1+'rem'}} size='1' width='60%' color='#dddfe2'></hr>
                    <div className='profile-nav'>
                        <div className='nav-links'>
                            <div className='profile-nav-links'>Posts</div><div className='profile-nav-links'>About</div><div className='profile-nav-links'>Friends</div><div className='profile-nav-links'>Photos</div>
                        </div>
                        <div className='edit-profile-btn'>
                            <div>Edit Profile</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
