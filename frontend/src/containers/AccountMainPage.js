import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from '@material-ui/core';
import { useAccount } from "./hooks/useAccount";
const AccountMainPage = () => {
    const {accountData, setAccountData} = useAccount();
    const navigate = useNavigate();
    console.log(accountData)
    const navigateToUpdateAccount = () => {
        navigate("/account/update");
    };
    return (
        <div>
            <h1>AccountMainPage</h1>
            <Button variant="contained" color="primary" onClick={navigateToUpdateAccount}>Update account</Button>
            <Button variant="contained" color="primary" onClick={()=> setAccountData([])}>Reset account</Button>
            <div>
                {
                    accountData.map((item) => {
                        // item is an object with time, money, category, description
                        console.log(item.time, item.money, item.category, item.description);
                        return (
                            <div>
                                <p>time: {item.time}</p>
                                <p>money: {item.money}</p>
                                <p>category: {item.category}</p>
                                <p>description: {item.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default AccountMainPage;