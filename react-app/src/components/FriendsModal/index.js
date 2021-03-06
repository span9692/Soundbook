import { Modal } from "../../context/Modal"
import { useState } from 'react'
import AllFriends from "./AllFriends"

function FriendModal({contact_list}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div className='left-side-options pointer' onClick={() => setShowModal(true)}>
                <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png'} alt='Image'></img>
                <div className='feed-left-option-label'>Friends</div>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                {/* <ProfilePhoto loggedUser={loggedUser} setShowModal={setShowModal}/> */}
                <AllFriends contact_list={contact_list}/>
            </Modal>
            )}
        </>
    )
}

export default FriendModal
