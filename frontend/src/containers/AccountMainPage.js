import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from '@material-ui/core';
import { useAccount } from "./hooks/useAccount";
import {Box, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import MonthCalendar from "../components/MonthCalendar";
import WeekCalendar from "../components/WeekCalendar";
import "../css/AccountMainPage.css"

const AccountMainPage = () => {
    const {incomeData, expenseData, setIncomeData, setExpenseData} = useAccount();
    const [value, setValue] = useState("income");

    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };
    const resetData = () =>{
        setIncomeData([]);
        setExpenseData([]);
    }
    const navigateToUpdateAccount = () => {
        navigate("/account/update");
    };

    const showDetailsHandle = (dayStr) => {
        setData(dayStr);
        setShowDetails(true);
      };
    
    return (
        <div>
            <div className="WeekCalendar">
                <h1>Week View Calendar with react</h1>
                <br />
                <h2>Example</h2>
                <WeekCalendar showDetailsHandle={showDetailsHandle} />
                <br />
                {showDetails ? <div>{data.data}</div> : null}
            </div>
            <br></br>
            <Button variant="contained" color="primary" onClick={navigateToUpdateAccount}>Update account data</Button>
            <Button variant="contained" color="primary" onClick={resetData}>Reset account data</Button>
            <br /><br />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="show income-expense tabs">
                            <Tab label="income" value="income" />
                            <Tab label="expense" value="expense" />
                        </TabList>
                    </Box>
                    <TabPanel value="income">
                    {
                        incomeData.length!==0?
                        (incomeData.map((item, idx) => (
                            <div id={"income"+idx} key={"income"+idx}>
                                <p>time: {item.time}</p>
                                <p>money: {item.money}</p>
                                <p>category: {item.category}</p>
                                <p>description: {item.description}</p>
                            </div> 
                        ))):(<div>no income data</div>)
                    }</TabPanel>
                    <TabPanel value="expense">
                    {
                        expenseData.length!==0?
                        (expenseData.map((item, idx) => (
                            <div id={"expense"+idx} key={"expense"+idx}>
                                <p>time: {item.time}</p>
                                <p>money: {item.money}</p>
                                <p>category: {item.category}</p>
                                <p>description: {item.description}</p>
                            </div> 
                        ))) : (<div>no expense data</div>)
                    }</TabPanel>
                </TabContext>
            </Box>
            
        </div>
    );
}
export default AccountMainPage;