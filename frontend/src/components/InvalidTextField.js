import React from "react";
import {TextField} from '@material-ui/core';


const InvalidTextField = ({label, onChange, helperText}) =>{
    const id = "outlined-error-" + label;
    const type= label === "Password" ? "password" : "text";

    return (
        <TextField error id={id} label={label} variant="outlined"
                type={type} placeholder={label} helperText={helperText} onChange={onChange} fullWidth/>
    );
}
export default InvalidTextField;