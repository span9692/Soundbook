import EditIntroModal from '../EditIntroModal'
import './about.css'

function About({loggedUser, profile_owner}) {
    return (
        <>
            <div className='about-box'>
                <span className='about-text'>About</span>
                <div className='category-row icon about-spacing'>
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
                <div className='category-row icon about-spacing'>
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
                <div className='category-row icon about-spacing'>
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
                <div className='category-row icon about-spacing'>
                    <div className='icon-row'>
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div className='info'>
                        <span className='row-Data'>Email: <span className='profile-owner-info'>{profile_owner?.email}</span></span>
                    </div>
                </div>
                <div className='category-row icon about-spacing'>
                    <div className='icon-row'>
                        <i class="fas fa-venus-mars"></i>
                    </div>
                    <div className='info'>
                        <span className='row-Data'>Gender: <span className='profile-owner-info'>{profile_owner?.gender}</span></span>
                    </div>
                </div>
                <div className='category-row icon about-spacing'>
                    <div className='icon-row'>
                        <i className="fas fa-birthday-cake"></i>
                    </div>
                    <div className='info'>
                        <span className='row-Data'>Born on <span className='profile-owner-info'>{profile_owner?.birthday}</span></span>
                    </div>
                </div>
                <div className='category-row icon about-spacing'>
                    <div className='icon-row'>
                        <i className="fas fa-tag"></i>
                    </div>
                    <div className='info'>
                        <span className='row-Data'>Joined in <span className='profile-owner-info'>{profile_owner?.createdAt}</span></span>
                    </div>
                </div>
                <EditIntroModal loggedUser={loggedUser}/>
                {/* <button className='profile-nav-links1 edit-profileBtn1 spacing-button'><i class="fas fa-pencil-alt"></i>&nbsp; Edit Profile</button> */}
            </div>
        </>
    )
}

export default About
