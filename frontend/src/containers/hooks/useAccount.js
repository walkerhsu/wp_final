import { createContext, useContext, useState } from "react";
import React from "react";
const defaultCategories = [
  { cat: "Income", subcat: ["Salary", "Bonus", "Others"] },
  { cat: "Food", subcat: ["Breakfast", "Lunch", "Dinner"] },
  { cat: "Clothing", subcat: ["Shirt", "Pants", "Shoes"] },
  { cat: "Housing", subcat: ["Rent", "Mortgage", "Utilities"] },
  { cat: "Transport", subcat: ["Public Transportation", "Gas", "Parking", "Maintenance"] },
  { cat: "Entertainment", subcat: ["Movies", "Games", "Sports", "Music"] },
  { cat: "Education", subcat: ["Books", "Tuition", "Cram School", "Supplies"] },
  { cat: "Necessities", subcat: ["Groceries", "Toiletries", "Cleaning Supplies", "Others"] },
  { cat: "Electronics", subcat: ["Phone", "Computer", "Tablet", "Others"] },
  { cat: "Health", subcat: ["Doctor", "Medicine", "Dental", "Gym"] },
  { cat:"Others", subcat: ["Others"] },
];
const AccountContext = createContext({
  me: {},
  username: {},
  usernameMessage: {},
  password: {},
  passwordMessage: {},
  email: {},
  emailMessage: {},
  accountData: {},
  categories: {},

  setMe: () => {},
  checkUsername: () => {},
  checkPassword: () => {},
  checkEmail: () => { },
  setAccountData: () => {},
  setIncomeData: () => {},
  setExpenseData: () => { },
  setCategories: () => {},
  resetSignInData: () => {},
});

const AccountProvider = (props) => {
  const [me, setMe] = useState("");

  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [accountData, setAccountData] = useState([]);

  const [categories, setCategories] = useState(defaultCategories);

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
        accountData,
        categories,

        setMe,
        checkUsername,
        checkPassword,
        checkEmail,
        setAccountData,
        setCategories,
        resetSignInData,

      }}
      {...props}
    />
  );
};
const useAccount = () => useContext(AccountContext);
export { AccountProvider, useAccount };
