import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Container, ThemeProvider, Typography } from '@mui/material';
import logo from "../../assets/logo.svg";
import theme from "../../Theme.styles";
import axios from "axios";
import { getApiUrl } from "../../services/ApiUrl";
import isEmail from "validator/lib/isEmail";
import { UserContext } from '../../context/User.context';

function Register() {
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
        confirmPass: ''
    });

	const [errors, setErrors] = useState({});
	const apiUrl = getApiUrl();
	const navigate = useNavigate();

	const { user, signUser} = useContext(UserContext);

	useEffect(() => {
		// If the user is set, go to the main page
		if (user)
		{
			navigate("/");
		}
	}, [user, navigate]);

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
	const validateInput = async (data) => {
		let inputErrors = {};

		if(data.email === ""){
			inputErrors.email = "Email can't be empty"
		}else if (!isEmail(data.email))
		{
			inputErrors.email = "Invalid Email";
		}
		
		if(data.confirmPass !== data.password){
			inputErrors.confirmPass = 'No match!';
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
		
		if(Object.keys(validationErrors).length === 0){
			const { email, password } = inputData;

			try{
				const result = await axios.post(`${apiUrl}/user/register`, { email, password });
				signUser(result.data);
				setErrors({});
			} catch (err) {
				setErrors({
					userExists: err.response.data.error
				});
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
		    	<Container>
			    	<form onSubmit={handleSubmit}>
			    		<Typography variant="h2">Sign Up</Typography>
			    		<TextField
			    			label="Email address"
			    			error={errors.all ? true : false}
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
						{ errors.userExists && <Typography color="error" variant="span">{errors.userExists}</Typography>}
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