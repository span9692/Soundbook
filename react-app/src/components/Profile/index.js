import { useSelector } from 'react-redux'
import './profile.css'

function Profile() {
    const user = useSelector(state => state.session.user)
    console.log(user)

    return (
        <>
            <div className='profile-container'>
                <div className='profile-background-color'>
                    <div className='profile-images'>
                        <img className='cover-photo' src={user.cover_photo}></img>
                        <img className='profile-photo' src='https://res.cloudinary.com/photofinder/image/upload/v1639338101/kid%20friendly%20profile%20pics/HtwPZgej_400x400_itffcg.jpg'></img>
                        <div className='profile-content'>
                            {user.first_name} {user.last_name}
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
