import React, { useEffect, useState } from "react";

import { styled } from "@mui/system";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Paper, Grid, Avatar, Button } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAccount } from "../../hooks/useAccount";
import { CREATE_USER_MUTATION } from "../../../graphql";
import generateSalt from "../../../utils/generateSalt";

import AlertMessage from "../../../components/AlertMessage";

const TextFieldWrapper = styled("div")({
  margin: "8px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "50%",
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

const SignUpPage = () => {
  const {
    hint,
    username,
    usernameMessage,
    password,
    passwordMessage,
    email,
    emailMessage,
    alertMessage,
    alertSeverity,
    alertOpen,

    resetSignInData,
    checkHint,
    checkUsername,
    checkPassword,
    checkEmail,
    setAlertData,
    handleAlertClose,
  } = useAccount();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

  const usernamePointer = useRef(null);
  const passwordPointer = useRef(null);
  const confirmPasswordPointer = useRef(null);
  const hintPointer = useRef(null);
  const emailPointer = useRef(null);

  const [createUser, { data: createMessage }] =
    useMutation(CREATE_USER_MUTATION);

  const navigate = useNavigate();

  const onKeyPress = (field) => (event) => {
    if (event.key === "Enter") {
      if (field === "username") {
        passwordPointer.current.focus();
      } else if (field === "password") {
        confirmPasswordPointer.current.focus();
      } else if (field === "confirm_password") {
        hintPointer.current.focus();
      } else if (field === "hint") {
        emailPointer.current.focus();
      } else if (field === "email") {
        handleSubmit(event);
      }
    }
  };

  const checkConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordMessage("Confirm password does not match");
    } else {
      setConfirmPasswordMessage("");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || usernameMessage) {
      // alert("Please enter your username correctly");
      setAlertData("Please enter your username correctly", "error");
      usernamePointer.current.focus();
      return;
    } else if (!password || passwordMessage) {
      // alert("Please enter your password correctly");
      setAlertData("Please enter your password correctly", "error");
      passwordPointer.current.focus();
      return;
    } else if (!confirmPassword || confirmPasswordMessage) {
      // alert(confirmPasswordMessage ? confirmPasswordMessage : "Please enter your confirm password");
      setAlertData("Please enter your confirm password correctly", "error");
      confirmPasswordPointer.current.focus();
      return;
    } else if (!hint) {
      setAlertData("Please enter your password hint", "error");
      hintPointer.current.focus();
      return;
    }  else if (!email || emailMessage) {
      // alert("Please enter your email correctly");
      setAlertData("Please enter your email correctly", "error");
      emailPointer.current.focus();
      return;
    }
    console.log("Creating a new user...");
    console.log(username, password, hint, email);
    // 1. Create a new user in the database
    createUser({
      variables: {
        input: {
          salt: generateSalt(4),
          username: username,
          password: password,
          hint: hint,
          email: email,
        },
      },
    });
    // 2. If the backend returns a success message, then navigate to the signin page
    //    If the backend returns a failure message, then display an alert
  };
  useEffect(() => {
    if (!createMessage) return;
    // alert(createMessage.createUser);
    if (createMessage.createUser === "User created") {
      setAlertData("User created", "success");
      navigate("/signin");
      resetSignInData();
    } else if (createMessage.createUser === "User already exists") {
      setAlertData("User already exists", "warning");
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMessage]);
  return (
    <>
      <AlertMessage
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        handleClose={handleAlertClose}
      />
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
            <h2>Sign Up</h2>
          </Grid>
          <br />
          <TextFieldWrapper>
            <TextField
              inputRef={usernamePointer}
              required
              id="outlined-required-username"
              label="Username"
              variant="outlined"
              value={username}
              type="text"
              error={usernameMessage !== ""}
              helperText={usernameMessage}
              fullWidth
              placeholder="Username"
              onChange={checkUsername}
              onKeyPress={onKeyPress("username")}
            />

            <TextField
              inputRef={passwordPointer}
              required
              id="outlined-required-password"
              label="password"
              variant="outlined"
              value={password}
              type="password"
              error={passwordMessage !== ""}
              helperText={passwordMessage}
              fullWidth
              placeholder="password"
              autoComplete="current-password"
              onChange={checkPassword}
              onKeyPress={onKeyPress("password")}
            />

            <TextField
              inputRef={confirmPasswordPointer}
              required
              id="outlined-required-confirmed-password"
              label="confirm your password"
              variant="outlined"
              value={confirmPassword}
              type="password"
              error={confirmPasswordMessage !== ""}
              helperText={confirmPasswordMessage}
              fullWidth
              placeholder="confirm your password"
              autoComplete="current-password"
              onChange={checkConfirmPassword}
              onKeyPress={onKeyPress("confirm_password")}
            />

            <TextField
              inputRef={hintPointer}
              required
              id="outlined-required-hint"
              label="hint for passward"
              variant="outlined"
              value={hint}
              type="text"
              error={email && !hint}
              helperText={email && !hint && "hint required"}
              fullWidth
              placeholder="hint"
              onChange={checkHint}
              onKeyPress={onKeyPress("hint")}
            />

            <TextField
              inputRef={emailPointer}
              required
              id="outlined-required-email"
              label="email"
              variant="outlined"
              value={email}
              error={emailMessage !== ""}
              helperText={emailMessage}
              fullWidth
              placeholder="email"
              onChange={checkEmail}
              onKeyPress={onKeyPress("email")}
            />
          </TextFieldWrapper>
          <Button
            color="primary"
            variant="contained"
            style={btnstyle}
            onClick={handleSubmit}
            fullWidth
          >
            Sign Up
          </Button>
        </Paper>
      </Box>
    </>
  );
};
export default SignUpPage;
