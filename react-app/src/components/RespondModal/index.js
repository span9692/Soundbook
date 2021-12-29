import { Modal } from "../../context/Modal"
import { useState } from 'react'
import Respond from "./respond"

function RespondModal({loggedUser, profile_owner}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button className='profile-nav-links edit-profileBtn' onClick={() => setShowModal(true)}><i class="fas fa-reply"></i>&nbsp; Respond</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <Respond loggedUser={loggedUser} profile_owner={profile_owner}/>
            </Modal>
            )}
        </>
    )
}

export default RespondModal
