import React,{ Fragment, useContext } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { removeComment, fetchRecipeComments } from '../../api/comments';
import { CommentContext, UserContext } from '../../contexts/index';
import { FaRegWindowClose, FaEdit } from 'react-icons/fa';
import { useWait } from 'react-wait';
import { routes } from '../../routes';

function ListComments() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const { comments, setComments } = useContext(CommentContext);
    const { startWaiting, endWaiting, isWaiting, Wait } = useWait();

    const deleteComment = async (commentId) => {
        startWaiting(`deleting comment ${commentId}`);
        await removeComment(commentId);

        const updatedComments = await fetchRecipeComments(id);
        setComments(updatedComments.data);

        endWaiting(`deleting comment ${commentId}`);
    }

    return (
        <>
            {comments !== null ?
                comments.map(comment => {
                    return <ListGroup.Item
                        className="comment-item p-4 pt-4"
                        key={comment._id}
                        variant="info">{comment.content}
                        <span className="comment-item__author">
                            Author: {comment.author}
                        </span>
                        {comment._acl.creator === JSON.parse(user)._id ?
                            <Fragment>
                                <div className={isWaiting(`deleting comment ${comment._id}`) ? 'edit-comment--hide' : ''}>
                                    <NavLink to={routes.editComment(comment._id)} className="comment-item__icon--update">
                                        <Button className="comment-item__btn">
                                            <FaEdit />
                                        </Button>
                                    </NavLink>
                                </div>
                                <Button
                                    onClick={() => deleteComment(comment._id)}
                                    disabled={isWaiting(`deleting comment ${comment._id}`)}
                                    className="comment-item__icon--delete">
                                    <Wait on={`deleting comment ${comment._id}`} fallback={<div></div>}>
                                        <FaRegWindowClose />
                                    </Wait>
                                </Button>
                            </Fragment>
                            : false}
                    </ListGroup.Item>
                }) : (<div></div>)}
        </>
    )
}

export default ListComments;