import './posts.css'

function Posts({profile_owner}) {
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
                    </div>

                    <div className='photos-container containers'>
                        <span className='profile-labels profile-nav-links profile-text'>Friends</span>
                    </div>

                </div>
                <div className='post-content'>
                    asdfsdf
                </div>
            </div>
        </>
    )
}

export default Posts
