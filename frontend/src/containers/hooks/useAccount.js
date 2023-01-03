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
  email: {},
  emailMessage: {},
  rememberMe: {},
  signin: {},
  accountData: {},
  categories: {},

  setMe: () => {},
  checkUsername: () => {},
  checkPassword: () => {},
  checkEmail: () => { },
  setSignin: () => { },
  setRememberMe: () => { },
  setAccountData: () => {},
  setCategories: () => {},
  resetSignInData: () => { },
  // getCategories: () => { },
});

const AccountProvider = (props) => {
  const [me, setMe] = useState(savedMe || "" );

  const [username, setUsername] = useState(savedUsername || "");
  const [usernameMessage, setUsernameMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [signin, setSignin] = useState(false);

  const [accountData, setAccountData] = useState([]);

  const [categories, setCategories] = useState([]);
  // const categories = defaultCategories;

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

  const checkEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
    if (email.length < 5) {
      setEmailMessage("Email must be at least 5 characters long");
      return 
    } else if(email.search(/\.com/) < 0 || email.search(/@/) < 0 || email.search(/\.com/) < email.search(/@/)) {
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
    setEmail("");
    setEmailMessage("");
  };

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_USERNAME_KEY, username);
  }, [signin, username]);

  useEffect(() => {
    if (rememberMe) {
      if (signin) {
        console.log(rememberMe)
        localStorage.setItem(LOCALSTORAGE_ME_KEY, me);
      }
    }
  }, [rememberMe, signin, me]);

  return (
    <AccountContext.Provider
      value={{
        me,
        username,
        usernameMessage,
        password,
        passwordMessage,
        email,
        emailMessage,
        rememberMe,
        signin,
        accountData,
        categories,

        setMe,
        checkUsername,
        checkPassword,
        checkEmail,
        setSignin,
        setRememberMe,
        setAccountData,
        setCategories,
        resetSignInData,
        // getCategories,
      }}
      {...props}
    />
  );
};
const useAccount = () => useContext(AccountContext);
export { AccountProvider, useAccount };
