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

const ChangeHint = () => {
  const {
    me,
    password,
    hint,

    resetSignInData,
    checkHint,
    setAlertData,
  } = useAccount();

  const [curpassword, setCurPassword] = useState("");

  const curpasswordPointer = useRef(null);
  const hintPointer = useRef(null);

  const [updateUser, { data: updateMessage }] =
    useMutation(UPDATE_USER_MUTATION);

  const onKeyPress = (field) => (event) => {
    if (event.key === "Enter") {
      if (field === "curpassword") {
        hintPointer.current.focus();
      } else if (field === "hint") {
        handleSubmit(event);
      }
    }
  };

  const checkCurPassword = (event) => {
    setCurPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!curpassword || !hint) {
      if (!curpassword) {
        setAlertData("Please enter your password correctly", "error");
        // alert("Please enter your password correctly");
        curpasswordPointer.current.focus();
      } else if (!hint) {
        alert("Please enter a new hint");
        hintPointer.current.focus();
      }
      return;
    }
    console.log("Updating a new user...");
    console.log(me, password, hint);
    // 1. Create a new user in the database
    updateUser({
      variables: {
        input: {
          type: "hint",
          username: me,
          curpassword: curpassword,
          hint: hint,
        },
      },
    });
    // 2. If the backend returns a success message, then navigate to the signin page
    //    If the backend returns a failure message, then display an alert
  };
  useEffect(() => {
    if (!updateMessage) return;
    if (updateMessage.updateUser === "User hint updated") {
      setAlertData("User hint updated", "success");
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
          <h2>Change Hint</h2>
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
            inputRef={hintPointer}
            required
            id="outlined-required-hint"
            label="new hint"
            variant="outlined"
            value={hint}
            type="text"
            fullWidth
            placeholder="new hint"
            onChange={checkHint}
            onKeyPress={onKeyPress("hint")}
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
export default ChangeHint;
