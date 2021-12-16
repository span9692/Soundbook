import './posts.css'

function Posts({profile_owner}) {
    return (
        <>
            <div className='post-container'>
                <div className='user-info'>
                    <div className='intro-container containers'>
                        <span>Intro</span>
                        <div><i class="fas fa-graduation-cap"></i>Education</div>
                        <div><i class="fas fa-briefcase"></i>Company</div>
                        <div><i class="fas fa-map-marker-alt"></i>Location</div>
                        <div><i class="fas fa-birthday-cake"></i>Birthday</div>
                        <div><i class="fas fa-tag"></i>Joined Year</div>
                    </div>
                    <div className='photos-container containers'>

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
