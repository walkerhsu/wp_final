import React from "react";
import { useState, useRef } from "react";
import { styled } from "@mui/system";
import { Avatar, Button, Paper, Box, Grid, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useAccount } from "../containers/hooks/useAccount";

const TimeFormatting = (Time) => {
  const dayStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = Time.getFullYear();
  const month = Time.getMonth() + 1;
  const date = Time.getDate();
  const day = dayStr[Time.getDay()];
  const TimeStr =
    (year < 10 ? "0" : "") +
    year +
    " / " +
    (month < 10 ? "0" : "") +
    month +
    " / " +
    (date < 10 ? "0" : "") +
    date +
    " ( " +
    day +
    " )";
  return TimeStr;
}



const paperStyle = {
  padding: 20,
  height: "70vh",
  width: 480,
  margin: "20px auto",
};
const btnStyle = {
  margin: "8px 0",
  color: "white",
  width: "30%",
  backgroundColor: "#bf209c",
  ":hover": {
    backgroundColor: "#5a104a",
  },
};

const InputWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "70%"
})

const BtnWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  color: "white",
});

const avatarStyle = { backgroundColor: "#1bbd7e" };

const UpdateAccountForm = ({ handleModalClose, data }) => {
  const defaultFormData = {
    date: data.date ? data.date : TimeFormatting(new Date()),
    name: data.name ? data.name : "name",
    category: data.category ? data.category : "Income",
    money: data.money ? data.money : "100",
    description: data.description ? data.description : "None",
  };
  const { accountData, categories, setAccountData, } =
    useAccount();
  const [time, setTime] = useState(defaultFormData.date);
  const [name, setName] = useState(defaultFormData.name);
  const [money, setMoney] = useState(defaultFormData.money);
  const [moneyMessage, setMoneyMessage] = useState("");
  const [category, setCategory] = useState(defaultFormData.category);
  const [description, setDescription] = useState(defaultFormData.description);

  const namePointer = useRef(null)
  const moneyPointer = useRef(null);
  const descriptionPointer = useRef(null);

  const handleTimeChange = (Time) => {
    setTime(TimeFormatting(Time.$d));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName)
  }

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    // console.log(newCategory);
    setCategory(newCategory);
  };

  const handleMoneyChange = (event) => {
    const newMoney = event.target.value;
    setMoney(newMoney);
    if (
      newMoney > 0 &&
      newMoney.search(/[1-9]/) >= 0 &&
      newMoney.search(/[.]/) < 0
    ) {
      setMoney(newMoney);
      setMoneyMessage("");
    } else if (newMoney.length === 0) {
      setMoneyMessage("Money cannot be empty");
    } else if (newMoney <= 0) {
      setMoneyMessage("Money must be positive");
    } else if (newMoney.search(/[.]/) >= 0) {
      setMoneyMessage("Money should be an integer");
    } else {
      setMoneyMessage("Money must be a number");
    }
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  };

  const onKeyDown = (input) => (event) => {
    if (event.key === "Enter") {
      switch (input) {
        case "time":
          namePointer.current.focus();
          break;
        case "money":
          descriptionPointer.current.focus();
          break;
        case "description":
          handleSubmit(event);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!time) {
      alert("Time should be chosen")
      return
    }
    if (!name) {
      alert("Name should not be empty")
      namePointer.current.focus()
      return
    }
    if (category === "Category") {
      alert("Category should be chosen")
      return
    }
    if (moneyMessage || !money) {

      alert(moneyMessage?moneyMessage:"Money should not be empty")
      moneyPointer.current.focus()
      return
    }
    const data = {
      time: time,
      name: name,
      money: money,
      category: category,
      description: description,
    };
    console.log(data);
    setAccountData([...accountData, data]);
    alert("Update successfully");
    handleModalClose();
  };

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
            <AttachMoneyIcon />
          </Avatar>
          <h2>Update Account</h2>
        </Grid>
        <InputWrapper>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Time"
              value={time}
              onChange={handleTimeChange}
              renderInput={(params) => {
                return <TextField {...params} required fullWidth />;
              }}
            />
          </LocalizationProvider>
          <TextField
            inputRef={namePointer}
            value={name}
            label="Name"
            placeholder="name"
            variant="outlined"
            onChange={handleNameChange}
            onKeyDown={onKeyDown("name")}
            fullWidth
            required
          ></TextField>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-autowidth-label">
              Category
            </InputLabel>
            <Select
              labelId="Category"
              id="category"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((cat) => (
                <MenuItem value={cat} key={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            inputRef={moneyPointer}
            value={money}
            label="Money"
            placeholder="money"
            variant="outlined"
            error={moneyMessage !== ""}
            helperText={moneyMessage}
            onChange={handleMoneyChange}
            onKeyDown={onKeyDown("money")}
            fullWidth
            required
          ></TextField>

          <TextField
            inputRef={descriptionPointer}
            value={description}
            label="Description(optional)"
            placeholder="description"
            variant="outlined"
            onChange={handleDescriptionChange}
            onKeyDown={onKeyDown("description")}
            fullWidth
          ></TextField>
        </InputWrapper>
        <BtnWrapper>
          <Button
            color="primary"
            variant="contained"
            style={btnStyle}
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={btnStyle}
            onClick={handleModalClose}
          >
            Close
          </Button>
        </BtnWrapper>
      </Paper>
    </Box>
  );
};
export default UpdateAccountForm;
