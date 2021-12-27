import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCover } from '../../store/session'
import { updateCoverPic } from '../../store/user'
import './coverphoto.css'

function CoverPhoto({loggedUser, setShowModal}) {
    const dispatch = useDispatch()
    const [coverPhoto, setCoverPhoto] = useState(loggedUser.cover_photo)
    const userId = loggedUser.id

    const updateCoverPhoto = async(e) => {
        e.preventDefault()
        dispatch(updateCover({userId, coverPhoto}))
        dispatch(updateCoverPic({userId, coverPhoto}))
        setShowModal(false)
    }

    return (
        <>
            <form onSubmit={updateCoverPhoto} className='edit-intro-form'>
                <span className='edit-intro-title'>Edit Cover Photo</span>
                <hr style={{marginTop: 1+'rem', marginBottom: .5+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                <div className='email-field'>
                    <label className='edit-field-name alias-field'>Cover Photo URL</label>
                    <input
                    className='signup-field field-size signup-font alias-field'
                    name='coverPhoto'
                    placeholder='URL'
                    onChange={(e) => setCoverPhoto(e.target.value)}
                    value={coverPhoto}
                    ></input>
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
