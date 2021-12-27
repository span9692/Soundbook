import { Modal } from "../../context/Modal"
import { useState } from 'react'
import CoverPhoto from "./EditCoverPhoto"

function EditCoverPhotoModal({loggedUser}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button className='profile-nav-links edit-profileBtn' onClick={() => setShowModal(true)}><i class="fas fa-camera"></i>&nbsp; Edit Cover Photo</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <CoverPhoto loggedUser={loggedUser} setShowModal={setShowModal}/>
            </Modal>
            )}
        </>
    )
}

export default EditCoverPhotoModal
