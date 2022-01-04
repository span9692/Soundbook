import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfilePic } from '../../store/session'
import { updatePicProfile } from '../../store/user'
import './editprofilephoto.css'

function ProfilePhoto({loggedUser, setShowModal}) {
    const dispatch = useDispatch()
    const [imageFile, setImageFile] = useState('');
    const [savedImageFile, setSavedImageFile] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [savedImagePreview, setSavedImagePreview] = useState('');
    const userId = loggedUser.id

    const setImage = (e) => {
        let file = e.target.files[0];
        setImageFile(e.target.files[0]);

        if (file) {
            setSavedImageFile(file)
            file = URL.createObjectURL(file);
            setImagePreview(file);
            setSavedImagePreview(file)
        } else {
            setImageFile(savedImageFile);
            setImagePreview(savedImagePreview);
        }
    }

    const updateProfilePhoto = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('profile_pic', imageFile)
        dispatch(updateProfilePic(formData))
        dispatch(updatePicProfile(formData))
        setShowModal(false)

        // if(!/\.(jpe?g|png|gif|bmp)$/i.test(profilePhoto)){
        //     setError('Must be a valid image URL')
        // } else {
        //     dispatch(updateProfilePic(userId, profilePhoto))
        //     dispatch(updatePicProfile(userId, profilePhoto))
        //     setShowModal(false)
        // }
    }

    return (
        <>
            <form onSubmit={updateProfilePhoto} className='profile-form-photo'>
                <span className='edit-intro-title'>Edit Profile Photo</span>
                <hr style={{marginTop: 1+'rem', marginBottom: .5+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                <div className='email-field'>
                    {/* <label className='edit-field-name alias-field'>Profile Photo URL</label> */}
                    {/* {error.length > 0 ?
                    <div className='invalid-photo-url'>
                        {error}
                    </div>
                    : null
                    } */}
                    <div className='preview-upload'>
                        <img className='aws-image-size' src={imagePreview || loggedUser.profile_pic}></img>
                        <label htmlFor='aws' className='upload-btn pointer'>
                                <div className='upload-text'><i class="fas fa-plus"></i> Upload Photo</div>
                        </label>
                        <input
                            className='aws-form'
                            id='aws'
                            name='profilePhoto'
                            placeholder='URL'
                            type='file'
                            accept='.jpg, .jpeg, .png, .gif'
                            onChange={setImage}
                        ></input>
                    </div>
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
