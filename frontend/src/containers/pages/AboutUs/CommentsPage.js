import React from 'react'
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Stars from '../../../components/Stars';
import "../../../css/CommentsPage.css"
import logo from "../../../images/dinosaur.png"
import like from "../../../images/like.png"
import dislike from "../../../images/dislike.png"

const CommentsPage = () => {
    const [rating, setRating] = useState(0)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [comments, setComments] = useState([]);

    const changeRating = (newRating) => {
        setRating(newRating)
    };

    const handleSubmit = () => {
        if((name !== '') && (content !== '') && (rating !== 0)){
            storeComment();

            setRating(0);
            setContent('');
        }
    }

    const storeComment = () => {
        const newComment = {name: name, rating: rating, content: content, like: false, likeNum: 0}
        setComments((prev) => [...prev, newComment])
    }

    return (
        <div className='pageWrapper'>
            <div className='inputContainer'>
                <div className='inputField'>
                    <div className='title'>
                        <input className='name' placeholder='Name' onChange={e => setName(e.target.value)} value={name} />
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
                                <>
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
                                            <img className='like-icon' src={like} style={{width:45 + '%'}} /> : 
                                            <img className='dislike-icon' src={dislike} style={{width:45 + '%'}} />
                                        }
                                        <div className='likeNum'>{comment.likeNum}</div>
                                    </div>
                                    
                                </div>
                                
                                <br></br>
                                </>
                            )
                        })
                    }
                </div>
                
            </div>
        </div>
    )
}
export default CommentsPage;