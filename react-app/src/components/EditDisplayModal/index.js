import { useState } from "react"
import { Modal } from "../../context/Modal"
import DisplayForm from "./DisplayForm"

function EditDisplayModal({loggedUser}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button className='profile-nav-links edit-profileBtn' onClick={() => setShowModal(true)}><i class="fas fa-pencil-alt"></i>&nbsp; Edit Display</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DisplayForm loggedUser={loggedUser} setShowModal={setShowModal}/>
            </Modal>
            )}
        </>
    )
}

export default EditDisplayModal
