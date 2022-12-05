import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from '@material-ui/core';

const AccountMainPage = () => {
    const navigate = useNavigate();
    const navigateToUpdateAccount = () => {
        navigate("/account/update");
    };
    return (
        <div>
            <h1>AccountMainPage</h1>
            <Button variant="contained" color="primary" onClick={navigateToUpdateAccount}>click me</Button>
        </div>
    );
}
export default AccountMainPage;