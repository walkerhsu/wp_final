import { useNavigate } from "react-router-dom";
import {Button, } from "@material-ui/core"; 
import '../css/MainPage.css'
// import LoginIcon from '@mui/icons-material/Login';

const MainPage = () => {
    // const avatarStyle={backgroundColor:'#1bbd7e'}
    const navigate = useNavigate();
    const navigateToSignIn = () => {
        navigate("/signin");
    };
    const navigateToSignUp = () => {
        navigate("/signup");
    };
    return (
        <div className = 'MainPageWrapper'>
            <div class="bg-image"/>
            <div className = "LogoWrapper">
                <h1>Main Page</h1>
                <div class="wave one"></div>
                <div class="wave two"></div>
                <div class="wave three"></div>
            </div>
            <div className = "ButtonWrapper">
                <h1>Login to Your Account</h1>
                <br/>
                <br/>
                <Button variant="contained" color="primary" onClick={navigateToSignUp}>Signup</Button>
                <br/>
                <Button variant="contained" color="primary" onClick={navigateToSignIn}>Signin</Button>   
            </div>
        </div>
    )
}
export default MainPage;