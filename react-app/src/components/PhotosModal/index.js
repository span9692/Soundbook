import { Modal } from "../../context/Modal"
import { useState } from 'react'
import AllPhotos from "./AllPhotos"

function PhotosModal({profile_photos}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div className='left-side-options pointer' onClick={() => setShowModal(true)}>
                <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/w-vdKCGzCy1.png'} alt='Image'></img>
                <div className='feed-left-option-label'>Photos</div>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <AllPhotos profile_photos={profile_photos}/>
            </Modal>
            )}
        </>
    )
}

export default PhotosModal
