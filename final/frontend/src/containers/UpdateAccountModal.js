import * as React from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";

import { useSpring, animated } from "react-spring";

import UpdateAccountForm from "../components/UpdateAccountForm";
import { useAccount } from "./hooks/useAccount";
import { GET_CATEGORY_QUERY, CATEGORY_ADDED_SUBSCRIPTION } from "../graphql";

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

export default function UpdateAccountModal({
  open,
  handleModalClose,
  onSubmitEdit,
  data,
  title,
}) {
  const { me, setCategories } = useAccount();
  const { data: categoryData, subscribeToMore } = useQuery(GET_CATEGORY_QUERY, {
    variables: { username: me },
  });
  useEffect(() => {
    if(!categoryData) return
    subscribeToMore({
      document: CATEGORY_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedCategory = subscriptionData.data.categoryAdded.categories;
        console.log("updatedCategory", updatedCategory);
        return {
          category: {
            categories: updatedCategory,
          },
        };
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeToMore, categoryData]);
  // console.log("categoryData", categoryData);
  const categories = categoryData ? categoryData.category.categories : [];
  setCategories(categories);
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <UpdateAccountForm
          handleModalClose={handleModalClose}
          onSubmitEdit={onSubmitEdit}
          data={data}
          title={title}
          categories={categories}
        />
      </Fade>
    </Modal>
  );
}
