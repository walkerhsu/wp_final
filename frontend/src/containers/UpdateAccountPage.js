import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Avatar, Button, Paper, Box, Grid, TextField} from '@material-ui/core';
import {FormControl, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const paperStyle={padding :20,height:'70vh',width:360, margin:"20px auto"}
const btnstyle={margin:'8px 0'}
const avatarStyle = {backgroundColor:'#1bbd7e'}
const UpdateAccountPage = () => {
    const [time, setTime] = useState('');
    const [isIncome, setIsIncome] = useState(true);
    const [money, setMoney] = useState('');
    const [moneyMessage, setMoneyMessage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    const navigateToAccountMainPage = () => {
        navigate("/account");
    };

    const handleTimeChange = (newTime) => {
        setTime(newTime);
    };

    const handleMoneyChange = (event) => {
        const newMoney = event.target.value;
        if(newMoney > 0 && newMoney.search(/[1-9]/) >= 0 && newMoney.search(/[.]/) < 0) {
            const money= isIncome? newMoney: (-1)* newMoney
            setMoney(money);
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
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(!moneyMessage && money){

            const data = {
                date: time,
                money: money,
                category: category,
                description: description
            }
            console.log(data);
            navigateToAccountMainPage();
        }
        else{
            console.log("Invalid input");
            alert("Invalid input");
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
                        <DateTimePicker
                            label="Time"
                            value={time}
                            onChange={handleTimeChange}
                            renderInput={(params) => <TextField {...params} required fullWidth/>}
                        />
                    </LocalizationProvider>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="radio-buttons-income-or-outcome-label"
                            defaultValue="income"
                            name="radio-buttons-group"
                            onChange={(event) => setIsIncome(event.target.value === "income")}
                        >
                            <FormControlLabel value="income" control={<Radio />} label="Income" />
                            <FormControlLabel value="Expense" control={<Radio />} label="Expense" />
                        </RadioGroup>
                    </FormControl>
                    <TextField label='Money' placeholder='money' variant="outlined" onChange={handleMoneyChange}
                            error={moneyMessage!==''} helperText={moneyMessage} fullWidth required></TextField>
                    <TextField label='Category(optional)' placeholder='category' variant="outlined" onChange={handleCategoryChange} fullWidth ></TextField>
                    <TextField label='Description(optional)' placeholder='description' variant="outlined" onChange={handleDescriptionChange} fullWidth ></TextField>
                </div>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSubmit} fullWidth>Sign in</Button>
            </Paper>
        </Box>
    );
}
export default UpdateAccountPage;