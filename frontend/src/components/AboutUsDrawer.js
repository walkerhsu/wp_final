import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import HelpIcon from "@mui/icons-material/Help";
import CommentIcon from "@mui/icons-material/Comment";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import styled from "styled-components";
// import { fontSize } from '@mui/system';
import { useNavigate } from "react-router-dom";

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AboutUsDrawer = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const navigateToAuthors = () => {
    navigate("/authors");
  };
  const navigateInspiration = () => {
    navigate("/inspiration");
  };
  const navigateToInstructions = () => {
    navigate("/instructions");
  };
  const navigateToComments = () => {
    navigate("/comments");
  };
  const navigateToContact = () => {
    navigate("/contact");
  };
  const textList1 = [
    {text: 'Authors', nav: navigateToAuthors},
    {text: 'Inspiration', nav: navigateInspiration},
    {text: 'App Instructions', nav: navigateToInstructions}
  ]
  const textList2 = [
    {text: "User's Comments", nav: navigateToComments},
    {text: 'Contact Us', nav: navigateToContact}
  ]

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {textList1.map((data, index) => (
          <ListItem key={data.text} disablePadding>
            <ListItemButton onClick={data.nav}>
              <ListItemIcon>
                {index === 0 ? (
                  <PeopleIcon />
                ) : index === 1 ? (
                  <TipsAndUpdatesIcon />
                ) : (
                  <HelpIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {textList2.map((data, index) => (
          <ListItem key={data.text} disablePadding>
            <ListItemButton onClick={data.nav}>
              <ListItemIcon>
                {index === 0 ? <CommentIcon /> : <PhoneForwardedIcon />}
              </ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <BtnWrapper>
      <React.Fragment key={"top"}>
        <Button onClick={toggleDrawer("top", true)}>
          <h2>About us</h2>
        </Button>
        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
        >
          {list("top")}
        </Drawer>
      </React.Fragment>
    </BtnWrapper>
  );
};

export default AboutUsDrawer;
