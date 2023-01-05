import React from "react";
import { styled } from "@mui/system";
import { Button } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../css/Title.css";



const YourAccount = styled(Button)({
  position: "absolute",
  borderRadius: "8px",
  left: "0",
  transform: "translate(50%,0%)",
  backgroundColor: "#1bbd7e",
  color: "white",
  "&:hover": {
    backgroundColor: "#1bbd7e",
  },
});

const Title = ({ name, navigateToMainPage }) => {
  return (
    
    <div className="AccountHeader">
      <YourAccount
        variant="contained"
        color="primary"
        onClick={navigateToMainPage}
      >
        <AccountCircleIcon />
      </YourAccount>
    </div>
  );
};

export default Title;
