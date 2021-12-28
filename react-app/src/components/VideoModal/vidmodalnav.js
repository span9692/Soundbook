import { Modal } from "../../context/Modal"
import { useState } from 'react'
import Video from "./video"

function VideoModalNav() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div className='fontAwesomeness' onClick={() => setShowModal(true)}><i class="fas fa-video"></i></div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <Video />
            </Modal>
            )}
        </>
    )
}

export default VideoModalNav
