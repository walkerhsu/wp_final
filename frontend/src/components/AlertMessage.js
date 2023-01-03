import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
const TransitionDown = (props) => {
  return <Slide {...props} direction="down" />;
};
const AlertMessage = ({ open, message, severity, handleClose }) => {
  const duration = 2000;
  const vertical = "top";
  const horizontal = "center";

  return (
    <div className="alert-message" >
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        TransitionComponent={TransitionDown}
        autoHideDuration={duration}
        onClose={handleClose}
        key={message + vertical + horizontal}
        // sx={{ width: "100%" }}
      >
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertMessage;
