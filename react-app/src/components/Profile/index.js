import { useSelector } from 'react-redux'
import './profile.css'

function Profile() {
    const user = useSelector(state => state.session.user)
    console.log(user)

    return (
        <>
            <div className='profile-images'>
                {/* <img className='cover-photo' src='https://res.cloudinary.com/photofinder/image/upload/v1639594414/fb%20cover%20photo/NWA_ws2bjn.jpg'></img> */}
                <img className='cover-photo' src={user.cover_photo}></img>
            </div>
        </>
    )
}

export default Profile
