import React, { useEffect } from 'react'
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Stars from '../../../components/Stars';
import "../../../css/CommentsPage.css"
import logo from "../../../images/dinosaur.png"
import like from "../../../images/like.png"
import dislike from "../../../images/dislike.png"
// import homeLink from "../../../images/home.png"
// import { useNavigate } from "react-router-dom";

import { useAccount } from "../../hooks/useAccount";

import {v4 as uuidv4} from 'uuid';
import { GET_COMMENTS_QUERY, CREATE_COMMENT_MUTATION, UPDATE_COMMENT_MUTATION, COMMENT_ADDED_SUBSCRIPTION } from "../../../graphql";
import { useMutation, useLazyQuery } from "@apollo/client";


const CommentsPage = () => {
    // const navigate = useNavigate();
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState('')
    // const [comments, setComments] = useState([]);
    
    // each comment --> name, rating, content, likeNum
    // each user --> likeList 
    const { me, comments, likeList, setComments, setLikeList } = useAccount();

    const [reQuery, { data, loading, subscribeToMore }] = useLazyQuery(GET_COMMENTS_QUERY);

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
    const [updateComment] = useMutation(UPDATE_COMMENT_MUTATION);

    const fetchComments = async () => {
        const newComments = await reQuery();
        console.log(newComments.data.comments);
        setComments(newComments.data.comments);
    }

    const notification = () => {
        try {
            subscribeToMore({
                document: COMMENT_ADDED_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    console.log(prev)
                    if (!subscriptionData.data) return prev;
                    console.log(subscriptionData.data)
                    const newComment = subscriptionData.data.commentAdded;
                    console.log(newComment)
                    setComments((pre) => {return [...pre, newComment]})
                    return {
                        comments: [prev, newComment];
                    };
                },
            });
        }
        catch (e) {
            console.log(e)
        } 
    }

    useEffect(() => {
        fetchComments();
        notification();
    },[])

    const changeRating = (newRating) => {
        setRating(newRating)
    };

    const handleSubmit = () => {
        if((content !== '') && (rating !== 0)){
            storeComment();
            setRating(0);
            setContent('');
        }
    }

    const storeComment = async () => {
        const newComment = {name: me, rating: rating, content: content, likeNum: 0};
        await createComment({
            variables: {
                input: {
                    id: uuidv4(),
                    ...newComment,
                }
            },
        });
        fetchComments();
    }

    const handleDislike = () => {

    }

    const handleLike = () => {

    }

    // const backToHomePage = () => {
    //     navigate("/account/home");
    // }

    return (
        <div className='pageWrapper'>
            <div className='inputContainer'>
                <div className='inputField'>
                    <div className='title'>
                        <div className='nameTag' style={{color: "black" ,fontSize: 25+'px'}}>
                            { me ? me : 'Username' }
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
                    <textarea className='content' placeholder='Type your comment' onChange={e => setContent(e.target.value)} value={content} />
                    <div className='submit'>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <img className='logo' alt='LOGO' src={logo} style={{width:50 + '%'}} />
            </div>

            <div className='commentsContainer'>
                <div className='commentsField'>
                    {
                        comments.map((comment, i) => {
                            return (
                                <div className='comment' key={i.toString()+comment.name}>
                                    <div className='commentName'>
                                        <div className='info'>
                                            <p className='name'> {comment.name} </p>
                                            <Stars rating={comment.rating} displayScore={false} />
                                        </div>
                                    </div>
                                    <p className='content'> {comment.content}</p>
                                    <div className='likeContainer'>
                                        {
                                            comment.like? 
                                            <img className='like-icon' src={like} style={{width:45 + '%'}} 
                                            onClick={handleDislike}/> 
                                            : 
                                            <img className='dislike-icon' src={dislike} style={{width:45 + '%'}} 
                                            onClick={handleLike}/>
                                        }
                                        <div className='likeNum'>{comment.likeNum}</div>
                                    </div>
                                </div>
                                
                            )
                        })
                    }
                </div>
                
            </div>
            {/* <img className="homeLink" src={homeLink} style={{width: 50+'px'}} onClick={backToHomePage}/> */}
        </div>
    )
}
export default CommentsPage;