import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SortIcon from '@mui/icons-material/Sort';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LogoutIcon from "@mui/icons-material/Logout";
import CommentIcon from "@mui/icons-material/Comment";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";

import { useAccount } from "../containers/hooks/useAccount";

const AccountItems = [
  {
    name: "Home",
    icon: <HomeIcon />,
    link: "home",
  },
  {
    name: "Calendar",
    icon: <CalendarMonthIcon />,
    link: "calendar",
  },
  {
    name: "Classfication",
    icon: <SortIcon />,
    link: "classification",
  },
  {
    name: "Analysis",
    icon: <InsertChartIcon />,
    link: "analysis",
  }
];
const ConverseItems = [
  {
    name: "User's Comments",
    icon: <CommentIcon />,
    link: "comments",
  },
  {
    name: 'Contact Us',
    icon: <PhoneForwardedIcon />,
    link: "contact",
  }
]
const OtherItems = [
  {
    name: "Logout",
    icon: <LogoutIcon />,
    link: "/",
  }
]

export default function SideBarItems({ handleDrawerClose }) {
  const { setSignin, setAlertData } = useAccount();
  const location = useLocation();
  const currentPath = location.pathname;
  const handleLogout = () => {
    setSignin(false);
    setAlertData("You have logged out!", "info");
    handleDrawerClose()
  }
  return (
    <>
      {
        AccountItems.map((item) => (
          <ListItemButton
            key={item.name}
            component={Link}
            to={item.link}
            selected={currentPath === item.to}
            onClick={handleDrawerClose}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))
      }
      <Divider />
      {
        ConverseItems.map((item) => (
          <ListItemButton
            key={item.name}
            component={Link}
            to={item.link}
            selected={currentPath === item.to}
            onClick={handleDrawerClose}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))
      }
      {/* <Divider /> */}
      {
        OtherItems.map((item) => (
          <ListItemButton
            key={item.name}
            component={Link}
            to={item.link}
            selected={currentPath === item.to}
            onClick={handleLogout}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))
      }
    </>
  );
}
