import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

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

import { ADD_CATEGORY_MUTATION } from "../graphql";

const paperStyle = {
  padding: 20,
  height: 700,
  width: 520,
  margin: "20px auto",
};
const btnStyle = {
  margin: "8px 0",
  color: "white",
  width: "35%",
  backgroundColor: "#bf209c",
  ":hover": {
    backgroundColor: "#5a104a",
  },
};
const CategoryWrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});
const InputWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "75%",
});

const BtnWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  color: "white",
});

const avatarStyle = { backgroundColor: "#1bbd7e" };

const UpdateAccountForm = ({ handleModalClose, onSubmitEdit, data, title, categories }) => {
  const { me } = useAccount();
  // console.log("me", me);
  // console.log("categories", categories);
  const defaultFormData = {
    date: data.date ? data.date : new Date(),
    name: data.name ? data.name : "name",
    category: data.category ? data.category : "Income",
    subCategory: data.subCategory ? data.subCategory : "Salary",
    money: data.money ? data.money : "100",
    description: data.description ? data.description : "None",
  };
  const [time, setTime] = useState(defaultFormData.date);
  const [name, setName] = useState(defaultFormData.name);
  const [money, setMoney] = useState(defaultFormData.money);
  const [moneyMessage, setMoneyMessage] = useState("");
  const [category, setCategory] = useState(defaultFormData.category);
  const [subCategory, setSubCategory] = useState(defaultFormData.subCategory);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryMessage, setNewCategoryMessage] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [newSubCategoryMessage, setNewSubCategoryMessage] = useState("");
  const [subCategories, setSubCategories] = useState(
    categories.filter((one_category) => one_category.cat === category)[0].subcat
  );
  const [description, setDescription] = useState(defaultFormData.description);

  const namePointer = useRef(null);
  const categoryPointer = useRef(null);
  const subCategoryPointer = useRef(null);
  const moneyPointer = useRef(null);
  const descriptionPointer = useRef(null);

  const navigate = useNavigate();

  const [addCategory] = useMutation(ADD_CATEGORY_MUTATION)

  const handleTimeChange = (Time) => {
    setTime(Time.$d);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    const newSubCategories = categories.filter(
      (category) => category.cat === newCategory
    )[0].subcat;
    setCategory(newCategory);
    setSubCategories(newSubCategories);
    setSubCategory(newSubCategories[0]);
  };

  const handleSubCategoryChange = (event) => {
    const newSubCategory = event.target.value;
    setSubCategory(newSubCategory);
  };

  const handleNewCategoryChange = (event) => {
    const newCategory = event.target.value;
    setNewCategory(newCategory);
    if (newCategory.length === 0) {
      setNewCategoryMessage("Category cannot be empty");
      return;
    }
    for (let i = 0; i < categories.length; i++) {
      // console.log(categories[i].cat.toLowerCase(), newCategory.toLowerCase())
      if (categories[i].cat.toLowerCase() === newCategory.toLowerCase()) {
        setNewCategoryMessage("Category already exists");
        return;
      }
    }
    setNewCategory(newCategory);
    setNewCategoryMessage("");
  };

  const handleNewSubCategoryChange = (event) => {
    const newSubCategory = event.target.value;
    setNewSubCategory(newSubCategory);
    if (newSubCategory.length === 0) {
      setNewSubCategoryMessage("Subcategory cannot be empty");
      return;
    }
    setNewSubCategoryMessage("");
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
        case "category":
          subCategoryPointer.current.focus();
          break;
        case "subCategory":
          moneyPointer.current.focus();
          break;
        case "description":
          handleSubmit(event);
          break;
        default:
          break;
      }
    }
  };

  const checkItemFormat = () => {
    if (!time) {
      alert("Time should be chosen");
      return false;
    }
    if (!name) {
      alert("Name should not be empty");
      namePointer.current.focus();
      return false;
    }
    if (
      category === "Others" &&
      (newCategoryMessage || !newCategory || !newSubCategory)
    ) {
      alert(
        "New category and new subcategory should not be empty and should be valid"
      );
      categoryPointer.current.focus();
      return false;
    }
    if (moneyMessage || !money) {
      alert(moneyMessage ? moneyMessage : "Money should not be empty");
      moneyPointer.current.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!checkItemFormat()) return;
    if (category === "Others") {
      addCategory({
        variables: {
          input: {
            username: me,
            category: newCategory,
            subCategory: newSubCategory,
          }
        },
      });
      // const newCategories = categories;
      // newCategories.splice(categories.length - 1, 0, {
      //   cat: newCategory,
      //   subcat: [newSubCategory, "Others"],
      // });
      // console.log(newCategories);
      // setCategories(newCategories);
    }
    const data = {
      username: me ? me : "username",
      time: time,
      name: name,
      money: parseInt(money),
      category: category === "Others" ? newCategory : category,
      subCategory: category === "Others" ? newSubCategory : subCategory,
      description: description,
    };
    console.log(data);
    onSubmitEdit(data);
    handleModalClose();
    navigate("/account/home");
    // window.location.reload();
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
          <h2>{title}</h2>
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
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="Category"
              id="category"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem value={category.cat} key={category.cat}>
                  {category.cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {category === "Others" ? (
            <CategoryWrapper>
              <TextField
                inputRef={categoryPointer}
                value={newCategory}
                label="Add new Category"
                placeholder="Add new Category"
                variant="outlined"
                onChange={handleNewCategoryChange}
                onKeyDown={onKeyDown("category")}
                error={newCategoryMessage.length > 0}
                helperText={newCategoryMessage}
                required
              ></TextField>
              <TextField
                inputRef={subCategoryPointer}
                value={newSubCategory}
                label="SubCategory"
                placeholder="subCategory"
                variant="outlined"
                onChange={handleNewSubCategoryChange}
                onKeyDown={onKeyDown("subCategory")}
                error={newSubCategoryMessage.length > 0}
                helperText={newSubCategoryMessage}
                required
              ></TextField>
            </CategoryWrapper>
          ) : (
            <FormControl fullWidth disabled>
              <InputLabel id="subCategory-label">SubCategory</InputLabel>
              <Select
                labelId="SubCategory"
                id="subCategory"
                value={subCategory}
                label="SubCategory"
                onChange={handleSubCategoryChange}
              >
                {subCategories?.map((sub_category) => (
                  <MenuItem value={sub_category} key={sub_category}>
                    {sub_category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

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
