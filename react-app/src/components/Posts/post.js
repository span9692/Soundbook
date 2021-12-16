import { useState } from 'react'
import './posts.css'

function Posts({profile_owner, profile_photos, allPosts, allUsers}) {
    const [post, setPost] = useState('')

    if (profile_photos.length > 9) {
        profile_photos = profile_photos.slice(0,9)
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
                        <span className='profile-labels profile-nav-links profile-text'>Friends</span>
                    </div>
                </div>

                <div className='post-container-right'>
                    <div className='post-box containers'>
                        <div className='post-name-row'>
                            <img className='post-image-wall' src={profile_owner?.profile_pic}></img>
                            <form className='post-form'>
                                <input
                                    className='post-field'
                                    type='text'
                                    placeholder="What's on your mind?"
                                    value={post}
                                    onChange={(e) => setPost(e.target.value)}
                                />
                            </form>
                        </div>
                        <hr style={{marginTop:  1+'rem', marginBottom: 1+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
                        <div className='post-box-buttons'>
                            <div class='boxBtn pointer'>
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
                    {allPosts.map(post =>(
                        <div className='post-box containers'>
                            asdf
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Posts
