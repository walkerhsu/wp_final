import React, { useState, useEffect } from "react";

import { styled } from "@mui/system";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { TextField, Box, Paper, Grid, Avatar, Button } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAccount } from "../containers/hooks/useAccount";
import { UPDATE_USER_MUTATION } from "../graphql";

const TextFieldWrapper = styled("div")({
  margin: "8px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "45%",
});

const paperStyle = {
  borderRadius: "50px",
  backgroundColor: "#fafada",
  padding: 20,
  height: 620,
  width: 460,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

const ChangeEmail = () => {
  const {
    me,
    password,
    email,
    emailMessage,

    resetSignInData,
    checkEmail,
    setAlertData,
  } = useAccount();

  const [curpassword, setCurPassword] = useState("");

  const curpasswordPointer = useRef(null);
  const emailPointer = useRef(null);

  const [updateUser, { data: updateMessage }] =
    useMutation(UPDATE_USER_MUTATION);

  const onKeyPress = (field) => (event) => {
    if (event.key === "Enter") {
      if (field === "curpassword") {
        emailPointer.current.focus();
      } else if (field === "email") {
        handleSubmit(event);
      }
    }
  };

  const checkCurPassword = (event) => {
    setCurPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!curpassword || !email || emailMessage) {
      if (!curpassword) {
        setAlertData("Please enter your password correctly", "error");
        // alert("Please enter your password correctly");
        curpasswordPointer.current.focus();
      } else if (!email || emailMessage) {
        alert("Please enter your email correctly");
        emailPointer.current.focus();
      }
      return;
    }
    console.log("Updating a new user...");
    console.log(me, password, email);
    // 1. Create a new user in the database
    updateUser({
      variables: {
        input: {
          type: "email",
          username: me,
          curpassword: curpassword,
          email: email,
        },
      },
    });
    // 2. If the backend returns a success message, then navigate to the signin page
    //    If the backend returns a failure message, then display an alert
  };
  useEffect(() => {
    if (!updateMessage) return;
    if (updateMessage.updateUser === "User email updated") {
      setAlertData("User email updated", "success");
      resetSignInData();
    } else {
      setAlertData(updateMessage.updateUser, "error");
      curpasswordPointer.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMessage]);
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
      }}
      noValidate
      // autoComplete="off"
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AccountCircleIcon />
          </Avatar>
          <br />
          <h2>Change Email</h2>
        </Grid>
        <br />
        <TextFieldWrapper>
          <TextField
            inputRef={curpasswordPointer}
            required
            id="outlined-required-current-password"
            label="current password"
            variant="outlined"
            value={curpassword}
            type="password"
            fullWidth
            placeholder="current password"
            onChange={checkCurPassword}
            onKeyPress={onKeyPress("curpassword")}
          />
          <TextField
            inputRef={emailPointer}
            required
            id="outlined-required-email"
            label="email"
            variant="outlined"
            value={email}
            fullWidth
            placeholder="email"
            onChange={checkEmail}
            onKeyPress={onKeyPress("email")}
            error={emailMessage ? true : false}
            helperText={emailMessage}
          />
        </TextFieldWrapper>
        <Button
          color="primary"
          variant="contained"
          style={btnstyle}
          onClick={handleSubmit}
          fullWidth
        >
          Confirm
        </Button>
      </Paper>
    </Box>
  );
};
export default ChangeEmail;
