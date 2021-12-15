import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './loginform.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState([])
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validate = () => {
    const validateErrors = [];
    if (
      !email ||
      !email
      .toLocaleLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) validateErrors.push("Please enter a valid e-mail")

    if (!password) validateErrors.push('Please enter a valid password')

    return validateErrors
  }

  const demoLogin = () => {
    dispatch(login('demo@aa.io', 'password'))
  }

  const onLogin = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (errors.length > 0) return setValidationErrors(errors);

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form onSubmit={onLogin} className='login-form'>
      {validationErrors.length > 0 && (
      <div>
        <ul>
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
      )}
      <div>
        {errors.map((error) => (
          <div key={error}>
            {error.includes('password')
              ? null
              : error.includes('email')
              ? 'Invalid login. Please recheck email/password'
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
          required="true"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='loginpadding'>
        <input
          className='loginField fieldSizing form-font'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          required="true"
          onChange={updatePassword}
        />
      </div>
      <div className='loginpadding'>
        <button type='submit' className='form-font splashBtn pointer fieldSizing'>Log In</button>
      </div>
      <div className='loginpadding' id='demoBtn'>
        <button type='button' onClick={() => demoLogin()} className='form-font splashBtn pointer fieldSizing'>Demo Login</button>
      </div>
      <hr style={{marginTop:  1+'rem', marginBottom: 1+'rem'}} size='1' width='100%' color='#dddfe2'></hr>
      <div>
        <button type='button' className='form-font newAccBtn pointer fieldSizing'>Create new account</button>
      </div>
    </form>
  );
};

export default LoginForm;
