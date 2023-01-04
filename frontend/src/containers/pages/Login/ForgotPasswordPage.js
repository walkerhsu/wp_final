import React, { useEffect, useState } from "react";

import { styled } from "@mui/system";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { TextField, Box, Paper, Grid, Avatar, Button, Typography, Link } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAccount } from "../../hooks/useAccount";
import { VALIDATE_HINT_MUTATION } from "../../../graphql";

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

const ForgotPasswordPage = () => {
  const {
    username,
    usernameMessage,
    email,
    emailMessage,
    alertMessage,
    alertSeverity,
    alertOpen,

    checkUsername,
    checkEmail,
    setAlertData,
    handleAlertClose,
  } = useAccount();

  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false)

  const usernamePointer = useRef(null);
  const emailPointer = useRef(null);

  const [validateHint, { data: validateMessage }] =
    useMutation(VALIDATE_HINT_MUTATION);

  const onKeyPress = (field) => (event) => {
    if (event.key === "Enter") {
      if (field === "username") {
        emailPointer.current.focus();
      } else if (field === "email") {
        handleSubmit(event);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || usernameMessage) {
      // alert("Please enter your username correctly");
      setAlertData("Please enter your username correctly", "error");
      usernamePointer.current.focus();
      return;
    } else if (!email || emailMessage) {
      // alert("Please enter your email correctly");
      setAlertData("Please enter your email correctly", "error");
      emailPointer.current.focus();
      return;
    }
    validateHint({
        variables: {
          input: {
            username: username,
            email: email,
          },
        },
    });
  };
  useEffect(() => {
    if (!validateMessage) return;
    if (validateMessage.validateHint === "User not found") {
        setAlertData("User not found", "error");
        usernamePointer.current.focus();
    } else if (validateMessage.validateHint === "Email incorrect") {
        setAlertData("Email incorrect", "error");
        emailPointer.current.focus();
    } else {
        setHint(validateMessage.validateHint);
        setShowHint(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateMessage]);
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
            <h2>Forgot Password</h2>
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
            Forgot Password
          </Button>
          <Typography>
            {" "}
            {showHint ? "Your hint is " + hint : ""}
            {showHint ? <Link href="../SignIn"> Sign In </Link> : ""}
          </Typography>
        </Paper>
      </Box>
    </>
  );
};
export default ForgotPasswordPage;
