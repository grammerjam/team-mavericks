import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Button, TextField, FormControl, Container, ThemeProvider, Typography} from '@mui/material';
import logo from "../../assets/logo.svg";
import theme from "../../Theme.styles";
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

	const userExists = async (email) => {
		try{
			const user = await axios.get(`${apiUrl}/user/getUserByEmail/${email}`);
			if(user.data.id){
				return true;
			}

		} catch(err) {
			console.log(err);
			return false;
		}

	}

	//Error validation function
	const validateInput = async (data) => {
		let inputErrors = {};

		//Function checks if user email already exists
		const emailExists = await userExists(data.email)

		if(data.confirmPass !== data.password){
			inputErrors.confirmPass = 'No match!';
		}
		if(emailExists){
			inputErrors.email = "Email already exists"
		}

		if(data.password.length < 8){
			inputErrors.password = "Password is too short. At least 8 characters"
		}

		return inputErrors;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = await validateInput(inputData)
		
		if(Object.keys(validationErrors).length === 0){
			const { email, password } = inputData;

			try{
				const result = await axios.post(`${apiUrl}/user/register`, { email, password });
				navigate('/');
			} catch (err) {
				console.log(err.response);
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
			    			error={errors.email ? true : false}
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
			    			error={errors.password ? true : false}
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
			    		{ errors.password && <Typography color="error" variant="span">{errors.password}</Typography>}
			    		<TextField
			    			label={"Confirm password"}
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
			    		{ errors.confirmPass && <Typography color="error" variant="span">{errors.confirmPass}</Typography>}
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