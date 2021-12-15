import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css'

const NavBar = () => {
  return (
    <>
      <div className='nav-container'>
        <div className='nav-left'>
          <Link to='/feed'>Feed</Link>
          Search bar
        </div>
        <div className='nav-mid'>
          <Link to='/users'>Profile</Link>
          Video
          Github
          LinkedIn
          Personal Website
        </div>
        <div className='nav-right'>
          <NavLink to='/users/:userId' exact={true} activeClassName='active'>
            Profile
          </NavLink>

          <LogoutButton />
        </div>
      </div>
    </>
  );
}

export default NavBar;
