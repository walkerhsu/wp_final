import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring";

import UpdateAccountForm from "../components/UpdateAccountForm";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const btnStyle = {
  position: "absolute",
  borderRadius: "8px",
  right: "0",
  transform: "translate(-25%,-50%)",
  backgroundColor: "#32b5b2",
  color: "white",
  "&:hover": {
    backgroundColor: "#2ba2a0",
  },
};

export default function UpdateAccountModal() {
  // console.log("UpdateAccountModal")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={btnStyle}
      >
        Create New data 
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <UpdateAccountForm
            handleModalClose={handleClose}
          />
          {/* <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              something here
            </Typography>
          </Box> */}
        </Fade>
      </Modal>
    </div>
  );
}
