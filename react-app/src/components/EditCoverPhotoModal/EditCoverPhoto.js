import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCover } from '../../store/session'
import { updateCoverPic } from '../../store/user'
import './coverphoto.css'

function CoverPhoto({loggedUser, setShowModal}) {
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

    const updateCoverPhoto = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('userId', userId)
        formData.append('cover_photo', imageFile)
        dispatch(updateCover(formData))
        dispatch(updateCoverPic(formData))
        setShowModal(false)

        // if(!/\.(jpe?g|png|gif|bmp)$/i.test(coverPhoto)){
        //     setError('Must be a valid image URL')
        // } else {
        //     dispatch(updateCover({userId, coverPhoto}))
        //     dispatch(updateCoverPic({userId, coverPhoto}))
        //     setShowModal(false)
        // }
    }

    return (
        <>
            <form onSubmit={updateCoverPhoto} className='edit-intro-form'>
                <span className='edit-intro-title'>Edit Cover Photo</span>
                <hr style={{marginTop: 1+'rem', marginBottom: .5+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                <div className='email-field'>
                    <div className='preview-upload'>
                        <img className='aws-image-size' src={imagePreview || loggedUser.cover_photo}></img>
                        <label htmlFor='aws' className='upload-btn pointer'>
                            <div className='upload-text'><i class="fas fa-plus"></i> Upload Photo</div>
                        </label>
                        <input
                        className='aws-form'
                        id='aws'
                        name='coverPhoto'
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

export default CoverPhoto
