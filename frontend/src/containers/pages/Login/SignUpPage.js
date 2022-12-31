import React, { useEffect } from "react";

import { styled } from "@mui/system";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Paper, Grid, Avatar, Button } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAccount } from "../../hooks/useAccount";
import { CREATE_USER_MUTATION } from "../../../graphql";
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

const SignUpPage = () => {
  const {
    username,
    usernameMessage,
    password,
    passwordMessage,
    email,
    emailMessage,
    resetSignInData,
    checkUsername,
    checkPassword,
    checkEmail,
  } = useAccount();

  const usernamePointer = useRef(null);
  const passwordPointer = useRef(null);
  const emailPointer = useRef(null);

  const [createUser, { data: createMessage }] =
    useMutation(CREATE_USER_MUTATION);

  const navigate = useNavigate();

  const onKeyPress = (field) => (event) => {
    if (event.key === "Enter") {
      if (field === "username") {
        passwordPointer.current.focus();
      } else if (field === "password") {
        emailPointer.current.focus();
      } else if (field === "email") {
        handleSubmit(event);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      usernameMessage ||
      passwordMessage ||
      emailMessage ||
      !username ||
      !password ||
      !email
    ) {
      if (!username || usernameMessage) {
        alert("Please enter your username correctly");
        usernamePointer.current.focus();
      } else if (!password || passwordMessage) {
        alert("Please enter your password correctly");
        passwordPointer.current.focus();
      } else if (!email || emailMessage) {
        alert("Please enter your email correctly");
        emailPointer.current.focus();
      }
      return;
    }
    console.log("Creating a new user...")
    console.log(username, password, email)
    // 1. Create a new user in the database
    createUser({
      variables: {
        input: {
          salt: generateSalt(4),
          username: username,
          password: password,
          email: email,
        },
      },
    });
    // 2. If the backend returns a success message, then navigate to the signin page
    //    If the backend returns a failure message, then display an alert
    
  };
  useEffect(() => {
    if(!createMessage) return;
    alert(createMessage.createUser);
    if (createMessage.createUser === "User created") {
      navigate("/signin");
      resetSignInData();
    } else if(createMessage.createUser === "User already exists"){
      navigate("/signin");
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMessage]);
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
  );
};
export default SignUpPage;
