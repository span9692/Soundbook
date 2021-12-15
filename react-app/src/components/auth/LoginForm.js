import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

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
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
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
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
