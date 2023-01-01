import React from 'react'
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Stars from '../../../components/Stars';

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
            setName('');
            setContent('');
        }
    }

    const storeComment = () => {
        const newComment = {name: name, rating: rating, content: content}
        setComments((prev) => [...prev, newComment])
    }

    return (
        <div className='commentContainer'>
            <div className='inputContainer'>
                <div className='title'>
                    <div className='fields'>
                        <input className='name' placeholder='Name' onChange={e => setName(e.target.value)} value={name} />
                        <ReactStars
                            key={`stars_${rating}`}
                            count={5}
                            onChange={changeRating}
                            size={18}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div className='submit'>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <textarea className='content' placeholder='Type your comment' onChange={e => setContent(e.target.value)} value={content} />
            </div>

            <div className='comments'>
                {
                    comments.map((comment, i) => (
                        <div className='comment' key={i.toString()+comment.name}>
                            <div className='title'>
                                <div className='info'>
                                    <p className='name'> {comment.name} </p>
                                    <Stars rating={comment.rating} displayScore={false} />
                                </div>
                            </div>
                            <p className='content'> {comment.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default CommentsPage;