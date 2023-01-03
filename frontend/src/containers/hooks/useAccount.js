import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const LOCALSTORAGE_ME_KEY = "";
const savedMe = localStorage.getItem(LOCALSTORAGE_ME_KEY);

const LOCALSTORAGE_USERNAME_KEY = ""
const savedUsername = localStorage.getItem(LOCALSTORAGE_USERNAME_KEY);

const AccountContext = createContext({
  me: {},
  username: {},
  usernameMessage: {},
  password: {},
  passwordMessage: {},
  passwordConfirm: {},
  passwordConfirmMessage: {},
  email: {},
  emailMessage: {},
  alertMessage: {},
  alertSeverity: {},
  alertOpen: {},
  rememberMe: {},
  signin: {},
  accountData: {},
  categories: {},

  setMe: () => {},
  checkUsername: () => {},
  checkPassword: () => {},
  checkPasswordConfirm: () => {},
  checkEmail: () => { },
  setSignin: () => { },
  setRememberMe: () => { },
  setAccountData: () => {},
  setCategories: () => {},
  resetSignInData: () => { },
  setAlertData: () => { },
  handleAlertClose: () => { },
});

const AccountProvider = (props) => {
  const [me, setMe] = useState(savedMe || "" );

  const [username, setUsername] = useState(savedUsername || "");
  const [usernameMessage, setUsernameMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertOpen, setAlertOpen] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [signin, setSignin] = useState(false);

  const [accountData, setAccountData] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, username);
  }, [username]);

  useEffect(() => {
    if (rememberMe) {
      if (signin) {
        console.log(rememberMe)
        localStorage.setItem(LOCALSTORAGE_ME_KEY, me);
      }
    }
  }, [rememberMe, signin, me]);

  const setAlertData = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const checkUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
    if (username.length === 0) {
      setUsernameMessage("Username must not be empty");
    }
    // username can't be all spaces
    else if (username.trim().length === 0) {
      setUsernameMessage("Username must not be all spaces");
    } else if (username.length > 20) {
      setUsernameMessage("Username must be less than 20 characters long");
    } else {
      setUsernameMessage("");
    }
  };

  const checkPassword = (event) => {
    const password = event.target.value;
    setPassword(password);
    if (event.target.value.length < 8) {
      setPasswordMessage("Password must be at least 8 characters");
    } else if (event.target.value.length > 30) {
      setPasswordMessage("Password must be less than 30 characters");
    } else if (event.target.value.search(/[a-z]/i) < 0) {
      setPasswordMessage("Password must contain at least one letter.");
    } else if (event.target.value.search(/[0-9]/) < 0) {
      setPasswordMessage("Password must contain at least one digit.");
    } else {
      setPasswordMessage("");
    }
  };

  const checkPasswordConfirm = (event) => {
    const cpassword = event.target.value;
    setPasswordConfirm(cpassword);
    if (event.target.value !== password) {
      setPasswordConfirmMessage("Password is inconsistent");
    } else {
      setPasswordConfirmMessage("");
    }
  };

  const checkEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
    if(email.length < 5  || email.search(/@/) < 0 ) {
      setEmailMessage("Email format incorrect");
    }else {
      setEmailMessage("");
    }
  };

  const resetSignInData = () => {
    setUsername("");
    setUsernameMessage("");
    setPassword("");
    setPasswordMessage("");
    setPasswordConfirm("");
    setPasswordConfirmMessage("");
    setEmail("");
    setEmailMessage("");
  };

  return (
    <AccountContext.Provider
      value={{
        me,
        username,
        usernameMessage,
        password,
        passwordMessage,
        passwordConfirm,
        passwordConfirmMessage,
        email,
        emailMessage,
        alertMessage,
        alertSeverity,
        alertOpen,
        rememberMe,
        signin,
        accountData,
        categories,

        setMe,
        checkUsername,
        checkPassword,
        checkPasswordConfirm,
        checkEmail,
        setSignin,
        setRememberMe,
        setAccountData,
        setCategories,
        resetSignInData,
        setAlertData,
        handleAlertClose,
      }}
      {...props}
    />
  );
};
const useAccount = () => useContext(AccountContext);
export { AccountProvider, useAccount };
