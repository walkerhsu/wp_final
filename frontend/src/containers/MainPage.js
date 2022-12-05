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
            <div className = "bg-image"/>
            <div className = "MainPage">
                <h1>Main Page</h1>
                <Button variant="contained" color="primary" onClick={navigateToSignUp}>Signup</Button>
                <br></br>
                <br></br>
                <Button variant="contained" color="primary" onClick={navigateToSignIn}>Signin</Button>   
            </div>
            
        </div>
    )
}
export default MainPage;