import { Modal } from "../../context/Modal"
import { useState } from 'react'
import Video from "./video"

function VideoModal() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div className='left-side-options pointer' onClick={() => setShowModal(true)}>
                <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png'} alt='Image'></img>
                <div className='feed-left-option-label'>Watch</div>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <Video />
            </Modal>
            )}
        </>
    )
}

export default VideoModal
