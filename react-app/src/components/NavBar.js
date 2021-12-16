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
          <Link to={`/users/${userId}`}>Profile</Link>
          Video
          Github
          LinkedIn
          Personal Website
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
