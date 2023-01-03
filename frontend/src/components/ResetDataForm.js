import React from "react";
import { useNavigate } from "react-router-dom";
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

const ResetDataForm = ({ handleModalClose, onSubmitEdit, data }) => {
  const { accountData } = useAccount();
  const navigate = useNavigate();

  const handleResetData = () => {
    if (data.length === accountData.length) {
      //   alert("Reset all data");
      //   setAccountData([]);
      onSubmitEdit();

      handleModalClose();
      return;
    }
    alert("Reset one data");
    onSubmitEdit();

    // const resetData = accountData.filter((item) => !_.isEqual(item, data[0]));
    // setAccountData(resetData);
    handleModalClose();
    navigate("/account/home")
    window.location.reload();
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
            You are going to remove
            {data.length === accountData.length
              ? " all "
              : ` one ${data[0].category} `}
            data. Are you sure ?
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
