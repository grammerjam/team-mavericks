<<<<<<< HEAD
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
=======
import { useState } from 'react';
import { Link } from "react-router-dom";
import {Button, TextField, FormControl, Container, ThemeProvider, Typography} from '@mui/material';
import logo from "../../assets/logo.svg";
import theme from "../Theme.styles";

function Register() {

	const [inputData, setInputData] = useState({
		email: '',
		password: '',
		confirmPass: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(`inside handleChange. name: ${name}, value: ${value}`);
		setInputData({
			...inputData,
			[name]: value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("handleSubmit clicked");
	}

	return (
	    <div>
	    	<ThemeProvider theme={theme}>
		    	<div className="logo-container">
		    		<img src={logo} alt="logo img"/>
		    	</div>
		    	<Container maxWidth="sm">
			    	<form onSubmit={handleSubmit}>
			    		<Typography variant="h2">Sign Up</Typography>
			    		<TextField
			    			label="Email address"
			    			required
			    			variant="standard"
			    			sx={{mb: 3}}
			    			color="secondary"
			    			type="email"
			    			fullWidth
			    			name="email"
			    			value={inputData.email}
			    			onChange={handleChange}
			    		/>
			    		<TextField
			    			label="Password"
			    			required
			    			variant="standard"
			    			color="secondary"
			    			type="password"
			    			sx={{mb: 3}}
			    			fullWidth
			    			name="password"
			    			value={inputData.password}
			    			onChange={handleChange}
			    		/>
			    		<TextField
			    			label="Confirm password"
			    			required
			    			variant="standard"
			    			color="secondary"
			    			type="password"
			    			sx={{mb: 3}}
			    			fullWidth
			    			name="confirmPass"
			    			value={inputData.confirmPass}
			    			onChange={handleChange}
			    		/>
			    		<Button variant="contained" fullWidth >Login to your account</Button>
			    	</form>
			    	<div className="redirect-link">
			    		<small>Already have an account? <Link to="/login" className="link-font">Login</Link></small>
			    	</div>
		    	</Container>
	    	</ThemeProvider>
	    </div>
	  );
	}
>>>>>>> 38ab0f68d0a346700852df452d1b265048e710a3

export default Register;