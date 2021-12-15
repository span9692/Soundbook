import { useSelector } from 'react-redux'
import './profile.css'

function Profile() {
    const user = useSelector(state => state.session.user)
    console.log(user)

    return (
        <>
            <div>
                <div className='profile-images'>
                    <img className='cover-photo' src={user.cover_photo}></img>
                    <div>
                        <img className='profile-photo' src='https://res.cloudinary.com/photofinder/image/upload/v1639338101/kid%20friendly%20profile%20pics/HtwPZgej_400x400_itffcg.jpg'></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
