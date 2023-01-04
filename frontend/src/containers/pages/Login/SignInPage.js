import React, { useEffect } from "react";
import { useRef } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { useAccount } from "../../hooks/useAccount";
import {
  VALIDATE_USER_MUTATION,
  CREATE_CATEGORY_MUTATION,
} from "../../../graphql";
import AlertMessage from "../../../components/AlertMessage";

const TextFieldWrapper = styled("div")({
  margin: "8px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "30%",
});

const paperStyle = {
  borderRadius: "50px",
  backgroundColor: "#fafada",
  padding: 20,
  height: 560,
  width: 460,
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

const SigninPage = () => {
  const {
    username,
    usernameMessage,
    password,
    passwordMessage,
    alertMessage,
    alertSeverity,
    alertOpen,
    rememberMe,
    setMe,
    resetSignInData,
    checkUsername,
    checkPassword,
    setSignin,
    setRememberMe,
    setAlertData,
    handleAlertClose,
  } = useAccount();

  const usernamePointer = useRef(null);
  const passwordPointer = useRef(null);

  const [validatePerson, { data: validateMessage }] = useMutation(
    VALIDATE_USER_MUTATION
  );
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION);

  const navigate = useNavigate();

  const onKeyPress = (field) => (event) => {
    if (event.key === "Enter") {
      if (field === "username") {
        passwordPointer.current.focus();
      } else if (field === "password") {
        handleSubmit(event);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (usernameMessage || passwordMessage || !username || !password) {
      if (!username || usernameMessage) {
        setAlertData("Please enter your username correctly", "error");
        usernamePointer.current.focus();
      } else if (!password || passwordMessage) {
        setAlertData("Please enter your password correctly", "error");
        passwordPointer.current.focus();
      }
      return;
    }
    // 1. Send the username and password to the backend
    validatePerson({
      variables: {
        input: {
          username: username,
          password: password,
        },
      },
    });
  };

  useEffect(() => {
    if (!validateMessage) return;
    // 2. If the backend returns a success message, then navigate to the account page
    //    If the backend returns a failure message, then display an alert
    // alert(validateMessage.validateUser);
    if (validateMessage.validateUser === "Welcome!") {
      setAlertData(`Welcome, ${username}!`, "success");
      createCategory({
        variables: {
          input: {
            username: username,
          },
        },
      });
      resetSignInData();
      navigate("/account/home");
      setMe(username);
      setSignin(true);
    } else if (validateMessage.validateUser === "User not found") {
      setAlertData("User not found", "error");
      usernamePointer.current.focus();
    } else if (validateMessage.validateUser === "Password incorrect") {
      setAlertData("Password incorrect", "error");
      passwordPointer.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateMessage]);

  return (
    <>
      <AlertMessage
        open={alertOpen}
        severity={alertSeverity}
        message={alertMessage}
        handleClose={handleAlertClose}
      />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <br />
            <h2>Sign In</h2>
            <br />
          </Grid>
          <TextFieldWrapper>
            <TextField
              inputRef={usernamePointer}
              label="Username"
              placeholder="Enter username"
              variant="outlined"
              value={username}
              error={usernameMessage !== ""}
              helperText={usernameMessage}
              onChange={checkUsername}
              fullWidth
              required
              onKeyPress={onKeyPress("username")}
            />
            <TextField
              inputRef={passwordPointer}
              label="Password"
              placeholder="Enter password"
              type="password"
              variant="outlined"
              value={password}
              error={passwordMessage !== ""}
              helperText={passwordMessage}
              onChange={checkPassword}
              fullWidth
              required
              onKeyPress={onKeyPress("password")}
            />
          </TextFieldWrapper>
          {/* view password: https://stackoverflow.com/questions/60391113/how-to-view-password-from-material-ui-textfield */}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                value={rememberMe}
                onClick={() => {
                  // console.log("remember me");
                  setRememberMe(!rememberMe);
                }}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            onClick={handleSubmit}
            fullWidth
          >
            Sign in
          </Button>
          <br />
          <br />
          <Typography>
            {" "}
            Forgot Your Password ?<Link href="../Forgot"> Click here</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account ?<Link href="../SignUp"> Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default SigninPage;
