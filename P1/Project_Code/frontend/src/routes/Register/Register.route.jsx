import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Button, TextField, FormControl, Container, ThemeProvider, Typography} from '@mui/material';
import logo from "../../assets/logo.svg";
import theme from "../Theme.styles";
import axios from "axios";
import { getApiUrl } from "../../services/ApiUrl";

function Register() {

	const [inputData, setInputData] = useState({
		email: '',
		password: '',
		confirmPass: ''
	});

	const [errors, setErrors] = useState({});
	const apiUrl = getApiUrl();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputData({
			...inputData,
			[name]: value
		});
		if(inputData.email === ''){
			errors.email = null;
		}else if(inputData.password === ''){
			errors.password = null;
		}else if(inputData.confirmPass === ''){
			errors.confirmPass = null;
		}
	}

	//Error validation function
	const validateInput = (data) => {
		let inputErrors = {};

		if(data.confirmPass !== data.password){
			inputErrors.confirmPass = 'No match!';
		}

		return inputErrors;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validateInput(inputData)
		
		if(Object.keys(validationErrors).length === 0){
			const { email, password } = inputData;

			try{
				const result = await axios.post(`${apiUrl}/user/register`, { email, password });
				navigate('/');
			} catch (err) {
				console.log(err);
			}
		}else {
			setErrors(validationErrors);
		}
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
			    			color="white"
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
			    			type="password"
			    			sx={{mb: 3}}
			    			color="white"
			    			fullWidth
			    			name="password"
			    			value={inputData.password}
			    			onChange={handleChange}
			    		/>
			    		<TextField
			    			label={errors.confirmPass ? errors.confirmPass : "Confirm password"}
			    			error={errors.confirmPass ? true : false}
			    			required
			    			variant="standard"
			    			type="password"
			    			sx={{mb: 3}}
			    			color="white"
			    			fullWidth
			    			name="confirmPass"
			    			value={inputData.confirmPass}
			    			onChange={handleChange}
			    		/>
			    		<Button type="submit" variant="contained" fullWidth >Create an account</Button>
			    	</form>
			    	<div className="redirect-link">
			    		<small>Already have an account? <Link to="/login" className="link-font">Login</Link></small>
			    	</div>
		    	</Container>
	    	</ThemeProvider>
	    </div>
	  );
	}

export default Register;