import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './signup.css'

const SignUpForm = () => {
  const [signupErrors, setSignupErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (password === repeatPassword) {
      const data = await dispatch(signUp({firstName, lastName, email, password, birthday:`${year}-${month}-${day}`, gender}));
      if (data) {
        setSignupErrors(data)
      }
    } else {
      const passError = [...signupErrors, 'Passwords must match.']
      setSignupErrors(passError)
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
    <form onSubmit={onSignUp} className='signup-form'>
      <span className='signup-text'>Sign Up</span>
      <div>It's quick and easy.</div>
      <hr style={{marginTop: 1+'rem', marginBottom: 1+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
      <div>
        {signupErrors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='signup-name-field'>
        <div className='first-name-field'>
          <input
            type='text'
            className='signup-field field-size signup-font'
            name='firstName'
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required={true}
          ></input>
        </div>
        <div className='last-name-field'>
          <input
            type='text'
            className='signup-field field-size signup-font'
            name='lastName'
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required={true}
          ></input>
        </div>
      </div>
      <div className='email-field'>
        <input
          type='text'
          className='signup-field field-size signup-font'
          name='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required={true}
        ></input>
      </div>
      <div className='password-field'>
        <input
          type='password'
          className='signup-field field-size signup-font'
          name='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required={true}
        ></input>
      </div>
      <div className='password-field'>
        <input
          type='password'
          className='signup-field field-size signup-font'
          name='repeat_password'
          placeholder='Confirm Password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <label>Birthday</label>
      <div className='signup-birthday-field'>
        <div className='month-field'>
          <select
            name='month'
            className='signup-field birthday-field'
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
        <div className='day-field'>
          <select
            name='day'
            className='signup-field birthday-field'
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
        <div className='year-field'>
          <select
            name='year'
            className='signup-field birthday-field'
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
      </div>
      <label>Gender</label>
      <div className='gender-container'>
        <div className='signup-field gender-field gender-male'>
          <label for='male'>Male</label>
          <div className='radio-buttons'>
            <input onChange={(e) => setGender(e.target.value)} type='radio' id='male' name='gender' value='Male' required={true}></input>
          </div>
        </div>
        <div className='signup-field gender-field gender-female'>
          <label for='female'>Female</label>
          <div className='radio-buttons'>
            <input onChange={(e) => setGender(e.target.value)} type='radio' id='female' name='gender' value='Female'></input>
          </div>
        </div>
        <div className='signup-field gender-field gender-other'>
          <label for='other'>Other</label>
          <div className='radio-buttons'>
            <input onChange={(e) => setGender(e.target.value)} type='radio' id='other' name='gender' value='Other'></input>
          </div>
        </div>
      </div>
      <div className='test'>
        <button type='submit' className='signupBtn pointer'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
