import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeComment, getComments, newComment, removeComment } from '../../store/comment'
import { getFriends } from '../../store/friend_list'
import { getPhotos } from '../../store/photo'
import { changePost, createPost, deletePost, getPosts } from '../../store/post'
import { getUsers } from '../../store/user'
import './feed.css'

function Feed() {
    const dispatch = useDispatch()
    const [postValue, setPostValue] = useState('')

    const [editValue, setEditValue] = useState('')
    const [commentValue, setCommentValue] = useState('')
    const [editCommentValue, setEditCommentValue] = useState('')

    const [commentBoxId, setCommentBoxId] = useState('')
    const [commentId, setCommentId] = useState('')
    const [editId, setEditId] = useState("")

    const loggedUser = useSelector(state => state.session.user)
    const allComments = useSelector(state => Object.values(state.comment))
    const allPosts = useSelector(state => Object.values(state.post))
    const reversed = []
    allPosts.forEach(el => reversed.unshift(el))

    let commentCheck = allComments.map(el => el?.post_id)
    commentCheck = new Set(commentCheck)
    commentCheck = Array.from(commentCheck)

    const addPost = () => {
        dispatch(createPost({
            post_content: postValue,
            owner_id: loggedUser.id,
            profile_id: loggedUser.id
        }))
        setPostValue('')
    }

    const removePost = (postId) => {
        dispatch(deletePost(postId))
    }

    const editPost = (postId) => {
        dispatch(changePost(postId, editValue))
        setEditId('')
    }

    const editComment = (commentId, editCommentValue) => {
        setCommentId('')
        dispatch(changeComment(commentId, editCommentValue))
    }

    const addComment = (postId) => {
        dispatch(newComment({
            comment_content: commentValue,
            post_id: postId,
            user_id: loggedUser.id
        }))
        setCommentValue('')
        setCommentBoxId('')
    }

    const deleteComment = (commentId) => {
        dispatch(removeComment(commentId))
    }

    useEffect(()=> {
        setCommentValue('')
        dispatch(getUsers())
        dispatch(getPhotos(loggedUser.id))
        dispatch(getPosts(loggedUser.id))
        dispatch(getComments(loggedUser.id))
        dispatch(getFriends(loggedUser.id))
    }, [dispatch, commentBoxId])

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

                    {/* maps the posts*/}
                    {reversed.map(post => (
                        <div key={post.id} className='post-box last-post containers'>
                            <div className='post-name-date'>
                                <img className='post-image-wall' src={post.poster_info.profile_pic}></img>
                                <div className='edit-delete-post-btn-container'>
                                    <div className='name-date'>
                                        <span className='post-name'>{post.poster_info.first_name} {post.poster_info.last_name}</span>
                                        <span className='post-date'>{post.updatedAt}</span>
                                    </div>
                                    <div className='edit-delete-button-container'>
                                        {loggedUser.id === post.owner_id ?
                                        <div onClick={ () => {editId ? setEditId("") : setEditId(post?.id); setEditValue(post?.post_content)} } className='trash-can-post'>
                                            <i class="fas fa-pencil-alt"></i>
                                        </div>
                                        : null
                                        }
                                        { post.owner_id === loggedUser.id ?
                                        <div onClick={ ()=> removePost(post.id) } className='trash-can-post'>
                                            <i class="fas fa-trash-alt"></i>
                                        </div>
                                        : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                {editId == post.id ?
                                <form className='edit-Form-Field'>
                                    <input
                                        className='show-post-edit-field'
                                        type='text'
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                    <span onClick={ () => editPost(post.id) } className='save-edit-button'>Save</span>
                                </form> : post.post_content
                                }
                            </div>
                            {true ? //temporary like/unlike switch
                            <div className='like-post-container'>
                                <i class="fas fa-thumbs-up thumbs-up-icon"></i><span className='post-like-counter'>&nbsp;You and 6 other people liked this post</span>
                            </div>
                            : null
                            }
                            <hr style={{ marginTop: 1 + 'rem', marginBottom: 1 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>
                            <div className='like-comment'>
                                <div class='pointer'>
                                    <span className='like-post-button'><i class="far fa-thumbs-up"></i> Like</span>
                                </div>
                                <div class='pointer'>
                                    <span onClick={() => {commentBoxId ? setCommentBoxId('') : setCommentBoxId(post.id)}} className='comment-button'><i class="far fa-comment"></i> Comment</span>
                                </div>
                            </div>
                            {commentCheck.includes(post?.id) ?
                            <hr style={{ marginTop: 1 + 'rem', marginBottom: 1 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>
                            : <hr style={{ marginTop: 1 + 'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                            }
                            {/* map the comments */}
                            {allComments.map((comment) => (
                                (post.id == comment.post_id ?
                                <div key={comment.id} className='post-name-comment last-comment'>
                                    <img className='post-image-wall' src={comment.poster_info.profile_pic}></img>
                                    <div className='width-fix'>
                                        <div className='name-comment'>
                                            <div className='edit-delete-comment-container'>
                                                <span className='post-comment-name'>{comment.poster_info.first_name} {comment.poster_info.last_name}</span>
                                                <div className='comment-icon-position'>
                                                    {loggedUser.id === comment.user_id ?
                                                    <div className='comment-icon-position' onClick={() => {commentId ? setCommentId('') : setCommentId(comment.id); setEditCommentValue(comment.comment_content)}} >
                                                        <i class="fas fa-pencil-alt pencil-icon-comment pointer"></i>
                                                    </div>: null
                                                    }
                                                    { comment.user_id === loggedUser.id ?
                                                    <div className='comment-icon-position' onClick={() => deleteComment(comment.id)} >
                                                        <i class="fas fa-trash-alt trash-icon-comment pointer"></i>
                                                    </div>: null
                                                    }
                                                </div>
                                            </div>
                                            {comment.id === commentId ?
                                            <form className='edit-Form-Field'>
                                                <input
                                                    className='show-comment-edit-field'
                                                    type='text'
                                                    value={editCommentValue}
                                                    onChange={(e) => setEditCommentValue(e.target.value)}
                                                />
                                                <span onClick={ () => editComment(comment.id, editCommentValue) } className='save-comment-button'>Save</span>
                                            </form> :

                                            <span className='post-comment'> {comment.comment_content}
                                                {/* the following div will need to be rendered conditionally */}
                                                <div className='like-counter-container'>
                                                    <i class="fas fa-thumbs-up thumbs-up-icon1"></i><span className='post-like-counter1'>&nbsp;10</span>
                                                </div>
                                            </span>
                                        }
                                        </div>
                                        <div>
                                            <span className='comment-detail like-unlike'><span className='like-unlike2 pointer'>Like</span> &bull; {comment.updatedAt}</span>
                                        </div>
                                    </div>
                                </div> : null)
                                ))}
                            {commentBoxId === post.id ?
                            <div className='add-comment-container'>
                                <img className='post-image-wall' src={loggedUser.profile_pic}></img>
                                <form className='comment-form' id='add-comment-form'>
                                    <input
                                        className='comment-field'
                                        type='text'
                                        placeholder="Leave a comment..."
                                        value={commentValue}
                                        onChange={(e) => setCommentValue(e.target.value)}
                                    />
                                </form>
                                <div onClick={() => addComment(commentBoxId)} className='post-comment-button'>Post</div>
                            </div>
                            : null}
                        </div>))}




                    </div>
                </div>
                <div className='feed-side-column'>

                </div>
            </div>
        </>
    )
}

export default Feed
