import React, { useState, useEffect } from "react";

import { styled } from "@mui/system";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Paper, Grid, Avatar, Button } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAccount } from "../../hooks/useAccount";
import { UPDATE_USER_MUTATION } from "../../../graphql";
import generateSalt from "../../../utils/generateSalt";


const TextFieldWrapper = styled("div")({
  margin: "8px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "50%",
});

const paperStyle = {
  padding: 20,
  height: 510,
  width: 360,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

const SettingsPage = () => {
  const {
    me,
    password,
    passwordMessage,
    passwordConfirm,
    passwordConfirmMessage,
    email,
    resetSignInData,
    checkPassword,
    checkPasswordConfirm
  } = useAccount();

  const [curpassword, setCurPassword] = useState('')

  const curpasswordPointer = useRef(null);
  const newpasswordPointer = useRef(null);
  const passwordConfirmPointer = useRef(null);

  const [updateUser, { data: updateMessage }] =
    useMutation(UPDATE_USER_MUTATION);

  const navigate = useNavigate();

  const onKeyPress = (field) => (event) => {
    if (event.key === "Enter") {
      if (field === "curpassword") {
        newpasswordPointer.current.focus();
      } else if (field === "newpassword") {
        passwordConfirmPointer.current.focus();
      } else if (field === "passwordconfirm") {
        handleSubmit(event);
      }
    }
  };

  const checkCurPassword = (event) => {
    setCurPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      passwordMessage ||
      passwordConfirmMessage ||
      !password ||
      !passwordConfirm
    ) {
      if (!password || passwordMessage) {
        alert("Please enter your password correctly");
        newpasswordPointer.current.focus();
      } else if (!passwordConfirm || passwordConfirmMessage) {
        alert("Please enter same password");
        passwordConfirmPointer.current.focus();
      }
      return;
    }
    console.log("Updating a new user...")
    console.log(me, password, email)
    // 1. Create a new user in the database
    updateUser({
      variables: {
        input: {
          salt: generateSalt(4),
          username: me,
          curpassword: curpassword,
          password: password,
          email: email,
        },
      },
    });
    // 2. If the backend returns a success message, then navigate to the signin page
    //    If the backend returns a failure message, then display an alert
    
  };
  useEffect(() => {
    if(!updateMessage) return;
    alert(updateMessage.updateUser);
    if (updateMessage.updateUser === "User password updated") {
      navigate("/signin");
      resetSignInData();
    } else{
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
          <h2>Settings</h2>
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
            inputRef={newpasswordPointer}
            required
            id="outlined-required-password"
            label="new password"
            variant="outlined"
            value={password}
            type="password"
            error={passwordMessage !== ""}
            helperText={passwordMessage}
            fullWidth
            placeholder="new password"
            onChange={checkPassword}
            onKeyPress={onKeyPress("newpassword")}
          />

          <TextField
            inputRef={passwordConfirmPointer}
            required
            id="outlined-required-password-confirm"
            label="password-confirm"
            variant="outlined"
            value={passwordConfirm}
            type="password"
            error={passwordConfirmMessage !== ""}
            helperText={passwordConfirmMessage}
            fullWidth
            placeholder="password-confirm"
            onChange={checkPasswordConfirm}
            onKeyPress={onKeyPress("passwordconfirm")}
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
export default SettingsPage;