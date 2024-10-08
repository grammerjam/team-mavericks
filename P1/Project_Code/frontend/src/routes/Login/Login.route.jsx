import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Button, TextField, Container, ThemeProvider, Typography} from '@mui/material';
import logo from "../../assets/logo.svg";
import theme from "../../Theme.styles";
import { getApiUrl } from "../../services/ApiUrl";
import isEmail from 'validator/lib/isEmail';
import axios from "axios";

import { UserContext } from '../../context/User.context';

function Login() {

	const [inputData, setInputData] = useState({
		email: "",
		password: ""
	});

	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const apiUrl = getApiUrl();

	const { user, signUser } = useContext(UserContext);

	useEffect(() => {
		// If the user is set, go to the main page
		if (user)
		{
			navigate("/");
		}
	}, [navigate, user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputData({
			...inputData,
			[name]: value
		});
		if(inputData.email === '' || inputData.password === ''){
			errors.all = null;
		}
	}

	//Error validation function
	const validateInput = async (data) => {
		let inputErrors = {};

		if (data.email === ""){
			inputErrors.email = "Email can't be empty";
		}else if (!isEmail(data.email))
		{
			inputErrors.email = "Invalid Email";
		}

		if(data.password === ""){
			inputErrors.password = "Password can't be empty"
		}else if(data.password.length < 8){
			inputErrors.password = "Password is too short. At least 8 characters"
		}
	
			return inputErrors;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = await validateInput(inputData);

		// Perform AJAX request if no validation errors are found
		if (Object.keys(validationErrors).length === 0)
		{
			const { email, password } = inputData;

			try{
				const result = await axios.post(`${apiUrl}/auth/login`, { email, password });
				if(result.data.id){
					signUser(result.data);
				}
			} catch(err){
				const { data } = err.response;
				 if(data.error == "User not found" || data.error === "Incorrect password"){
					 setErrors({
						all: "Wrong email or password"
					});
	
				 }
			}	
		}

		else
		{
			setErrors(validationErrors);
		}
		
	}

	return (
	    <div>
	    	<ThemeProvider theme={theme}>
		    	<div className="logo-container">
		    		<img src={logo} alt="logo img"/>
		    	</div>
		    	<Container>
			    	<form onSubmit={handleSubmit} noValidate>
			    		<Typography variant="h2">Login</Typography>
			    		<TextField
			    			label="Email address"
			    			error={errors.all ? true : false}
			    			required
			    			variant="standard"
			    			sx={{mb: 3}}
			    			color="white"
			    			type="email"
			    			fullWidth
			    			name="email"
			    			value={inputData.email}
			    			onChange={handleChange}
			    		/>
						{ errors.email && <Typography color="error" variant="span">{errors.email}</Typography>}
			    		<TextField
			    			label="Password"
			    			error={errors.all ? true : false}
			    			required
			    			variant="standard"
			    			color="white"
			    			type="password"
			    			sx={{mb: 3}}
			    			fullWidth
			    			name="password"
			    			value={inputData.password}
			    			onChange={handleChange}
			    		/>
						{ errors.password && <Typography color="error" variant="span">{errors.password}</Typography>}
			    		{ errors.all && <Typography color="error" variant="span">{errors.all}</Typography>}
			    		<Button type="submit" variant="contained" fullWidth >Login to your account</Button>
			    	</form>
			    	<div className="redirect-link">
			    		<small>Don't have an account? <Link to="/register" className="link-font">Sign Up</Link></small>
			    	</div>
		    	</Container>
	    	</ThemeProvider>
	    </div>
	  );
	}

export default Login;