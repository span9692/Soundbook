import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/user';
import './navbar.css'

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
          <Link className='fontAwesomeness1' to='/feed'><i class="fab fa-facebook"></i></Link>
          <div>
            Search bar
          </div>
        </div>
        <div className='nav-mid'>
          <Link className='fontAwesomeness' to={`/users/${userId}`}><i class="fas fa-home"></i></Link>
          <a className='fontAwesomeness' href="https://www.google.com/"><i class="fas fa-video"></i></a>
          <a className='fontAwesomeness' href="https://github.com/span9692"><i class="fab fa-github"></i></a>
          <a className='fontAwesomeness' href="https://www.linkedin.com/in/sean-pan-395a4593/"><i class="fab fa-linkedin"></i></a>
          <a className='fontAwesomeness' href="https://www.google.com/"><i class="fas fa-address-card"></i></a>
        </div>
        <div className='nav-right'>
          <Link className='firstName-profile-nav' to={`/users/${userId}`} exact={true}>
            <div className='navbar-profile-container'>
              <img className='navbar-profile-pic' src={user.profile_pic}></img>
              <span className='name-color'>{user.first_name}</span>
            </div>
          </Link>

          <LogoutButton />
        </div>
      </div>
    </>
  );
}

export default NavBar;
