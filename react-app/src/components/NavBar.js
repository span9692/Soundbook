import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/user';
import Search from '../components/Search/index'
import './navbar.css'
import VideoModalNav from './VideoModal/vidmodalnav';

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const userId = user.id

  useEffect(()=> {
    dispatch(getUsers)
}, [dispatch])

  return (
    <>
      <div className='nav-container'>
        <div className='nav-left'>
          <Link className='fontAwesomeness1' to='/feed'><img className='soundbook-logo' src='https://res.cloudinary.com/photofinder/image/upload/v1640731628/Untitled_dsneot.png'></img></Link>
          <div>
            <Search />
          </div>
        </div>
        <div className='nav-mid'>
          <Link className='fontAwesomeness' to={`/users/${userId}`}><i class="fas fa-home"></i></Link>
          <VideoModalNav />
          <a className='fontAwesomeness' href="https://github.com/span9692" target="_blank"><i class="fab fa-github"></i></a>
          <a className='fontAwesomeness' href="https://www.linkedin.com/in/sean-pan-395a4593/" target="_blank"><i class="fab fa-linkedin"></i></a>
          <a className='fontAwesomeness' href="https://www.google.com/" target="_blank"><i class="fas fa-address-card"></i></a>
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
