import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfilePic } from '../../store/session'
import './editprofilephoto.css'

function ProfilePhoto({loggedUser, setShowModal}) {
    const dispatch = useDispatch()
    const [profilePhoto, setProfilePhoto] = useState(loggedUser.profile_pic)
    const userId = loggedUser.id

    const updateProfilePhoto = async(e) => {
        console.log('profilePhoto before thunk', profilePhoto)
        e.preventDefault()
        dispatch(updateProfilePic({userId, profilePhoto}))
        setShowModal(false)
    }

    return (
        <>
            <form onSubmit={updateProfilePhoto} className='edit-intro-form'>
                <span className='edit-intro-title'>Edit Profile Photo</span>
                <hr style={{marginTop: 1+'rem', marginBottom: .5+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                <div className='email-field'>
                    <label className='edit-field-name alias-field'>Profile Photo URL</label>
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
