import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  if (user) {
    return <Redirect to='/feed' />;
  }

  const daysArr = []
  for (let i = 1; i <= 31; i++) {
    daysArr.push(i)
  }

  const yearsArr = [];
  const currentYear = 2022;
  for (let i = currentYear; i >= currentYear - 100; i--) {
    yearsArr.push(i)
  }

  return (
    <form onSubmit={onSignUp}>
      <span>Sign Up</span>
      <div>It's quick and easy.</div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='signup-field-containers'>
        <input
          type='text'
          className='signup-field field-size signup-font'
          name='firstName'
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <input
          type='password'
          name='repeat_password'
          placeholder='Confirm Password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Birthday</label>
        <select
          name='month'
          onChange={(e) => setMonth(e.target.value)}
          value = {month}
          required={true}
        >
          <option value='' disabled>Month</option>
          <option value='Jan'>Jan</option>
          <option value='Feb'>Feb</option>
          <option value='Mar'>Mar</option>
          <option value='Apr'>Apr</option>
          <option value='May'>May</option>
          <option value='Jun'>Jun</option>
          <option value='Jul'>Jul</option>
          <option value='Aug'>Aug</option>
          <option value='Sep'>Sep</option>
          <option value='Oct'>Oct</option>
          <option value='Nov'>Nov</option>
          <option value='Dec'>Dec</option>
        </select>
      </div>
      <div>
        <select
          name='day'
          onChange={(e) => setDay(e.target.value)}
          value = {day}
          required={true}
        >
          <option value='' disabled>Day</option>
          {daysArr.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          name='year'
          onChange={(e) => setYear(e.target.value)}
          value = {year}
          required={true}
        >
          <option value='' disabled>Year</option>
          {yearsArr.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Gender</label>
        <input type='radio' id='male' name='gender' value='Male'></input>
        <label for='male'>Male</label>
        <input type='radio' id='female' name='gender' value='Female'></input>
        <label for='female'>Female</label>
        <input type='radio' id='other' name='gender' value='Other'></input>
        <label for='other'>Other</label>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
