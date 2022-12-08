import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import {Button} from '@material-ui/core';
import { useAccount } from "../hooks/useAccount";
import {Box, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LogoutIcon from '@mui/icons-material/Logout';

// import MonthCalendar from "../components/MonthCalendar";
import WeekCalendar from "../../components/WeekCalendar";
import DataTable from "../../components/DataTable";
import DateDetail from "../DateDetail";
// import DataTable from "./DataTable";
import "../../css/AccountMainPage.css"

const LogOutButton = styled(Button)({
    position: "absolute",
    right: "0",
    transform: "translate(-50%,0%)",
    backgroundColor: "#1bbd7e",
    color: "white",
    "&:hover": {
        backgroundColor: "#1bbd7e",
    }
})

const AccountMainPage = () => {
    const {me, incomeData, expenseData, setMe, setIncomeData, setExpenseData} = useAccount();
    const [value, setValue] = useState("income");

    const [showDateDetail, setShowDateDetail] = useState(false);
    const [date, setDate] = useState(null);
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

    const navigateToMainPage = () => {
        setMe('');
        navigate("/");
    };

    const showDetailsHandle = (dateStr) => {
        setDate(dateStr);
        setShowDateDetail(true);
    };
    
    return (
        <div>
            <div className="AccountHeader">
                <div>{me?me+'\'s':"My"} Account</div>
                <LogOutButton variant="contained" color="primary" onClick={navigateToMainPage}>
                    log Out
                    <LogoutIcon />
                </LogOutButton>
            </div>
            <div className="WeekCalendar">
                <h2>Week Calendar</h2>
                <WeekCalendar showDetailsHandle={showDetailsHandle} />
                <br />
                <div>{date}</div>
                <br />
                {showDateDetail ? <DateDetail currentDate={date}/> : null}
            </div>
            <br></br>
            <Button margin="10px" variant="contained" color="primary" onClick={navigateToUpdateAccount}>Update account data</Button>
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
                        {incomeData.length !== 0 ?
                            <DataTable data={incomeData}/>
                            :<div>No income data...</div>
                        }
                    </TabPanel>
                    <TabPanel value="expense">
                        {expenseData.length !== 0 ?
                            <DataTable data={expenseData}/>
                            :<div>No expense data...</div>
                        }
                    </TabPanel>
                </TabContext>
            </Box>
            
        </div>
    );
}
export default AccountMainPage;