import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './navbar.css'

const NavBar = () => {
  return (
    <>
      <div className='nav-container'>
        <div className='nav-left'>

        </div>
        <div className='nav-mid'>

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
