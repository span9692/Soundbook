import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import SignUpModal from './SignUpModal';
import './loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [validationErrors, setValidationErrors] = useState([])
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const demoLogin = () => {
    dispatch(login('ayoung@gmail.com', 'password'))
  }

  const onLogin = async (e) => {
    e.preventDefault();
    // let errors = validate();

    // if (errors.length > 0) return setValidationErrors(errors);

    const data = await dispatch(login(email, password));
    setErrors([])
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to='/feed' />;
  }

  return (
    <form onSubmit={onLogin} className='login-form'>
      {/* {validationErrors.length > 0 && (
      <div>
        <ul>
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
      )} */}
      <div>
        {errors.map((error) => (
          <div className='loginError' key={error}>
            {error.includes('password')
              ? null
              : error.includes('email')
              ? 'Invalid login. Please check email/password.'
              : error
            }
          </div>
        ))}
      </div>
      <div className='loginpadding'>
        <input
          className='loginField fieldSizing form-font'
          name='email'
          type='text'
          placeholder='Email'
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='loginpadding'>
        <input
          className='loginField fieldSizing form-font'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='loginpadding'>
        <button type='submit' className='form-font splashBtn pointer fieldSizing'>Log In</button>
      </div>
      <div className='loginpadding' id='demoBtn'>
        <button type='button' onClick={() => demoLogin()} className='form-font splashBtn pointer fieldSizing'>Demo Login</button>
      </div>
      <hr style={{marginTop: 1+'rem', marginBottom: 1+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
      <SignUpModal />

    </form>
  );
};

export default LoginForm;
