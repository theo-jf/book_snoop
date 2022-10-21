import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [zipCode, setZipCode] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      dispatch({
        type: 'SET_SNACKBAR',
        payload: {
            isOpen: true,
            severity: 'error',
            message: "Passwords don't match"
        }
      });
    } else if (password === confirmPassword) {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
        },
      });
    }

  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="zip">
          Zip code (optional):
          <input
            type="text"
            name="zip"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div>
          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>
        </div>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
