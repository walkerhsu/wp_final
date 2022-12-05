import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {TextField, Box, Paper, Grid, Avatar, Button} from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import ValidTextField from '../components/ValidTextField';
// import InvalidTextField from '../components/InvalidTextField';

export default function ValidationTextFields() {

    const paperStyle={padding :20,height:'70vh',width:360, margin:"20px auto"}
    const avatarStyle = {backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [usernameMessage, setUsernameMessage] = useState('');

    const [password, setPassword] = useState('');
    const [passwordValid , setPasswordValid] = useState(true);
    const [passwordMessage , setPasswordMessage] = useState('');

    const [email, setEmail] = useState('');
    const [emailValid , setEmailValid] = useState(true);
    const [emailMessage , setEmailMessage] = useState('');

    const navigate = useNavigate();

    const checkUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
        if (username.length < 5) {
            setUsernameValid(false);
            setUsernameMessage('Username must be at least 5 characters long');
        } 
        else if (username.length > 20) {
            setUsernameValid(false);
            setUsernameMessage('Username must be less than 20 characters long');
        }
        else {
            setUsernameValid(true);
            setUsernameMessage('');
        }
    }

    const checkPassword = (event) => {
        const password = event.target.value;
        setPassword(password);
        if(event.target.value.length < 8) {
            setPasswordValid(false);
            setPasswordMessage('Password must be at least 8 characters');
        }
        else if(event.target.value.length > 20) {
            setPasswordValid(false);
            setPasswordMessage('Password must be less than 20 characters');
        }
        else if(event.target.value.search(/[a-z]/i) < 0) {
            setPasswordValid(false);
            setPasswordMessage('Password must contain at least one letter.');
        }
        else if(event.target.value.search(/[0-9]/) < 0) {
            setPasswordValid(false);
            setPasswordMessage('Password must contain at least one digit.');
        }
        else {
            setPasswordValid(true);
            setPasswordMessage('');
        }
    }

    const checkEmail = (event) => {
        const email = event.target.value;
        setEmail(email);
        if (email.length < 5) {
            setEmailValid(false);
            setEmailMessage('Email must be at least 5 characters long');
        }
        else if(email.search(/@/) < 0) {
            setEmailValid(false);
            setEmailMessage('Email must contain @');
        }

        else if(email.search(/\.com/) < 0) {
            setEmailValid(false);
            setEmailMessage('Email must contain .com');
        }
        // the last '.com' appears before '@'
        else if(email.search(/\.com/) < email.search(/@/)) {
            setEmailValid(false);
            setEmailMessage('Email must contain .com after @');
        }
        else {
            setEmailValid(true);
            setEmailMessage('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (usernameValid && passwordValid && emailValid && username && password && email) {
            alert('Form submitted');
            navigate('../signin');
        }
        else {
            alert('Form not submitted');
        }
    }
    return (
        <Box component="form" 
            sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
            noValidate
            // autoComplete="off"
        >
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <Grid>
                    {usernameValid?
                    <TextField required id="outlined-required-username" label="Username" variant="outlined"
                            type="text" placeholder="Username" onChange={checkUsername} fullWidth/>
                    :<TextField error id="outlined-error-username" label="Username" variant="outlined"
                            type="text" helperText={usernameMessage} onChange={checkUsername} fullWidth/>
                        // <ValidTextField label="username" onChange={checkUsername} />
                        // : <InvalidTextField label="username" onChange={checkUsername} helperText={usernameMessage} />
                    }
                    {passwordValid?
                        <TextField required id="outlined-required-password" label="password" variant="outlined"
                                type="password" placeholder="password" autoComplete="current-password" onChange={checkPassword} fullWidth/>
                        :<TextField error id="outlined-error-password" label="password" variant="outlined"
                                type="password" placeholder="password" helperText={passwordMessage} onChange={checkPassword} fullWidth/>
                    }
                    {emailValid?
                        <TextField required id="outlined-required-email" label="email" variant="outlined"
                                placeholder="email" onChange={checkEmail} fullWidth/>
                        :<TextField error id="outlined-error-email" label="email" variant="outlined"
                                placeholder="email" helperText={emailMessage} onChange={checkEmail} fullWidth/>
                    }
                </Grid>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSubmit} fullWidth>Sign in</Button>
            </Paper>
        </Box>
    );
}