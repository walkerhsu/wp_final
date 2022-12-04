import React from "react";
import {TextField} from '@material-ui/core';

const ValidTextField = ({label, onChange}) => {
    const id = "outlined-required-" + label;
    const type= label === "Password" ? "password" : "text";

    return (
        <TextField required id={id} label={label} variant="outlined"
                type={type} placeholder={label} onChange={onChange} fullWidth/>
    );
}

export default ValidTextField;