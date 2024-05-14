import React, { useContext } from 'react';

import { Stack } from '@mui/material';

import "./Register.style.css";
import Logo from '../../components/Logo/Logo.component';

import { BackendURLContext } from '../../context/BackendURL.context';

function Register() {
  const registerURL = `${useContext(BackendURLContext)}/user/register`;

  return (
    <div className="page-container">
      <div className="page-wrapper register-page-wrapper">
        <Stack spacing={15} alignItems={"center"} pt={10}>
          <Logo/>
          <div className="register-form-container">
            <form action={registerURL} method="POST">
              <h1>Sign Up</h1>
            </form>
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default Register;