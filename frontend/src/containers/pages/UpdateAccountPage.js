import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {Avatar, Button, Paper, Box, Grid, TextField} from '@material-ui/core';
import {FormControl, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useAccount } from "../hooks/useAccount";

const paperStyle={padding :20,height:'70vh',width:360, margin:"20px auto"}
const btnstyle={margin:'8px 0'}
const avatarStyle = {backgroundColor:'#1bbd7e'}

const UpdateAccountPage = () => {
    const {incomeData, expenseData, setIncomeData, setExpenseData} = useAccount();
    const [time, setTime] = useState('');
    const [isIncome, setIsIncome] = useState(true);
    const [money, setMoney] = useState('');
    const [moneyMessage, setMoneyMessage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const timePointer = useRef(null);
    const radioPointer = useRef(null);
    const moneyPointer = useRef(null);
    const categoryPointer = useRef(null);
    const descriptionPointer = useRef(null);

    const navigate = useNavigate();
    const navigateToAccountMainPage = () => {
        navigate("/account")
    };

    const handleTimeChange = (Time) => {
        const dayStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const newTime = Time.$d;
        const year = newTime.getFullYear();
        const month = newTime.getMonth() + 1;
        const date = newTime.getDate();
        const day = dayStr[newTime.getDay()];
        const newTimeStr = (year<10?'0':'') + year + " / "
                        + (month<10?'0':'') + month + " / "
                        + (date<10?'0':'') + date + " ( "
                        + day + " )";
        setTime(newTimeStr);
    };

    const handleMoneyChange = (event) => {
        const newMoney = event.target.value;
        if(newMoney > 0 && newMoney.search(/[1-9]/) >= 0 && newMoney.search(/[.]/) < 0) {
            setMoney(newMoney);
            setMoneyMessage('');
        }
        else if(newMoney.length===0) {
            setMoneyMessage('Money cannot be empty');
        }
        else if(newMoney<=0) {
            setMoneyMessage('Money must be positive');
        }
        else if(newMoney.search(/[.]/) >= 0) {
            setMoneyMessage('Money should be an integer');
        }
        else{
            setMoneyMessage('Money must be a number');
        }
    };

    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setCategory(newCategory);
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
    };
    const onKeyDown = (input) => (event) => {
        if(event.key === "Enter"){
            switch(input){
                case "time":
                    radioPointer.current.focus();
                    break;
                case "incomeExpense":
                    moneyPointer.current.focus();
                    break;
                case "money":
                    categoryPointer.current.focus();
                    break;
                case "category":
                    descriptionPointer.current.focus();
                    break;
                case "description":
                    handleSubmit(event);
                    break;
                default:
                    break;
            }
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!moneyMessage && money){
            const data = {
                time: time,
                money: money,
                isIncome: isIncome,
                category: category,
                description: description
            }
            console.log(data);
            if(isIncome){
                setIncomeData([...incomeData, data]);
            }
            else{
                setExpenseData([...expenseData, data]);
            }
            alert("Update successfully");
            navigateToAccountMainPage();
        }
        else{
            alert("Invalid input");
            timePointer.current.focus();
        }
    }
  
    return (
        <Box component="form" 
            sx={{
                '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
            noValidate
            // autoComplete="off"
        >
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><AttachMoneyIcon/></Avatar>
                    <h2>Update Account</h2>
                </Grid>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Time"
                            value={time}
                            onChange={handleTimeChange}
                            renderInput={(params) => {
                                return <TextField {...params}  required fullWidth/>
                            }}
                        />
                    </LocalizationProvider>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="radio-buttons-income-or-outcome-label"
                            // defaultValue="income"
                            name="radio-buttons-group"
                            onChange={(event) => setIsIncome(event.target.value === "income")}
                        >
                            <FormControlLabel value="income" control={
                                <Radio inputRef={radioPointer} onKeyDown={onKeyDown("incomeExpense")}/>
                            } label="Income" />
                            <FormControlLabel value="Expense" control={
                                <Radio onKeyDown={onKeyDown("incomeExpense")}/>
                            } label="Expense" />
                        </RadioGroup>
                    </FormControl>
                    <TextField inputRef={moneyPointer} label='Money' placeholder='money' variant="outlined" error={moneyMessage!==''} helperText={moneyMessage}
                        onChange={handleMoneyChange} onKeyDown={onKeyDown("money")} fullWidth required></TextField>
                    <TextField inputRef={categoryPointer} label='Category(optional)' placeholder='category' variant="outlined" 
                        onChange={handleCategoryChange} onKeyDown={onKeyDown("category")} fullWidth ></TextField>
                    <TextField inputRef={descriptionPointer} label='Description(optional)' placeholder='description' variant="outlined"
                        onChange={handleDescriptionChange} onKeyDown={onKeyDown("description")} fullWidth ></TextField>
                </div>
                <Button color='primary' variant="contained" style={btnstyle} onClick={handleSubmit} fullWidth>Update</Button>
            </Paper>
        </Box>
    );
}
export default UpdateAccountPage;