import { createContext, useContext, useState} from "react"
import React from "react";
const AccountContext = createContext({
    me: {},
    incomeData: {},
    expenseData: {},

    setMe: () =>{},
    setIncomeData: () =>{},
    setExpenseData: () =>{},
});
const AccountProvider = (props) => {
    const [me, setMe] = useState('');
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    return (
        <AccountContext.Provider value={
            {me, incomeData, expenseData, setMe, setIncomeData, setExpenseData}
        } {...props} />
    );
}
const useAccount = () => useContext(AccountContext);
export {AccountProvider, useAccount};