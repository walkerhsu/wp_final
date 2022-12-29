import * as React from "react";
import { Outlet } from "react-router-dom";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import SideBarItems from "../components/SideBarItems";
import ResetDataModal from "./ResetDataModal";
import UpdateAccountModal from "./UpdateAccountModal";
import { useAccount } from "./hooks/useAccount";

const drawerWidth = 240;

// const CreateDataBtn = styled(Button)(({ theme }) => ({
//   position: "absolute",
//   right: "0",
//   transform: "translate(-50%,0%)",
//   backgroundColor: "#32b5b2",
//   color: "white",
//   "&:hover": {
//     backgroundColor: "#2ba2a0",
//   },
// }));

// const LogOutButton = styled(Button)({
//   position: "absolute",
//   right: "0",
//   transform: "translate(-50%,0%)",
//   backgroundColor: "#32b5b2",
//   color: "white",
//   "&:hover": {
//     backgroundColor: "#2ba2a0",
//   },
// });

const BtnWrapper = styled("div")({
  position: "absolute",
  right: "0",
  transform: "translate(-5%,0%)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  width: "360px",
});

const btnStyle = {
  borderRadius: "8px",
  backgroundColor: "#32b5b2",
  color: "white",
  "&:hover": {
    backgroundColor: "#2ba2a0",
  },
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Appframe() {
  const { me, accountData } = useAccount();
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    console.log("in handleModalClose")
    setModalOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {me ? me + "'s" : "My"} Account
          </Typography>
          <BtnWrapper>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setReset(true)}
              style={btnStyle}
            >
              Reset all data
            </Button>
            <ResetDataModal
              open={reset}
              handleModalClose={() => setReset(false)}
              data={accountData}
            />
            <Button onClick={handleModalOpen} style={btnStyle}>
              Create New data
            </Button>
            <UpdateAccountModal
              open={modalOpen}
              handleModalClose={handleModalClose}
              data={{}}
            />
          </BtnWrapper>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#cad8f8",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <SideBarItems handleDrawerClose={handleDrawerClose} />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
