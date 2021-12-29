import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeComment, newComment, removeComment } from '../../store/comment'
import { changePost, createPost, deletePost } from '../../store/post'
import { Link } from 'react-router-dom'
import './posts.css'
import { commentLike, commentUnlike, getAllLikes, postLike, postUnlike } from '../../store/like'
import EditIntroModal from '../EditIntroModal'
import Emojis from '../Emojis'

function Posts({ setDisplay, profileId, loggedUser, profile_owner, profile_photos, allPosts, allComments, allFriends, allUsersValues }) {
    const dispatch = useDispatch()
    const [postValue, setPostValue] = useState('')
    const [editValue, setEditValue] = useState('')
    const [commentValue, setCommentValue] = useState('')
    const [editCommentValue, setEditCommentValue] = useState('')

    const [commentBoxId, setCommentBoxId] = useState('')
    const [commentId, setCommentId] = useState('')
    const [editId, setEditId] = useState("")
    const [showEmoji, setShowEmoji] = useState(false)

    const allLikes = useSelector(state => Object.values(state.like))


    if (profile_photos.length > 9) {
        profile_photos = profile_photos.slice(0, 9)
    }

    let profile_owner_friends = [];
    allFriends.forEach(friend => {
        if (friend.confirmed === true && friend.friendAdder_id === +profileId) {
            profile_owner_friends.push(friend.friendReceiver_id)
        }
        if (friend.confirmed === true && friend.friendReceiver_id === +profileId) {
            profile_owner_friends.push(friend.friendAdder_id)
        }
    })
    // console.log('profile_owner_friends', profile_owner_friends)
    // console.log('allUsersValues', allUsersValues)
    // console.log('allFriends', allFriends)
    // console.log('currentProfileFriends', currentProfileFriends)
    // console.log('loggedUser', loggedUser?.id) // object of logged in owner
    // console.log('profile_owner', profile_owner) // object of owner of profile_page
    // console.log('profile_photos', profile_photos) // array of objects of all photos by the owner
    // console.log('allPosts', allPosts) // array of objects of all comments on the profile page
    // console.log('allComments', allComments) //array of all comments
    let currentProfileFriends = allUsersValues.filter(el => profile_owner_friends.includes(el.id))
    let commentCheck = allComments.map(el => el?.post_id)
    commentCheck = new Set(commentCheck)
    commentCheck = Array.from(commentCheck)


    if (currentProfileFriends.length > 9) {
        currentProfileFriends = currentProfileFriends.slice(0, 9)
    }

    const reversed = []
    allPosts.forEach(el => reversed.unshift(el))

    const addPost = () => {
        dispatch(createPost({
            post_content: postValue,
            owner_id: loggedUser.id,
            profile_id: profile_owner.id
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

    useEffect(()=> {
        setCommentValue('')
        dispatch(getAllLikes())
    }, [commentBoxId])

    return (
        <>
            <div className='post-container'>
                <div className='user-info'>
                    <div className='intro-container containers'>
                        <span className='profile-labels'>Intro</span>
                        <div className='category-row icon'>
                            <div className='icon-row'>
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div className='info'>
                                {profile_owner?.education ?
                                <span className='row-Data'>Studied at <span className='profile-owner-info'>{profile_owner?.education}</span></span>
                                : <span className='row-Data'>Education</span>
                                }
                            </div>
                        </div>
                        <div className='category-row icon'>
                            <div className='icon-row'>
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <div className='info'>
                                {profile_owner?.work ?
                                <span className='row-Data'>Works at <span className='profile-owner-info'>{profile_owner?.work}</span></span>
                                : <span className='row-Data'>Work</span>
                                }
                            </div>
                        </div>
                        <div className='category-row icon'>
                            <div className='icon-row'>
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className='info'>
                                {profile_owner?.location ?
                                <span className='row-Data'>Lives in <span className='profile-owner-info'>{profile_owner?.location}</span></span>
                                : <span className='row-Data'>Location</span>
                                }
                            </div>
                        </div>
                        <div className='category-row icon'>
                            <div className='icon-row'>
                                <i className="fas fa-birthday-cake"></i>
                            </div>
                            <div className='info'>
                                <span className='row-Data'>Born on <span className='profile-owner-info'>{profile_owner?.birthday}</span></span>
                            </div>
                        </div>
                        <div className={+profileId === loggedUser.id ? 'category-row icon' : 'category-row icon personal-info-padding'}>
                            <div className='icon-row'>
                                <i className="fas fa-tag"></i>
                            </div>
                            <div className='info'>
                                <span className='row-Data'>Joined in <span className='profile-owner-info'>{profile_owner?.createdAt}</span></span>
                            </div>
                        </div>
                        {+profileId === loggedUser.id ?
                        <EditIntroModal loggedUser={loggedUser}/>
                        : null
                        }
                    </div>

                    <div className='photos-container containers'>
                        <div className='photos-label'>
                            <span className='profile-labels'>Photos <span className='photos-count'>({profile_photos.length})</span></span>
                            <span className='edit-profileBtn3' onClick={() => setDisplay('photos')}>See All Photos</span>
                        </div>
                        {profile_photos.length > 0 ?
                        <div className='nine-images'>
                            {profile_photos.map((photo, index) => (
                                <img key={index} className={index === 0 ? 'posted-photos image-index-0'
                                    : [index === 2 ? 'posted-photos image-index-2'
                                        : [index === 6 ? 'posted-photos image-index-6'
                                            : [index === 8 ? 'posted-photos image-index-8'
                                                : 'posted-photos']]]} src={photo.photo}></img>
                            ))}
                        </div>
                            :
                            <div className='no-photos-text'>

                            </div>
                        }
                    </div>

                    <div className='friends-container containers'>
                        <div className='photos-label1'>
                            <span className='profile-labels'>Friends <span className='photos-count'>({currentProfileFriends.length})</span></span>
                            <span className='edit-profileBtn3' onClick={() => setDisplay('friends')}>See All Friends</span>
                        </div>
                        <div className='nine-friends'>
                            {currentProfileFriends.map((friend) => (
                            <Link className='friend-link' to={`/users/${friend.id}`}>
                                <div key={friend.id} className='indiv-portrait'>
                                    <img className='friends-portrait dim' src={friend.profile_pic}></img>
                                    <span className='portrait-name'>{friend.alias ? friend.alias : friend.first_name+' '+friend.last_name }</span>
                                </div>
                            </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='post-container-right'>
                    <div className='post-box containers'>
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
                            <div type='submit' onClick={ postValue.length > 0 ? ()=>addPost() : null } class='boxBtn pointer' form='add-post-form'>
                                <i class="fas fa-pen"></i> <span className='postBtns'>Post</span>
                            </div>
                            <div class='boxBtn unclickable'>
                                <i class="fas fa-images"></i> <span className='postBtns'>Photo</span>
                            </div>
                            <div class='boxBtn unclickable' onClick={()=>setShowEmoji(true)}>
                                <i class="far fa-laugh"></i> <span className='postBtns'>Feeling</span>
                            </div>
                        </div>
                    </div>
                                {/* {showEmoji === true ?
                                    <Emojis />
                                    : null
                                } */}
                    {/* {allPosts.map(post =>(
                        <div key={post.id} className='post-box containers'>
                            <img src={allUsers[post['owner_id']].profile_pic}></img>
                        </div>
                    ))} */}

                    {/* maps the posts */}
                    {reversed.map(post => (
                        <div key={post.id} className='post-box last-post containers'>
                            <div className='post-name-date'>
                                <Link className='link-to-friend-post' to={`/users/${post.poster_info.id}`}>
                                    <img className='post-image-wall dim' src={post.poster_info.profile_pic}></img>
                                </Link>
                                <div className='edit-delete-post-btn-container'>
                                    <div className='name-date'>
                                        <Link className='link-to-friend-post' to={`/users/${post.poster_info.id}`}>
                                            <span className='post-name'>{post.poster_info?.alias ? post.poster_info?.alias : post.poster_info?.first_name+' '+post.poster_info?.last_name }</span>
                                        </Link>
                                        <span className='post-date'>{post.updatedAt}</span>
                                    </div>
                                    <div className='edit-delete-button-container'>
                                        {loggedUser.id === post.owner_id ?
                                        <div onClick={ () => {editId ? setEditId("") : setEditId(post?.id); setEditValue(post?.post_content)} } className='trash-can-post'>
                                            <i class="fas fa-pencil-alt"></i>
                                        </div>
                                        : null
                                        }
                                        {loggedUser.id === profile_owner.id || post.owner_id === loggedUser.id ?
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
                                    <span onClick={ editValue.length > 0 ? () => editPost(post.id) : null } className='save-edit-button'>Save</span>
                                </form> : post.post_content
                                }
                            </div>
                            {allLikes.filter(like => like.post_id === post.id).length > 0 ? //temporary like/unlike switch
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
                                                    {loggedUser.id === profile_owner.id || comment.user_id === loggedUser.id ?
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
        </>
    )
}

export default Posts
