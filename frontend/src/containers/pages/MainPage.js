import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

import AboutUsDrawer from "../../components/AboutUsDrawer";
import AlertMessage from "../../components/AlertMessage";
import { useAccount } from "../hooks/useAccount";

import "../../css/MainPage.css";

const MainPage = () => {
  const { alertMessage, alertSeverity, alertOpen, handleAlertClose } =
    useAccount();
  const navigate = useNavigate();
  const navigateToSignIn = () => {
    navigate("/signin");
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };
  return (
    <>
      <AlertMessage
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        handleClose={handleAlertClose}
      />
      <div className="MainPageWrapper">
        <div className="bg-image" />
        <div className="LogoWrapper">
          <div className="Logo">
            <h1>Main Page</h1>
            <div className="wave one"></div>
            <div className="wave two"></div>
            <div className="wave three"></div>
            <AboutUsDrawer className="drawer" />
          </div>
        </div>
        <div className="ButtonWrapper">
          <h1>Login to Your Account</h1>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToSignUp}
          >
            Signup
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToSignIn}
          >
            Signin
          </Button>
        </div>
      </div>
    </>
  );
};
export default MainPage;
