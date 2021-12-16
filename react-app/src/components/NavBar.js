import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/user';
import './navbar.css'

const NavBar = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.session.user.id)

  useEffect(()=> {
    dispatch(getUsers)
}, [dispatch])

  return (
    <>
      <div className='nav-container'>
        <div className='nav-left'>
          <Link to='/feed'>Feed</Link>
          Search bar
        </div>
        <div className='nav-mid'>
          <Link className='fontAwesomeness' to={`/users/${userId}`}><i class="fas fa-home"></i></Link>
          <a className='fontAwesomeness' href="https://www.google.com/"><i class="fas fa-video"></i></a>
          <a className='fontAwesomeness' href="https://github.com/span9692"><i class="fab fa-github"></i></a>
          <a className='fontAwesomeness' href="https://www.linkedin.com/in/sean-pan-395a4593/"><i class="fab fa-linkedin"></i></a>
          <a className='fontAwesomeness' href="https://www.google.com/"><i class="fas fa-address-card"></i></a>
        </div>
        <div className='nav-right'>
          <NavLink to={`/users/${userId}`} exact={true} activeClassName='active'>
            Profile
          </NavLink>

          <LogoutButton />
        </div>
      </div>
    </>
  );
}

export default NavBar;
