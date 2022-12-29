import * as React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
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


export default function UpdateAccountModal({open, handleModalClose, data}) {
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <UpdateAccountForm handleModalClose={handleModalClose} data={data} />
      </Fade>
    </Modal>
  );
}
