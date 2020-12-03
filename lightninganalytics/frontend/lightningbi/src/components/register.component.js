import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const styles = {
  container: {
    width: "40%",
    margin: "0 auto",
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 500,
    },
  },
}));

function RegisterForm() {

  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState('');

  function handleChange(k, v) {
    if (k === 'userName') {
      setUsername(v)
      if (v.length < 3 || v.length > 20) {
        setUsernameError(true)
      } else {
        setUsernameError(false)
      }
    }
    else if (k === 'email') {
      setEmail(v)
      if (!isEmail(v)) {
        setEmailError(true)
      } else {
        setEmailError(false)
      }
    }
    else if (k === 'password') {
      setPassword(v)
      if (v.length < 6 || v.length > 40) {
        setPasswordError(true)
      } else {
        setPasswordError(false)
      }
    }
  }

  function handleSubmit() {
    if (usernameError || emailError || passwordError || email === '' || username === '' || password === '') {
      setSuccessful(false)
      setMessage('Please Properly Fill All Feilds !!!')
    } else {
      AuthService.register(
        username,
        email,
        password
      ).then(
        response => {
          if (response.error !== undefined) {
            setSuccessful(false)
            setMessage(response.error)
          }
          else if (response.success !== undefined) {
            setSuccessful(true)
            setMessage('User Created')
          }
        },
        error => {
          setSuccessful(false)
          setMessage('Web Site Error')
        }
      );
    }
  }

  return (
    <div>
      <div style={styles.container}>
        <h2 style={{ paddingBottom: "20px" }}>Register Page</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            {successful ? ' ' :
              < div className="alert alert-danger" role="alert">
                {message}
              </div>
            }
            <TextField
              error={usernameError}
              id="outlined-error-helper-text"
              label="UserName"
              placeholder="User Name"
              helperText={usernameError ? 'The username must be between 3 and 20 characters.' : ''}
              variant="outlined"
              onChange={(e) => { handleChange('userName', e.target.value) }}
            />
            <TextField
              error={emailError}
              id="outlined-error-helper-text"
              label="Email"
              placeholder="Email Id"
              helperText={emailError ? 'This is not a valid email.' : ''}
              type='email'
              variant="outlined"
              onChange={(e) => { handleChange('email', e.target.value) }}
            />
            <TextField
              error={passwordError}
              id="outlined-error-helper-text"
              label="password"
              placeholder="password"
              helperText={passwordError ? 'The password must be between 6 and 40 characters.' : ''}
              type='password'
              variant="outlined"
              onChange={(e) => { handleChange('password', e.target.value) }}
            />
            <Button variant="contained" color="primary"
              onClick={handleSubmit}>
              SIGN UP
            </Button>
          </div>
        </form>
      </div>
    </div >
  )
}

export default RegisterForm