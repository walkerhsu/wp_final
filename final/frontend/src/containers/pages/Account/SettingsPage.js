import React from "react";
import { useState } from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import PersonalAccount from "../../../components/PersonalAccount";
import ChangeName from "../../../components/ChangeName";
import ChangePassword from "../../../components/ChangePassword";
import ChangeHint from "../../../components/ChangeHint";
import ChangeEmail from "../../../components/ChangeEmail";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@material-ui/core";

import "../../../css/Settings.css"

const paperStyle = {
  borderRadius: "50px",
  backgroundColor: "#fff9e2",
  // backgroundImage: "url(../../../images/settings.jpeg)",
  padding: 20,
  height: "80vh",
  width: "90vw",
  margin: "20px auto",
};

const outerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};

const leftGrid = {
  borderRadius: "40px",
  width: "40%",
  height: "100%",
  padding: "20px",
  // backgroundColor: "#fafada",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
};

const leftUpStyle = {
  width: "100%",
  height: "30%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};

const leftUpRightStyle = {
  width: "60%",
  height: "100%",
  position: "relative",
  // right: "0%",
  // transform: "translate(-20%, 5%)",
};

const leftDownStyle = {
  width: "100%",
  height: "60%",
};

const rightGrid = {
  borderRadius: "40px",
  width: "40%",
  height: "100%",
  padding: "20px",
  // backgroundColor: "#fafada",
};

const SettingsPage = () => {
  const [Page, setPage] = useState("");
  const handleOnClick = (page) => {
    console.log(page);
    setPage(page);
  };
  return (
    <Paper style={paperStyle}>
      <Grid style={outerStyle}>
        <Grid style={leftGrid}>
          <Grid style={leftUpStyle}>
            <AccountCircleIcon sx={{ fontSize: "150px" }} />
            <Grid >
              <Grid style={leftUpRightStyle}>
                <Typography variant="h4" >Your Account</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={leftDownStyle}>
            <PersonalAccount handleOnClick={handleOnClick} />
          </Grid>
        </Grid>
        <Grid style={rightGrid}>
          {Page === "ChangeName" ? <ChangeName /> : null}
          {Page === "ChangePassword" ? <ChangePassword /> : null}
          {Page === "ChangeHint" ? <ChangeHint /> : null}
          {Page === "ChangeEmail" ? <ChangeEmail /> : null}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default SettingsPage;
