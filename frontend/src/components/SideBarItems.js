import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const items = [
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
];

export default function SideBarItems() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      {items.map((item) => (
        <ListItemButton
          key={item.name}
          component={Link}
          to={item.link}
          selected={currentPath === item.to}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </>
  );
}
