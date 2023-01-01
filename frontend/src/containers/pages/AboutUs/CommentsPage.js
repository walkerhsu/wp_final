import React from 'react'
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Stars from '../../../components/Stars';
import "../../../css/CommentsPage.css"

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
        const newComment = {name: name, rating: rating, content: content}
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
                <div className="logo-image" />
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