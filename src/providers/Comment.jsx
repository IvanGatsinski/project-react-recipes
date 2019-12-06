import React, { useState } from 'react';
import { CommentContext } from '../contexts/index';

const CommentProvider = ({ children }) => {

    const [comments, setComments] = useState(null)
    const [comment, setComment] = useState(null)
    return (
        <CommentContext.Provider value={{ comment, comments, setComment, setComments }}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider