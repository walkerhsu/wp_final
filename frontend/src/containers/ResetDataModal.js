import React from "react";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "react-spring";
import ResetDataForm from "../components/ResetDataForm";

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

const resetDataModal = ({ open, handleModalClose, onSubmitEdit, data }) => {
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <ResetDataForm
          handleModalClose={handleModalClose}
          onSubmitEdit={onSubmitEdit}
          data={data}
        />
      </Fade>
    </Modal>
  );
};

export default resetDataModal;
