import { useState } from "react"
import { Modal } from "../../context/Modal"
import { deletePost } from "../../store/post"
import { useDispatch } from 'react-redux'
import './deleteconfirm.css'


function ConfirmDelete({postId}) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const removePost = () => {
        dispatch(deletePost(postId))
    }

    return (
        <>
            <div onClick={()=> {setShowModal(true)}} className='trash-can-post'>
                <i class="fas fa-trash-alt"></i>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <>
                    <div className='delete-post-modal'>
                        <div className='confirm-delete'>
                            <div className='delete-top-row'>
                                <span className='delete-text'>Delete Post?</span>
                                <div className='cancel-circle pointer' onClick={()=>setShowModal(false)}><i class="fas fa-times-circle"></i></div>
                            </div>
                            <hr style={{ marginTop: .7 + 'rem', marginBottom: .5 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>
                            <span className='you-sure'>Are you sure you want to delete this post?</span>
                            <div className='delete-post-buttons'>
                                <div className='confirm-friend-request-btn pointer' onClick={() => removePost(postId)}>Delete</div>
                                <div className='delete-friend-request-btn pointer' onClick={() => setShowModal(false)}>Cancel</div>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
            )}
        </>
    )
}

export default ConfirmDelete
