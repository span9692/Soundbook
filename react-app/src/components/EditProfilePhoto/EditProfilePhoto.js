import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfilePic } from '../../store/session'
import { updatePicProfile } from '../../store/user'
import './editprofilephoto.css'

function ProfilePhoto({loggedUser, setShowModal}) {
    const dispatch = useDispatch()
    const [profilePhoto, setProfilePhoto] = useState(loggedUser.profile_pic)
    const [error, setError] = useState('')
    const userId = loggedUser.id

    const updateProfilePhoto = async(e) => {
        e.preventDefault()

        if(!/\.(jpe?g|png|gif|bmp)$/i.test(profilePhoto)){
            setError('Must be a valid image URL')
        } else {
            dispatch(updateProfilePic(userId, profilePhoto))
            dispatch(updatePicProfile(userId, profilePhoto))
            setShowModal(false)
        }
    }

    return (
        <>
            <form onSubmit={updateProfilePhoto} className='edit-intro-form'>
                <span className='edit-intro-title'>Edit Profile Photo</span>
                <hr style={{marginTop: 1+'rem', marginBottom: .5+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                <div className='email-field'>
                    <label className='edit-field-name alias-field'>Profile Photo URL</label>
                    {error.length > 0 ?
                    <div className='invalid-photo-url'>
                        {error}
                    </div>
                    : null
                    }
                    <textarea
                    className='signup-field field-size signup-font1 alias-field'
                    name='profilePhoto'
                    placeholder='URL'
                    onChange={(e) => setProfilePhoto(e.target.value)}
                    value={profilePhoto}
                    ></textarea>
                </div>
                <div className='save-or-cancel'>
                    <div className='edit-info-btns1'>
                        <button type='submit' className='editBtns1 pointer'>Save</button>
                    </div>
                    <div className='edit-info-btns2'>
                        <button type='button' onClick={()=>setShowModal(false)} className='editBtns2 pointer'>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProfilePhoto
