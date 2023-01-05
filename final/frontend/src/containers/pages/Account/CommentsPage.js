import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Stars from "../../../components/Stars";
import "../../../css/CommentsPage.css";
import logo from "../../../images/dinosaur.png";
import like from "../../../images/like.png";
import dislike from "../../../images/dislike.png";
// import homeLink from "../../../images/home.png"
// import { useNavigate } from "react-router-dom";

import { useAccount } from "../../hooks/useAccount";

import { v4 as uuidv4 } from "uuid";
import {
  GET_COMMENTS_QUERY,
  CREATE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
  COMMENT_ADDED_SUBSCRIPTION,
  UPDATE_LIKELIST_MUTATION,
  LIKELIST_UPDATED_SUBSCRIPTION,
} from "../../../graphql";
import { useMutation, useLazyQuery } from "@apollo/client";

const CommentsPage = () => {
  // const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  // const [comments, setComments] = useState([]);

  // each comment --> name, rating, content, likeNum
  // each user --> likeList
  const { me, comments, setComments, setAlertData } = useAccount();

  const [reQuery, { subscribeToMore }] = useLazyQuery(GET_COMMENTS_QUERY);

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
  const [updateComment] = useMutation(UPDATE_COMMENT_MUTATION);

  const [updateLikeList] = useMutation(UPDATE_LIKELIST_MUTATION);

  const fetchComments = async () => {
    const newComments = await reQuery();
    console.log(newComments.data.comments);
    setComments(newComments.data.comments);
  };

  const comment_added_notification = () => {
    try {
      subscribeToMore({
        document: COMMENT_ADDED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          console.log(prev);
          if (!subscriptionData.data) return prev;
          console.log(subscriptionData.data);
          const newComment = subscriptionData.data.commentAdded;
          console.log(newComment);
          setComments((pre) => {
            return [...pre, newComment];
          });
          return {
            comments: prev,
          };
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const likeList_updated_notification = () => {
    try {
      subscribeToMore({
        document: LIKELIST_UPDATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          console.log(prev);
          if (!subscriptionData.data) return prev;
          console.log(subscriptionData.data);
          const newComment = subscriptionData.data.likeListUpdated;
          console.log(newComment);
          setComments((pre) => {
            return pre.map((comment) =>
              comment.id === newComment.id ? newComment : comment
            );
          });
          return {
            comments: prev.comments.map((comment) =>
              comment.id === newComment.id ? newComment : comment
            ),
          };
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchComments();
    comment_added_notification();
    likeList_updated_notification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    if (content !== "" && rating !== 0) {
      storeComment();
      setRating(0);
      setContent("");
      setAlertData("Thanks for your comment!", "success");
    } else if (content === "") {
      setAlertData("Please enter your comment!", "error");
      // alert('Please enter your comment!');
    } else {
      setAlertData("Please enter your rating!", "error");
      // alert('Please enter your rating!');
    }
  };

  const storeComment = async () => {
    const newComment = {
      name: me,
      rating: rating,
      content: content,
      likeNum: 0,
    };
    await createComment({
      variables: {
        input: {
          id: uuidv4(),
          ...newComment,
        },
      },
    });
    fetchComments();
  };

  const handleDislike = async (id, likeNum) => {
    console.log("DisLike!");
    const newLikeNum = likeNum - 1;
    await updateComment({
      variables: {
        input: {
          id: id,
          likeNum: newLikeNum,
        },
      },
    });
    await updateLikeList({
      variables: {
        input: {
          username: me,
          id: id,
        },
      },
    });
    fetchComments();
  };

  const handleLike = async (id, likeNum) => {
    console.log("Like!");
    const newLikeNum = likeNum + 1;
    await updateComment({
      variables: {
        input: {
          id: id,
          likeNum: newLikeNum,
        },
      },
    });
    await updateLikeList({
      variables: {
        input: {
          username: me,
          id: id,
        },
      },
    });
    fetchComments();
  };

  // const backToHomePage = () => {
  //     navigate("/account/home");
  // }

  return (
    <div className="pageWrapper">
      <div className="inputContainer">
        <div className="inputField">
          <div className="title">
            <div
              className="nameTag"
              style={{ color: "black", fontSize: 25 + "px" }}
            >
              {me ? me : "Username"}
            </div>
            <ReactStars
              key={`stars_${rating}`}
              count={5}
              onChange={changeRating}
              size={36}
              activeColor="#ffd700"
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
            />
          </div>
          <textarea
            className="content"
            placeholder="Type your comment"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <img
          className="logo"
          alt="LOGO"
          src={logo}
          style={{ width: 50 + "%" }}
        />
      </div>

      <div className="commentsContainer">
        <div className="commentsField">
          {comments.map((comment, i) => {
            return (
              <div className="comment" key={i.toString() + comment.name}>
                <div className="commentName">
                  <div className="info">
                    <p className="name"> {comment.name} </p>
                    <Stars rating={comment.rating} displayScore={false} />
                  </div>
                </div>
                <p className="content"> {comment.content}</p>
                <div className="likeContainer">
                  {comment.likeList.includes(me) ? (
                    <img
                      className="like-icon"
                      alt="like"
                      src={like}
                      style={{ width: 45 + "%" }}
                      onClick={() => handleDislike(comment.id, comment.likeNum)}
                    />
                  ) : (
                    <img
                      className="like-icon"
                      alt="dislike"
                      src={dislike}
                      style={{ width: 45 + "%" }}
                      onClick={() => handleLike(comment.id, comment.likeNum)}
                    />
                  )}
                  <div className="likeNum">{comment.likeNum}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <img className="homeLink" src={homeLink} style={{width: 50+'px'}} onClick={backToHomePage}/> */}
    </div>
  );
};
export default CommentsPage;
