import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/user';
import Search from '../components/Search/index'
import './navbar.css'
import VideoModalNav from './VideoModal/vidmodalnav';

const NavBar = ({searchParams, setSearchParams}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const userId = user.id

  useEffect(()=> {
    dispatch(getUsers)
}, [dispatch])

  return (
    <>
      <div onClick={()=>setSearchParams('')} className='nav-container'>
        <div className='nav-left'>
          <Link className='fontAwesomeness1' to='/feed'><img className='soundbook-logo' src='https://res.cloudinary.com/photofinder/image/upload/v1640842211/soundbookLogo_a0qvza.png'></img></Link>
          <div>
            <Search searchParams={searchParams} setSearchParams={setSearchParams}/>
          </div>
        </div>
        <div className='nav-mid'>
          <Link className='fontAwesomeness' to={`/feed`}><i class="fas fa-home"></i></Link>
          <VideoModalNav />
          <a className='fontAwesomeness' href="https://github.com/span9692" target="_blank"><i class="fab fa-github"></i></a>
          <a className='fontAwesomeness' href="https://www.linkedin.com/in/sean-pan-395a4593/" target="_blank"><i class="fab fa-linkedin"></i></a>
          <a className='fontAwesomeness' href="https://span9692.github.io/" target="_blank"><i class="fas fa-address-card"></i></a>
        </div>
        <div className='nav-right'>
          <Link className='firstName-profile-nav' to={`/users/${userId}`} exact={true}>
            <div className='navbar-profile-container'>
              <img className='navbar-profile-pic dim' src={user.profile_pic}></img>
              <span className='name-color'>{user?.alias ? user?.alias : user?.first_name}</span>
            </div>
          </Link>

          <LogoutButton />
        </div>
      </div>
    </>
  );
}

export default NavBar;
