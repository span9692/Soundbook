import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../store/post'
import './feed.css'

function Feed() {
    const dispatch = useDispatch()
    const [postValue, setPostValue] = useState('')

    const loggedUser = useSelector(state => state.session.user)

    const addPost = () => {
        dispatch(createPost({
            post_content: postValue,
            owner_id: loggedUser.id,
            profile_id: loggedUser.id
        }))
        setPostValue('')
    }

    return (
        <>
            <div className='feed-container'>
                <div className='feed-side-column'>

                </div>
                <div className='feed-main-column'>
                    <div className='story-container'>
                        THIS IS THE USER'S FEED
                    </div>
                    <div className='post-box'>
                        Reference
                        <div className='post-box containers'>
                        <div className='post-name-row'>
                            <img className='post-image-wall' src={loggedUser?.profile_pic}></img>
                            <form className='post-form' id='add-post-form'>
                                <input
                                    className='post-field'
                                    type='text'
                                    placeholder="What's on your mind?"
                                    value={postValue}
                                    onChange={(e) => setPostValue(e.target.value)}
                                />
                            </form>
                        </div>
                        <hr style={{ marginTop: 1 + 'rem', marginBottom: 1 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>
                        <div className='post-box-buttons'>
                            <div type='submit' onClick={ postValue.length > 1 ? ()=>addPost() : null } class='boxBtn pointer' form='add-post-form'>
                                <i class="fas fa-pen"></i> <span className='postBtns'>Post</span>
                            </div>
                            <div class='boxBtn pointer'>
                                <i class="fas fa-images"></i> <span className='postBtns'>Photo</span>
                            </div>
                            <div class='boxBtn pointer'>
                                <i class="far fa-laugh"></i> <span className='postBtns'>Feeling</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='feed-side-column'>

                </div>
            </div>
        </>
    )
}

export default Feed
