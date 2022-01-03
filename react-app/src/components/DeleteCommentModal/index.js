import { useState } from "react"
import { Modal } from "../../context/Modal"

import { useDispatch } from 'react-redux'
import { removeComment } from "../../store/comment"



function CommentDelete({commentId}) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const deleteComment = () => {
        dispatch(removeComment(commentId))
    }

    return (
        <>
            <div className='comment-icon-position' onClick={() => {setShowModal(true)}}>
                <i class="fas fa-trash-alt trash-icon-comment pointer"></i>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <>
                    <div className='delete-post-modal'>
                        <div className='confirm-delete'>
                            <div className='delete-top-row'>
                                <span className='delete-text'>Delete Comment?</span>
                                <div className='cancel-circle pointer' onClick={()=>setShowModal(false)}><i class="fas fa-times-circle"></i></div>
                            </div>
                            <hr style={{ marginTop: .7 + 'rem', marginBottom: .5 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>
                            <span className='you-sure'>Are you sure you want to delete this comment?</span>
                            <div className='delete-post-buttons'>
                                <div className='confirm-friend-request-btn pointer' onClick={() => deleteComment(commentId)}>Delete</div>
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

export default CommentDelete
