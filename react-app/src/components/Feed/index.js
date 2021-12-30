import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { changeComment, getComments, newComment, removeComment } from '../../store/comment'
import { cancelRequest, confirmRequest, getFriends } from '../../store/friend_list'
import { commentLike, commentUnlike, getAllLikes, postLike, postUnlike } from '../../store/like'
import { getPhotos } from '../../store/photo'
import { changePost, createPost, deletePost, getAllPosts } from '../../store/post'
import { getUsers } from '../../store/user'
import Emojis from '../Emojis'
import FriendModal from '../FriendsModal'
import PhotosModal from '../PhotosModal'
import VideoModal from '../VideoModal'
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
    const [showMore, setShowMore] = useState(false)
    const [showEmoji, setShowEmoji] = useState(false)
    const [showEmojiEditPost, setShowEmojiEditPost] = useState(false)


    const loggedUser = useSelector(state => state.session.user)
    const allComments = useSelector(state => Object.values(state.comment))
    const allFriends = useSelector(state => Object.values(state.friend_list))
    const allUsers = useSelector(state => state.user)
    const allUsersValues = Object.values(allUsers)
    const allLikes = useSelector(state => Object.values(state.like))
    const profile_photos = useSelector(state => Object.values(state.photo))

    // this displays all the friends/contacts of the logged in user
    const profile_owner_friends = [];
    allFriends.forEach(friend => {
        if (friend.confirmed === true && friend.friendAdder_id === loggedUser?.id) {
            profile_owner_friends.push(friend.friendReceiver_id)
        }
        if (friend.confirmed === true && friend.friendReceiver_id === loggedUser?.id) {
            profile_owner_friends.push(friend.friendAdder_id)
        }
    })
    const contact_list = allUsersValues.filter(el => profile_owner_friends.includes(el.id))
    // current user's friend in array contact_list

    // limit story to 5 friends
    let story_friends;

    if (contact_list.length > 5) {
        story_friends = contact_list.slice(0,5)
    } else {
        story_friends = [...contact_list]
    }
    // stories have been limited

    // this checks id of users that sent friend requests
    const requester_id = [];
    allFriends.forEach(friend => {
        if (friend.confirmed === false && friend.friendReceiver_id === loggedUser.id) {
            requester_id.push(friend.friendAdder_id)
        }
    })
    const friend_request_list = allUsersValues.filter(el => requester_id.includes(el.id))
    // friend requests list determined

    const allPosts = useSelector(state => Object.values(state.post))
    const temp = []
    allPosts.forEach(el => temp.unshift(el))

    let reversed = temp.filter(el => profile_owner_friends.includes(el.owner_id) || el.owner_id === loggedUser.id)

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

    const likePost = (postId) => {
        dispatch(postLike(postId, loggedUser.id))
    }

    const unlikePost = (postId) => {
        dispatch(postUnlike(postId, loggedUser.id))
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

    const likeComment = (commentId) => {
        dispatch(commentLike(commentId, loggedUser.id))
    }

    const unlikeComment = (commentId) => {
        dispatch(commentUnlike(commentId, loggedUser.id))
    }

    const acceptRequest = (adderId) => {
        dispatch(confirmRequest(adderId, loggedUser.id))
    }

    const deleteRequest = (adderId) => {
        dispatch(cancelRequest(adderId, loggedUser.id))
    }

    useEffect(()=> {
        setCommentValue('')
        dispatch(getUsers())
        dispatch(getPhotos(loggedUser.id))
        dispatch(getAllPosts())
        dispatch(getComments(loggedUser.id))
        dispatch(getFriends(loggedUser.id))
        dispatch(getAllLikes())
    }, [dispatch, commentBoxId])

    return (
        <>
            <div className='feed-container'>
                <div className='left-side-feed'>
                    <div className='feed-side-column'>
                        <Link className='link-to-friend' to={`/users/${loggedUser.id}`}>
                            <div className='left-side-options pointer'>
                                <img className='post-image-wall dim' src={loggedUser?.profile_pic}></img>
                                <div className='feed-left-option-label'>{loggedUser?.alias ? loggedUser?.alias : loggedUser?.first_name+' '+loggedUser?.last_name }</div>
                            </div>
                        </Link>
                        <FriendModal contact_list={contact_list} />
                        <VideoModal />
                        <PhotosModal profile_photos={profile_photos}/>
                        <a href='https://www.cdc.gov/coronavirus/2019-ncov/index.html' target="_blank" className='left-side-options pointer'>
                            <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/5rR6LRpNc5u.png'} alt='Image'></img>
                            <div className='feed-left-option-label'>COVID-19 Information Center</div>
                        </a>
                        {!showMore ?
                            <div className='arrow-options pointer' onClick={()=>setShowMore(true)}>
                                <img className='drop-down-arrow' src={'https://res.cloudinary.com/photofinder/image/upload/v1640796801/551749-200_szqyvu.png'} alt='Image'></img>
                               <div className='feed-left-option-label'>Show More</div>
                            </div> :
                            <>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Groups</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Marketplace</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/he-BkogidIc.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Memories</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/DHBHg9MEeSC.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Ads Manager</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/bRC_jZ58syg.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Blood Donations</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/9s7nhm949yb.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Community Help</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/eXC82ZeepQ7.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Events</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/mAnT0r8GSOm.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Favorites</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/n2vd2VduYc1.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Fundraisers</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yY/r/XxEsb0x8INQ.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Jobs</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/4Y9Xi2D3hJv.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Messenger</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/PObY9OA5lvJ.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Play Games</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Saved</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/e2VRgQCGEk1.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Voting Information Center</div>
                                </div>
                                <div className='left-side-options unclickable'>
                                    <img className='post-image-wall' src={'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/bo0Zt72NIra.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Weather</div>
                                </div>
                                <div className='arrow-options pointer' onClick={()=>setShowMore(false)}>
                                    <img className='drop-up-arrow' src={'https://res.cloudinary.com/photofinder/image/upload/v1640796801/551749-200_szqyvu.png'} alt='Image'></img>
                                    <div className='feed-left-option-label'>Show Less</div>
                                </div>
                            </>
                           }
                    </div>
                </div>
                <div className='feed-main-column'>
                    <div className='story-container'>
                        {story_friends.map(friend => (
                            <Link key={friend.id} className='indiv-story-container' to={`/users/${friend.id}`}>
                                <img className='story-images' src={friend.photos.length === 0 ? friend?.profile_pic : friend?.photos[0].photo}></img>
                                <div className='story-profile-pic'>
                                    <img className='story-image-wall dim' src={friend?.profile_pic}></img>
                                    <div className='story-profile-name'>
                                        {friend?.alias ? friend?.alias : friend?.first_name+' '+friend?.last_name }
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='feed-post-box'>
                        <div className='post-box feed-containers'>
                            <div className='post-name-row'>
                                <Link className='link-to-friend-post' to={`/users/${loggedUser.id}`}>
                                    <img className='post-image-wall dim' src={loggedUser?.profile_pic}></img>
                                </Link>
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
                                <div type='submit' onClick={ postValue.length > 0 ? ()=>{addPost(); setShowEmoji(false)} : ()=>setShowEmoji(false) } class='boxBtn pointer' form='add-post-form'>
                                    <i class="fas fa-pen"></i> <span className='postBtns'>Post</span>
                                </div>
                                <div class='boxBtn unclickable'>
                                    <i class="fas fa-images"></i> <span className='postBtns'>Photo</span>
                                </div>
                                <div onClick={()=>setShowEmoji(!showEmoji)} className='boxBtn pointer'>
                                    <i class="far fa-laugh"></i> <span className={showEmoji ? 'postBtns blue' : 'postBtns'}>Feeling</span>
                                </div>
                            </div>
                        </div>
                        {showEmoji === true ?
                        <Emojis location={'feed-post'} setPostValue={setPostValue}/>
                        : null
                        }

                        {/* maps the posts*/}
                        {reversed.map(post => (
                        <div key={post.id} className='post-box last-post feed-containers'>
                            <div className='post-name-date'>
                                <Link className='link-to-friend' to={`/users/${post.poster_info.id}`}>
                                    <img className='post-image-wall dim' src={post.poster_info.profile_pic}></img>
                                </Link>
                                <div className='edit-delete-post-btn-container'>
                                    <div className='name-date'>
                                        <Link className='link-to-friend-post' to={`/users/${post.poster_info.id}`}>
                                            <div className='post-name post-recipient'>
                                                {post.poster_info?.alias ? post.poster_info?.alias : post.poster_info?.first_name+' '+post.poster_info?.last_name } {post.owner_id === post.profile_id ? null :
                                                    <span className='post-recipient'>
                                                        <i class="fas fa-caret-right"></i>
                                                        <Link className='link-to-friend-post recipient-margin' to={`/users/${post.profile_id}`}>
                                                            {allUsers[post.profile_id]?.alias ? allUsers[post.profile_id]?.alias : allUsers[post.profile_id]?.first_name+' '+allUsers[post.profile_id]?.last_name}
                                                        </Link>
                                                    </span>
                                                }
                                            </div>
                                        </Link>
                                        <span className='post-date'>{post.updatedAt}</span>
                                    </div>
                                    <div className='edit-delete-button-container'>
                                        {loggedUser.id === post.owner_id ?
                                        <div onClick={ () => {editId ? setEditId("") : setEditId(post?.id); setEditValue(post?.post_content); setShowEmojiEditPost(false)} } className='trash-can-post'>
                                            <i class="fas fa-pencil-alt"></i>
                                        </div>
                                        : null
                                        }
                                        {loggedUser.id === post.profile_id || post.owner_id === loggedUser.id ?
                                        <div onClick={ ()=> removePost(post.id) } className='trash-can-post'>
                                            <i class="fas fa-trash-alt"></i>
                                        </div>
                                        : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='position-absolute'>
                                {editId == post.id ?
                                <>
                                <form className='edit-Form-Field'>
                                    <input
                                        className='show-post-edit-field'
                                        type='text'
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                    <span onClick={()=>setShowEmojiEditPost(!showEmojiEditPost)} className='addEmoji-to-edit-post'><i class="far fa-smile"></i></span>
                                    <span onClick={ editValue.length > 0 ? () => editPost(post.id) : null } className='save-edit-button'>Save</span>
                                </form>
                                {showEmojiEditPost === true ?
                                    <Emojis location={'profile-edit-post'} setPostValue={setEditValue}/>
                                    : null
                                }
                                </>
                                : post.post_content
                                }
                            </div>
                            {allLikes.filter(like => like.post_id === post.id).length > 0 ? //# of likes on post
                            <div className='like-post-container'>
                                <i class="fas fa-thumbs-up thumbs-up-icon"></i>&nbsp;
                                <span className='post-like-counter'>
                                    {allLikes.filter(like => like.user_id === loggedUser.id && like.post_id === post.id).length === 0 && allLikes.filter(like => like.user_id !== loggedUser.id && like.post_id === post.id).length === 1 ? '1 person liked this post'
                                    : [allLikes.filter(like => like.user_id === loggedUser.id && like.post_id === post.id).length === 0 && allLikes.filter(like => like.user_id !== loggedUser.id && like.post_id === post.id).length > 1 ? allLikes.filter(like => like.user_id !== loggedUser.id && like.post_id === post.id).length+' people liked this post'
                                        :[allLikes.filter(like => like.user_id === loggedUser.id && like.post_id === post.id).length === 1 && allLikes.filter(like => like.user_id !== loggedUser.id && like.post_id === post.id).length === 0 ? 'You liked this post'
                                            :[allLikes.filter(like => like.user_id === loggedUser.id && like.post_id === post.id).length === 1 && allLikes.filter(like => like.user_id !== loggedUser.id && like.post_id === post.id).length === 1 ? 'You and 1 other person liked this post'
                                                : 'You and '+allLikes.filter(like => like.user_id !== loggedUser.id && like.post_id === post.id).length+' other people liked this post'
                                    ]]]}
                                </span>
                            </div>
                            : null
                            }
                            <hr style={{ marginTop: 1 + 'rem', marginBottom: 1 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>
                            <div className='like-comment'>
                            {allLikes.filter(like => like.user_id === loggedUser.id && like.post_id === post.id).length === 1 ?
                                <div class='pointer'>
                                    <span onClick={()=>unlikePost(post.id)} className='unlike-post-button'><i class="far fa-thumbs-up"></i> Like</span>
                                </div>
                                :
                                <div class='pointer'>
                                    <span onClick={()=>likePost(post.id)} className='like-post-button'><i class="far fa-thumbs-up"></i> Like</span>
                                </div>
                            }
                                <div class='pointer'>
                                    <span onClick={() => {commentBoxId ? setCommentBoxId('') : setCommentBoxId(post.id)}} className={commentBoxId === post.id ? 'comment1-button' : 'comment-button'}><i class="far fa-comment"></i> Comment</span>
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
                                    <Link className='link-to-friend' to={`/users/${comment.poster_info.id}`}>
                                        <img className='post-image-wall dim' src={comment.poster_info.profile_pic}></img>
                                    </Link>
                                    <div className='width-fix'>
                                        <div className='name-comment'>
                                            <div className='edit-delete-comment-container'>
                                                <Link className='link-to-friend-post' to={`/users/${comment.poster_info.id}`}>
                                                    <span className='post-comment-name'>{comment.poster_info?.alias ? comment.poster_info?.alias : comment.poster_info?.first_name+' '+comment.poster_info?.last_name }</span>
                                                </Link>
                                                <div className='comment-icon-position'>
                                                    {loggedUser.id === comment.user_id ?
                                                    <div className='comment-icon-position' onClick={() => {commentId ? setCommentId('') : setCommentId(comment.id); setEditCommentValue(comment.comment_content)}} >
                                                        <i class="fas fa-pencil-alt pencil-icon-comment pointer"></i>
                                                    </div>: null
                                                    }
                                                    {loggedUser.id === post.profile_id || comment.user_id === loggedUser.id ?
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
                                                <span onClick={ editCommentValue.length > 0 ? () => editComment(comment.id, editCommentValue) : null } className='save-comment-button'>Save</span>
                                            </form> :

                                            <span className='post-comment'> {comment.comment_content}
                                            {allLikes.filter(like => like.comment_id === comment.id).length > 0 ? //# of likes on comments
                                                <div className='like-counter-container'>
                                                    <i class="fas fa-thumbs-up thumbs-up-icon1"></i><span className='post-like-counter1'>&nbsp;{allLikes.filter(like => like.comment_id === comment.id).length}</span>
                                                </div>
                                            : null
                                            }
                                            </span>
                                        }
                                        </div>
                                        {allLikes.filter(like => like.user_id === loggedUser.id && like.comment_id === comment.id).length === 1 ?
                                        <div>
                                            <span onClick={()=>unlikeComment(comment.id)} className='comment-detail like-unlike'><span className='like-unlike2 pointer'>Unlike</span> &bull; {comment.updatedAt}</span>
                                        </div>
                                        :
                                        <div>
                                            <span onClick={()=>likeComment(comment.id)} className='comment-detail like-unlike'><span className='like-unlike2 pointer'>Like</span> &bull; {comment.updatedAt}</span>
                                        </div>
                                        }
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
                                <div onClick={commentValue.length > 0 ? () => addComment(commentBoxId) : null} className='post-comment-button'>Post</div>
                            </div>
                            : null}
                        </div>))}
                    </div>
                </div>
                <div className='right-side-feed'>
                    <div className='feed-side-column2'>
                        <div className='friend-request-text'>
                            Friend Requests
                        </div>
                        {friend_request_list.length > 0 ?
                        (friend_request_list.map(request => (
                        <>
                            <div key={request.id} className='individual-friend-request'>
                                <Link className='link-to-friend' to={`/users/${request.id}`}>
                                    <img className='post-image-wall dim' src={request?.profile_pic}></img>
                                </Link>
                                <div className='friend-request-minus-portrait'>
                                    <div>
                                        <Link className='link-to-friend' to={`/users/${request.id}`}>
                                            <span className='requester-name'>{request?.alias ? request?.alias : request?.first_name+' '+request?.last_name }</span> <span className='sent-you-a-friend-request'>sent you a friend request.</span>
                                        </Link>
                                    </div>
                                    <div className='friend-request-buttons'>
                                        <div className='confirm-friend-request-btn pointer' onClick={() => acceptRequest(request.id)}>Confirm</div>
                                        <div className='delete-friend-request-btn pointer' onClick={() => deleteRequest(request.id)}>Delete</div>
                                    </div>
                                </div>
                            </div>
                        </>
                        )))
                        :
                        <div className='no-friend-request'>
                            <span className='no-friend-text'>No Friend Requests</span>
                        </div>
                        }
                        <hr style={{ marginTop: 2 + 'rem', marginBottom: 2 + 'rem', marginRight: .9 + 'rem' }} size='1' width='95%' color='#c2c1c1'></hr>
                        <div className='contact-text'>
                            Contacts
                        </div>
                        <div className='contact-container'>
                            {contact_list.map(friend => (
                            <Link className='link-to-friend' to={`/users/${friend.id}`}>
                                <div key={friend.id} className='indiv-contact'>
                                    <img className='post-image-wall dim' src={friend?.profile_pic}></img>
                                    <span className='requester-name'>{friend?.alias ? friend?.alias : friend?.first_name+' '+friend?.last_name }</span>
                                </div>
                            </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed
