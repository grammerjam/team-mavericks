import { useState } from 'react';
import { Link } from "react-router-dom";
import {Button, TextField, FormControl, Container, ThemeProvider, Typography} from '@mui/material';
import logo from "../../assets/logo.svg";
import theme from "../Theme.styles";

function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
			    		<Typography variant="h2">Login</Typography>
			    		<TextField
			    			label="Email address"
			    			required
			    			variant="standard"
			    			sx={{mb: 3}}
			    			color="secondary"
			    			type="emial"
			    			fullWidth
			    			value={email}
			    		/>
			    		<TextField
			    			label="Password"
			    			required
			    			variant="standard"
			    			color="secondary"
			    			type="password"
			    			sx={{mb: 3}}
			    			fullWidth
			    			value={password}
			    		/>
			    		<Button variant="contained" fullWidth >Login to your account</Button>
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