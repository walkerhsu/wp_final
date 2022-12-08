import React from 'react';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import {TextField, Box, Paper, Grid, Avatar, Button} from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useAccount } from "../hooks/useAccount";

const paperStyle={padding :20,height:'70vh',width:360, margin:"20px auto"}
const avatarStyle = {backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}

const SignUpPage = () => {
    const {username, usernameMessage, password, passwordMessage, email, emailMessage,
            resetSignInData, checkUsername, checkPassword, checkEmail} = useAccount();
    const usernamePointer = useRef(null);
    const passwordPointer = useRef(null);
    const emailPointer = useRef(null);
    const navigate = useNavigate();

    const onKeyPress = (field) => (event) => {
        if (event.key === 'Enter') {
            if (field === 'username') {
                passwordPointer.current.focus();
            }
            else if (field === 'password') {
                emailPointer.current.focus();
            }
            else if (field === 'email') {
                handleSubmit(event);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!usernameMessage && !passwordMessage &&!emailMessage && username && password && email) {
            alert('Form submitted');
            navigate('../signin');
            resetSignInData();
        }
        else {
            alert('Form not submitted');
            usernamePointer.current.focus();
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
                    <br />
                    <h2>Sign Up</h2>
                </Grid>
                <br />
                <Grid>
                    <TextField inputRef={usernamePointer} required id="outlined-required-username" label="Username" variant="outlined" value={username}
                            type="text" error={usernameMessage !== ""} helperText={usernameMessage} fullWidth
                            placeholder="Username" onChange={checkUsername} onKeyPress={onKeyPress('username')} />
                    
                    <TextField inputRef={passwordPointer} required id="outlined-required-password" label="password" variant="outlined" value={password}
                            type="password" error={passwordMessage !== ""} helperText={passwordMessage} fullWidth
                            placeholder="password" autoComplete="current-password" onChange={checkPassword} onKeyPress={onKeyPress('password')} />
                    
                
                    <TextField inputRef={emailPointer} required id="outlined-required-email" label="email" variant="outlined" value={email}
                            error={emailMessage !== ""} helperText={emailMessage} fullWidth
                            placeholder="email" onChange={checkEmail} onKeyPress={onKeyPress('email')} />
                        
                </Grid>
                <Button color='primary' variant="contained" style={btnstyle} onClick={handleSubmit} fullWidth>Sign in</Button>
            </Paper>
        </Box>
    );
}
export default SignUpPage;