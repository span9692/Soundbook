import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addComment, deleteOneComment, modifyComment, changeComment, getComments, newComment } from '../../store/comment'
import { addNewFriend, removeRequest, yesRequest, cancelRequest, confirmRequest, getFriends } from '../../store/friend_list'
import { newLikePost, deleteLikePost, newLikeComment, deleteLikeComment, commentLike, commentUnlike, getAllLikes, postLike, postUnlike } from '../../store/like'
import { getPhotos } from '../../store/photo'
import { newPost, removeOnePost, modifyPost, changePost, createPost, getAllPosts } from '../../store/post'
import { getUsers } from '../../store/user'
import { io } from 'socket.io-client'
import CommentDelete from '../DeleteCommentModal'
import ConfirmDelete from '../DeleteConfirmModal'
import Emojis from '../Emojis'
import FriendModal from '../FriendsModal'
import PhotosModal from '../PhotosModal'
import VideoModal from '../VideoModal'
import './feed.css'
let socket;

function Feed({searchParams, setSearchParams}) {
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
    const [showEmojiComment, setShowEmojiComment] = useState(false)
    const [showEmojiEditComment, setShowEmojiEditComment] = useState(false)
    const [counter, setCounter] = useState(0)

    const [imageFile, setImageFile] = useState('');
    const [savedImageFile, setSavedImageFile] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [savedImagePreview, setSavedImagePreview] = useState('');

    const reset_picture = () => {
        setImageFile('')
        setSavedImageFile('')
        setImagePreview('')
        setSavedImagePreview('')
    }

    // console.log('imageFile', imageFile)
    // console.log('savedImageFile', savedImageFile)
    // console.log('imagePreview', imagePreview)
    // console.log('savedImagePreview', savedImagePreview)

    const setImage = (e) => {
        let file = e.target.files[0];
        setImageFile(e.target.files[0]);

        if (file) {
            setSavedImageFile(file)
            file = URL.createObjectURL(file);
            setImagePreview(file);
            setSavedImagePreview(file)
        } else {
            setImageFile(savedImageFile);
            setImagePreview(savedImagePreview);
        }
    }

    const closeEmojis = () => {
        setShowEmoji(false)
        setShowEmojiEditPost(false)
        setShowEmojiComment(false)
        setShowEmojiEditComment(false)
    }

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
    // only display friends post on the feed
    let reversed = temp.filter(el => profile_owner_friends.includes(el.owner_id) || el.owner_id === loggedUser.id || +el.profile_id === loggedUser.id)

    let commentCheck = allComments.map(el => el?.post_id)
    commentCheck = new Set(commentCheck)
    commentCheck = Array.from(commentCheck)

    const addPost = async(e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('post_content', postValue)
        formData.append('owner_id', loggedUser.id)
        formData.append('profile_id', loggedUser.id)
        formData.append('picture', imageFile)

        dispatch(createPost(formData))
        setPostValue('')
        closeEmojis()
        reset_picture()
    }

    const editPost = (e, postId) => {
        e.preventDefault()
        dispatch(changePost(postId, editValue))
        setEditId('')
    }

    const likePost = (postId) => {
        dispatch(postLike(postId, loggedUser.id))
    }

    const unlikePost = (postId) => {
        dispatch(postUnlike(postId, loggedUser.id))
    }

    const editComment = (e, commentId, editCommentValue) => {
        e.preventDefault()
        setCommentId('')
        dispatch(changeComment(commentId, editCommentValue))
    }

    const addNewComment = (e, postId) => {
        e.preventDefault()
        dispatch(newComment({
            comment_content: commentValue,
            post_id: postId,
            user_id: loggedUser.id
        }))
        setCommentValue('')
        setCommentBoxId('')
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
        socket = io()
        socket.on('add_post', post => {
            dispatch(newPost(post))
        })

        socket.on('delete_post', post => {
            dispatch(removeOnePost(post))
        })

        socket.on('edit_post', post => {
            dispatch(modifyPost(post))
        })

        socket.on('add_comment', comment => {
            dispatch(addComment(comment))
        })

        socket.on('delete_comment', comment => {
            dispatch(deleteOneComment(comment))
        })

        socket.on('edit_comment', comment => {
            dispatch(modifyComment(comment))
        })

        socket.on('add_like_post', postLike => {
            dispatch(newLikePost(postLike))
        })

        socket.on('delete_like_post', postLike => {
            dispatch(deleteLikePost(postLike))
        })

        socket.on('add_like_comment', commentLike => {
            dispatch(newLikeComment(commentLike))
        })

        socket.on('delete_like_comment', commentLike => {
            dispatch(deleteLikeComment(commentLike))
        })

        socket.on('confirm_friend', friend => {
            dispatch(yesRequest(friend))
        })

        socket.on('decline_friend', friend => {
            dispatch(removeRequest(friend))
        })

        socket.on('add_friend', friend => {
            dispatch(addNewFriend(friend))
        })

        return () => {
            socket.disconnect();
        }
    }, [])
//addNewFriend, removeRequest, yesRequest

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
            <div onClick={()=>setSearchParams('')} className='feed-container'>
                <div className='left-side-feed'>
                    <div onClick={() => closeEmojis()} className='feed-side-column'>
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
                                <form onSubmit={addPost} className='post-form' id='add-post-form'>
                                    <input
                                        className='post-field'
                                        type='text'
                                        placeholder="What's on your mind?"
                                        value={postValue}
                                        onChange={(e) => setPostValue(e.target.value)}
                                    />


                                    <input
                                        className='aws-form'
                                        id='aws'
                                        name='picture'
                                        placeholder='URL'
                                        type='file'
                                        accept='.jpg, .jpeg, .png, .gif'
                                        onChange={setImage}
                                    ></input>


                                    { imagePreview ?
                                        <>
                                            <img className='post-picture' src={imagePreview} alt=''></img>
                                            <div onClick={()=>reset_picture()}>
                                                <i class="cancel-picture pointer fas fa-times-circle"></i>
                                            </div>


                                        </>
                                    : null }


                                    <button type='submit' style={{display: 'none'}} form='add-post-form'>Submit</button>
                                </form>
                            </div>
                            <hr style={{ marginTop: 1 + 'rem', marginBottom: 1 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>
                            <div className='post-box-buttons'>
                                <div type='submit' onClick={ postValue.length > 0 ? (e)=>{addPost(e); setShowEmoji(false)} : ()=>setShowEmoji(false) } class='boxBtn pointer' form='add-post-form'>
                                    <i class="fas fa-pen"></i> <span className='postBtns'>Post</span>
                                </div>



                                <div class='photoboxBtn pointer' htmlFor='aws'>


                                    <label htmlFor='aws'>
                                        <div className='pointer'>
                                            <i class="fas fa-images"></i> <span className='postBtns'>Photo</span>
                                        </div>
                                    </label>


                                </div>
                                <div onClick={()=>setShowEmoji(!showEmoji)} className='boxBtn pointer'>
                                    <i class="far fa-laugh"></i> <span className={showEmoji ? 'postBtns blue' : 'postBtns'}>Feeling</span>
                                </div>
                                {showEmoji === true ?
                                <Emojis location={'feed-post'} setPostValue={setPostValue}/>
                                : null
                                }
                            </div>
                        </div>

                        {/* maps the posts*/}
                        {reversed.slice(0, 10+10*counter).map(post => (
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
                                        <div onClick={ () => {editId && editId === post.id ? setEditId("") : setEditId(post?.id); setEditValue(post?.post_content); setShowEmojiEditPost(false)} } className='trash-can-post'>
                                            <i class="fas fa-pencil-alt"></i>
                                        </div>
                                        : null
                                        }
                                        {loggedUser.id === post.profile_id || post.owner_id === loggedUser.id ?
                                        // <div onClick={ ()=> removePost(post.id) } className='trash-can-post'>
                                        //     <i class="fas fa-trash-alt"></i>
                                        // </div>
                                        <ConfirmDelete postId={post.id}/>
                                        : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='position-relative'>
                                {editId == post.id ?
                                <>
                                <form onSubmit={(e)=>editPost(e, post.id)} className='edit-Form-Field'>
                                    <input
                                        className='show-post-edit-field'
                                        type='text'
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                    <button type='submit' style={{display: 'none'}}>Submit</button>
                                    <span onClick={()=>setShowEmojiEditPost(!showEmojiEditPost)} className='addEmoji-to-edit-post'><i class="far fa-smile"></i></span>
                                    <span onClick={ editValue.length > 0 ? (e) => editPost(e, post.id) : null } className='save-edit-button'>Save</span>
                                </form>
                                <img className='post1-picture' src={post.picture}></img>
                                {showEmojiEditPost === true ?
                                    <Emojis location={'profile-edit-post'} setPostValue={setEditValue}/>
                                    : null
                                }
                                </>
                                :
                                <>
                                    {post.post_content}
                                    {post.picture ?
                                    <img className='post1-picture' src={post.picture}></img>
                                    : null
                                    }
                                </>
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
                                    <span onClick={() => {commentBoxId && commentBoxId === post.id ? setCommentBoxId('') : setCommentBoxId(post.id); setShowEmojiComment(false)}} className={commentBoxId === post.id ? 'comment1-button' : 'comment-button'}><i class="far fa-comment"></i> Comment</span>
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
                                                    <div className='comment-icon-position' onClick={() => {commentId && commentId === comment.id ? setCommentId('') : setCommentId(comment.id); setEditCommentValue(comment.comment_content); setShowEmojiEditComment(false)}} >
                                                        <i class="fas fa-pencil-alt pencil-icon-comment pointer"></i>
                                                    </div>: null
                                                    }
                                                    {loggedUser.id === post.profile_id || comment.user_id === loggedUser.id ?
                                                    // <div className='comment-icon-position' onClick={() => deleteComment(comment.id)} >
                                                    //     <i class="fas fa-trash-alt trash-icon-comment pointer"></i>
                                                    // </div>
                                                    <CommentDelete commentId={comment.id}/>
                                                    : null
                                                    }
                                                </div>
                                            </div>
                                            {comment.id === commentId ?
                                            <>
                                                <div className='position-relative'>
                                                    <form onSubmit={(e)=>editComment(e, comment.id, editCommentValue)} className='edit-Form-Field'>
                                                        <input
                                                            className='show-comment-edit-1field'
                                                            type='text'
                                                            value={editCommentValue}
                                                            onChange={(e) => setEditCommentValue(e.target.value)}
                                                        />
                                                        <button type='submit' style={{display: 'none'}}>Submit</button>
                                                        <span onClick={()=>setShowEmojiEditComment(!showEmojiEditComment)} className='addEmoji-to-edit-comment'><i class="far fa-smile"></i></span>
                                                        <span onClick={ editCommentValue.length > 0 ? (e) => editComment(e, comment.id, editCommentValue) : null } className='save-comment-button'>Save</span>
                                                    </form>
                                                    {showEmojiEditComment === true ?
                                                        <Emojis location={'profile-edit-comment'} setPostValue={setEditCommentValue}/>
                                                        : null
                                                    }
                                                </div>
                                            </>
                                            :

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
                            <div className='position-relative'>
                                <div className='add-comment-container'>
                                    <img className='post-image-wall' src={loggedUser.profile_pic}></img>
                                    <form onSubmit={(e)=>addNewComment(e, commentBoxId)} className='comment-form' id='add-comment-form'>
                                        <input
                                            className='comment-field'
                                            type='text'
                                            placeholder="Leave a comment..."
                                            value={commentValue}
                                            onChange={(e) => setCommentValue(e.target.value)}
                                        />
                                        <button type='submit' style={{display: 'none'}}>Submit</button>
                                    </form>
                                    <span onClick={()=>setShowEmojiComment(!showEmojiComment)} className='addEmoji-to-comment'><i class="far fa-smile"></i></span>
                                    <div onClick={commentValue.length > 0 ? (e) => addNewComment(e, commentBoxId) : null} className='post-comment-button'>Post</div>
                                    {showEmojiComment === true ?
                                        <Emojis location={'profile-comment'} setPostValue={setCommentValue}/>
                                        : null
                                    }
                                </div>
                            </div>
                            : null}
                        </div>))}
                        {reversed.length > 10 ?
                        [reversed.slice(0, 10+10*counter).length < reversed.length ?
                        <div className='show-more-posts pointer' onClick={() => setCounter(prev=>prev+1)}><span className='show-more-posts-text'>Show More Posts</span></div>
                        : null
                        ] : null }
                    </div>
                </div>
                <div onClick={()=> closeEmojis()} className='right-side-feed'>
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
