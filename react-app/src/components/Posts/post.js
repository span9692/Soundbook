import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost, deletePost } from '../../store/post'
import './posts.css'

function Posts({ loggedUser, profile_owner, profile_photos, allPosts, allComments }) {
    const dispatch = useDispatch()
    const [postValue, setPostValue] = useState('')

    if (profile_photos.length > 9) {
        profile_photos = profile_photos.slice(0, 9)
    }
    // console.log('loggedUser', loggedUser?.id) // object of logged in owner
    // console.log('profile_owner', profile_owner?.id) // object of owner of profile_page
    // console.log('profile_photos', profile_photos) // array of objects of all photos by the owner
    // console.log('allPosts', allPosts) // array of objects of all comments on the profile page
    // console.log('allComments', allComments) //array of all comments

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
        console.log('postId', postId)
    }

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
                            <div>
                                <span className='row-Data'>Education</span>
                            </div>
                        </div>
                        <div className='category-row icon'>
                            <div className='icon-row'>
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <div>
                                <span className='row-Data'>Company</span>
                            </div>
                        </div>
                        <div className='category-row icon'>
                            <div className='icon-row'>
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <span className='row-Data'>Location</span>
                            </div>
                        </div>
                        <div className='category-row icon'>
                            <div className='icon-row'>
                                <i className="fas fa-birthday-cake"></i>
                            </div>
                            <div>
                                <span className='row-Data'>Birthday</span>
                            </div>
                        </div>
                        <div className='category-row icon'>
                            <div className='icon-row'>
                                <i className="fas fa-tag"></i>
                            </div>
                            <div>
                                <span className='row-Data'>Joined Year</span>
                            </div>
                        </div>
                        <button className='profile-nav-links1 edit-profileBtn1'><i class="fas fa-pencil-alt"></i>&nbsp; Edit Profile</button>
                    </div>

                    <div className='photos-container containers'>
                        <div className='photos-label'>
                            <span className='profile-labels'>Photos</span>
                            <span className='edit-profileBtn3'>See All Photos</span>
                        </div>
                        <div className='nine-images'>
                            {profile_photos.map((photo, index) => (
                                <img key={index} className={index === 0 ? 'posted-photos image-index-0'
                                    : [index === 2 ? 'posted-photos image-index-2'
                                        : [index === 6 ? 'posted-photos image-index-6'
                                            : [index === 8 ? 'posted-photos image-index-8'
                                                : 'posted-photos']]]} src={photo.photo}></img>
                            ))}
                        </div>
                    </div>

                    <div className='friends-container containers'>
                        <div className='photos-label1'>
                            <span className='profile-labels'>Friends</span>
                            <span className='edit-profileBtn3'>See All Friends</span>
                        </div>
                    </div>
                </div>

                <div className='post-container-right'>
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
                    {/* {allPosts.map(post =>(
                        <div key={post.id} className='post-box containers'>
                            <img src={allUsers[post['owner_id']].profile_pic}></img>
                        </div>
                    ))} */}

                    {/* maps the posts */}
                    {reversed.map(post => (
                        <div key={post.id} className='post-box last-post containers'>
                            <div className='post-name-date'>
                                <img className='post-image-wall' src={post.poster_info.profile_pic}></img>
                                <div className='edit-delete-post-btn-container'>
                                    <div className='name-date'>
                                        <span className='post-name'>{post.poster_info.first_name} {post.poster_info.last_name}</span>
                                        <span className='post-date'>{post.createdAt}</span>
                                    </div>
                                    <div className='edit-delete-button-container'>
                                        <div onClick={ ()=> editPost(post.id) } className='trash-can-post'>
                                            <i class="fas fa-pencil-alt"></i>
                                        </div>
                                        { loggedUser.id === profile_owner.id || post.owner_id === loggedUser.id ?
                                        <div onClick={ ()=> removePost(post.id) } className='trash-can-post'>
                                            <i class="fas fa-trash-alt"></i>
                                        </div>
                                        : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                {post.post_content}
                            </div>
                            <hr style={{ marginTop: 1 + 'rem', marginBottom: 1 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>
                            <div className='like-comment'>
                                <div class='pointer'>
                                    <span className='like-post-button'><i class="far fa-thumbs-up"></i> Like</span>
                                </div>
                                <div class='pointer'>
                                    <span className='comment-button'><i class="far fa-comment"></i> Comment</span>
                                </div>
                            </div>
                            <hr style={{ marginTop: 1 + 'rem', marginBottom: 1 + 'rem' }} size='1' width='100%' color='#dddfe2'></hr>

                            {/* map the comments */}
                            {allComments.map((comment) => (
                                (post.id == comment.post_id ?
                                <div key={comment.id} className='post-name-comment last-comment'>
                                    <img className='post-image-wall' src={comment.poster_info.profile_pic}></img>
                                    <div className='width-fix'>
                                        <div className='name-comment'>
                                            <span className='post-comment-name'>{comment.poster_info.first_name} {comment.poster_info.last_name}</span>
                                            <span className='post-comment'>{comment.comment_content}</span>
                                        </div>
                                        <div>
                                            <span className='comment-detail like-unlike'><span className='like-unlike2 pointer'>Like</span> &bull; Dec 25, 2021</span>
                                        </div>
                                    </div>
                                </div> : null)
                                ))}
                        </div>))}
                </div>
            </div>
        </>
    )
}

export default Posts
