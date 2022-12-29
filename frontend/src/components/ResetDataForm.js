import React from "react";
import { styled } from "@mui/system";
import {
  Avatar,
  Button,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import "lodash";

import AnnouncementIcon from "@mui/icons-material/Announcement";

import { useAccount } from "../containers/hooks/useAccount";
import _ from "lodash";

const paperStyle = {
  padding: 20,
  height: "30vh",
  width: 400,
  margin: "20px auto",
};
const btnStyle = {
  margin: "8px 0",
  color: "white",
  width: "30%",
  backgroundColor: "#bf209c",
  ":hover": {
    backgroundColor: "#5a104a",
  },
};

const InputWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "70%",
});

const BtnWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  color: "white",
});

const avatarStyle = { backgroundColor: "#1bbd7e" };

const ResetDataForm = ({ handleModalClose, data }) => {
    console.log(data)
  const { accountData, setAccountData, setIncomeData, setExpenseData } =
    useAccount();

  const handleResetData = () => {
    if (data.length === accountData.length) {
      alert("Reset all data");
      setAccountData([]);
      setIncomeData([]);
      setExpenseData([]);
      handleModalClose();
      return;
    }
    alert("Reset one data");
    const resetData = accountData.filter((item) => !_.isEqual(item, data));
    setAccountData(resetData);
    handleModalClose();
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30ch" },
      }}
      noValidate
      // autoComplete="off"
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AnnouncementIcon />
          </Avatar>
        </Grid>
        <InputWrapper>
          <Typography>
            You are going to clear {data.length === 1 ? "one" : "all"} data. Are
            you sure ?
          </Typography>
          <BtnWrapper>
            <Button
              color="primary"
              variant="contained"
              style={btnStyle}
              onClick={handleResetData}
            >
              Yes
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={btnStyle}
              onClick={handleModalClose}
            >
              No
            </Button>
          </BtnWrapper>
        </InputWrapper>
      </Paper>
    </Box>
  );
};
export default ResetDataForm;
