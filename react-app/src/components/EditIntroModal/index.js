import { Modal } from "../../context/Modal"
import { useState } from 'react'
import IntroForm from "./IntroForm"

function EditIntroModal({loggedUser}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button className='profile-nav-links1 edit-profileBtn1' onClick={() => setShowModal(true)}><i class="fas fa-pencil-alt"></i>&nbsp; Edit Profile</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <IntroForm loggedUser={loggedUser}/>
            </Modal>
            )}
        </>
    )
}

export default EditIntroModal
