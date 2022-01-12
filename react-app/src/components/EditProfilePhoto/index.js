import { Modal } from "../../context/Modal"
import { useState } from 'react'
import ProfilePhoto from "./EditProfilePhoto"


function EditProfilePhotoModal({loggedUser}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button className='profile-btn-edit-size profile-nav-links edit-profilePicBtn' onClick={() => setShowModal(true)}><i class="fas fa-camera"></i></button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <ProfilePhoto loggedUser={loggedUser} setShowModal={setShowModal}/>
            </Modal>
            )}
        </>
    )
}

export default EditProfilePhotoModal
