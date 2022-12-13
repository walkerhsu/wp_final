import { createContext, useContext, useState } from "react";
import React from "react";
const AccountContext = createContext({
  me: {},
  username: {},
  usernameMessage: {},
  password: {},
  passwordMessage: {},
  email: {},
  emailMessage: {},
  incomeData: {},
  expenseData: {},

  setMe: () => {},
  checkUsername: () => {},
  checkPassword: () => {},
  checkEmail: () => {},
  resetSignInData: () => {},
  setIncomeData: () => {},
  setExpenseData: () => {},
});
const AccountProvider = (props) => {
  const [me, setMe] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

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
    } else if (email.search(/@/) < 0) {
      setEmailMessage("Email must contain @");
    } else if (email.search(/\.com/) < 0) {
      setEmailMessage("Email must contain .com");
    }
    // the last '.com' appears before '@'
    else if (email.search(/\.com/) < email.search(/@/)) {
      setEmailMessage("Email must contain .com after @");
    } else {
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
        incomeData,
        expenseData,
        setMe,
        checkUsername,
        checkPassword,
        checkEmail,
        resetSignInData,
        setIncomeData,
        setExpenseData,
      }}
      {...props}
    />
  );
};
const useAccount = () => useContext(AccountContext);
export { AccountProvider, useAccount };
