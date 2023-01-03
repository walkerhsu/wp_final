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

const TextFieldWrapper = styled("div")({
  margin: "8px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "30%",
});

const SigninPage = () => {
  const {
    username,
    usernameMessage,
    password,
    passwordMessage,
    rememberMe,
    setMe,
    resetSignInData,
    checkUsername,
    checkPassword,
    setSignin,
    setRememberMe,
  } = useAccount();
  const paperStyle = {
    padding: 20,
    height: 510,
    width: 360,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

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
        alert("Please enter your username correctly");
        usernamePointer.current.focus();
      } else if (!password || passwordMessage) {
        alert("Please enter your password correctly");
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
    alert(validateMessage.validateUser);
    if (validateMessage.validateUser === "Welcome!") {
      createCategory({
        variables: {
          input: {
            username: username,
          },
        },
      });
      navigate("/account/home");
      setMe(username);
      setSignin(true);
      resetSignInData();
    } else if (validateMessage.validateUser === "User not found") {
      usernamePointer.current.focus();
    } else if (validateMessage.validateUser === "Password incorrect") {
      passwordPointer.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateMessage]);

  return (
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
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="../SignUp">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SigninPage;
