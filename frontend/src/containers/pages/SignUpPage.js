import React from 'react';
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
    // const [username, setUsername] = useState('');
    // const [usernameMessage, setUsernameMessage] = useState('');

    // const [password, setPassword] = useState('');
    // const [passwordMessage , setPasswordMessage] = useState('');

    

    const navigate = useNavigate();

    // const checkUsername = (event) => {
    //     const username = event.target.value;
    //     setUsername(username);
    //     if (username.length < 5) {
    //         setUsernameMessage('Username must be at least 5 characters long');
    //     } 
    //     else if (username.length > 20) {
    //         setUsernameMessage('Username must be less than 20 characters long');
    //     }
    //     else {
    //         setUsernameMessage('');
    //     }
    // }

    // const checkPassword = (event) => {
    //     const password = event.target.value;
    //     setPassword(password);
    //     if(event.target.value.length < 8) {
    //         setPasswordMessage('Password must be at least 8 characters');
    //     }
    //     else if(event.target.value.length > 20) {
    //         setPasswordMessage('Password must be less than 20 characters');
    //     }
    //     else if(event.target.value.search(/[a-z]/i) < 0) {
    //         setPasswordMessage('Password must contain at least one letter.');
    //     }
    //     else if(event.target.value.search(/[0-9]/) < 0) {
    //         setPasswordMessage('Password must contain at least one digit.');
    //     }
    //     else {
    //         setPasswordMessage('');
    //     }
    // }

    

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!usernameMessage && !passwordMessage &&!emailMessage && username && password && email) {
            alert('Form submitted');
            navigate('../signin');
            resetSignInData();
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
                    <br />
                    <h2>Sign Up</h2>
                </Grid>
                <br />
                <Grid>
                    <TextField required id="outlined-required-username" label="Username" variant="outlined" value={username}
                            type="text" error={usernameMessage !== ""} helperText={usernameMessage} 
                            placeholder="Username" onChange={checkUsername} fullWidth/>
                    
                    <TextField required id="outlined-required-password" label="password" variant="outlined" value={password}
                            type="password" error={passwordMessage !== ""} helperText={passwordMessage}
                            placeholder="password" autoComplete="current-password" onChange={checkPassword} fullWidth/>
                    
                
                    <TextField required id="outlined-required-email" label="email" variant="outlined" value={email}
                            error={emailMessage !== ""} helperText={emailMessage}
                            placeholder="email" onChange={checkEmail} fullWidth/>
                        
                </Grid>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSubmit} fullWidth>Sign in</Button>
            </Paper>
        </Box>
    );
}
export default SignUpPage;