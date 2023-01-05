import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const itemStyle = {
  color: "#000000",
  position: "absolute",
  left: "12%",
  transform: "translate(0%, -50%)",
};
const listPaperStyle = {
    borderRadius: "10px",
    border: "1px solid #535353",
};
const Account = ({ personalData }) => {
  console.log(personalData);
  return (
    <Paper style={listPaperStyle}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {personalData.map((obj, index) => {
          console.log(obj);
          return (
            <>
              <ListItem
                key={obj.title}
                disableGutters
                style={{ height: 95 }}
                secondaryAction={
                  <IconButton aria-label="change" onClick={obj.handleCLick}>
                    <ArrowForwardIosIcon sx={{ fontSize: "40px" }} />
                  </IconButton>
                }
              >
                {obj.icon}
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="h5" type="body2" style={itemStyle}>
                      {" "}
                      {obj.title}
                      {obj.title === "password" ? "" : " : "}
                      <strong>
                        {obj.title === "password" ? "" : obj.value}
                      </strong>
                    </Typography>
                  }
                />
              </ListItem>
              {index === personalData.length - 1 ? null : <Divider />}
            </>
          );
        })}
      </List>
    </Paper>
  );
};

export default Account;
