import React, { useEffect, useState } from "react";
import { useAccount } from "../../hooks/useAccount";

import DataTable from "../../../components/DataTable";
import { AppBar, Box, Paper, ThemeProvider, Typography} from "@mui/material";
import { createTheme } from '@mui/material/styles';

import "../../../css/AccountMainPage.css";

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#065dc6',
      darker: '#053e85',
    },
    neutral: {
      main: "rgba(62, 198, 157, 1)",
      contrastText: '#fff',
    },
    neutral1: {
      main: '#fbbc5d',
      contrastText: '#fff',
    },
    neutral2: {
      main: '#c981d4',
      contrastText: '#fff',
    },
  },
});

const AccountMainPage = () => {
  const {accountData} = useAccount();
  const [revenue, setRevenue] = useState(0);
  const [expense, setExpense] = useState(0);

  const getData = (accountData) => {
    let rsum = 0;
    let esum = 0;
    for (let i = 0; i < accountData.length; i++) {
        if(accountData[i].category === 'Income')
            rsum += parseInt(accountData[i].money);
        else
            esum += parseInt(accountData[i].money);
    }
    return [ rsum , esum ];
  };

  useEffect(() => {
    const [ revenue, expense ] = getData(accountData);
    setRevenue(revenue);
    setExpense(expense);
  },[accountData])

  return (
    <div>
      <DataTable title={"Your Recent Data"} data={accountData} />
      <Box
      sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center", 
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
        },
      }}
    >
      <Paper 
        elevation={5} 
        square 
        >
          <ThemeProvider theme={theme}>
            <AppBar 
              position="static"
              color="neutral"
              style={{
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: 'Work Sans',
                fontSize: "50px",
              }}
              >
              Revenue
            </AppBar>
            <Typography 
              style={{
                height: "70%",
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
              }}
            >
              {revenue}
            </Typography>
          </ThemeProvider>
      </Paper>
      
      <Paper 
        elevation={5} 
        square 
        >
          <ThemeProvider theme={theme}>
            <AppBar 
              position="static"
              color="neutral1"
              style={{
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: 'Work Sans',
                // colot: "red",
                fontSize: "50px",
              }}
              >
              Expense
            </AppBar>
            <Typography 
              style={{
                height: "70%",
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
              }}
            >
              {expense}
            </Typography>
          </ThemeProvider>
      </Paper>

      <Paper 
        elevation={5} 
        square 
        >
          <ThemeProvider theme={theme}>
            <AppBar 
              position="static"
              color="neutral2"
              style={{
                fontFamily: 'Work Sans',
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
              }}
              >
              Balance
            </AppBar>
            <Typography 
              style={{
                height: "70%",
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
              }}
            >
              {revenue - expense}
            </Typography>
          </ThemeProvider>
      </Paper>
    </Box>
    </div>
  );
};
export default AccountMainPage;
