import React, { Fragment, useContext, useEffect } from 'react';
import { useWait } from 'react-wait';
import useForm from 'react-hook-form';
import { UserContext, RecipeContext, CommentContext } from '../../contexts/index';
import { Container, Button, Spinner, Form, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { MdAccessAlarm } from 'react-icons/md';
import { FaRegWindowClose, FaEdit } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import { fetchRecipe } from '../../api/recipes';
import { addComment, fetchRecipeComments, removeComment } from '../../api/comments';
import { routes } from '../../routes';
import uuid from 'uuid';
import Loader from '../utils/Loader';
import FormErrorMessage from '../utils/FormErrorMessage';

const ViewRecipe = () => {

    const { id } = useParams();
    const { startWaiting, endWaiting, isWaiting, Wait } = useWait();
    const { register, handleSubmit, errors } = useForm();
    const { user } = useContext(UserContext);
    const { recipe, setRecipe } = useContext(RecipeContext);
    const { comments, setComments } = useContext(CommentContext);

    const onSubmit = async (formData, e) => {
        startWaiting('adding comment');

        const username = JSON.parse(user).username;
        const comment = {
            author: username,
            content : formData.comment,
            recipe_id : id,
        }
        try {
            await addComment(comment);
            const updatedComments = await fetchRecipeComments(id);
            
            setComments(updatedComments.data);
            endWaiting('adding comment')
        } catch (error) {
            endWaiting('adding comment')
            throw error;
        }
        e.target.reset()
    }

    useEffect(() => { 
        (async () => {
            const fetchedRecipe = await fetchRecipe(id);
            const comments = await fetchRecipeComments(id);
            setRecipe(fetchedRecipe.data)     
            setComments(comments.data);
        })()
    }, []);

    useEffect(() => {
        return () => {
            setRecipe(null);
            setComments(null);
        }
    }, []);
    
    const deleteComment = async (commentId) => {
        startWaiting(`deleting comment ${commentId}`);

        await removeComment(commentId);
        const updatedComments = await fetchRecipeComments(id);
        setComments(updatedComments.data);

        endWaiting(`deleting comment ${commentId}`);
    }

    const commentsJSX = comments !== null ? 
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
    }) : (<div></div>)

    const recipeJSX = recipe !== null ? 
    <Row className="justify-content-center my-3">
        <Col xs={12} sm={12} md={4} lg={3}>
            <Card>
                <Card.Header className="text-center">Comments</Card.Header>
                <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group> 
                        <Form.Control 
                            as="textarea" 
                            rows="3"
                            placeholder="Write comment..." 
                            name="comment"
                            ref={register({required: true, pattern: /^(?!\s)([\w\,\.\s]){3,}$/})}
                        />
                        {errors.comment && errors.comment.type === 'required' &&  <FormErrorMessage message="comment should not be empty"/>}
                        {errors.comment && errors.comment.type === 'pattern' &&  <FormErrorMessage message="invalid message"/>}
                        <Form.Text className="text-muted">
                        Write your own comment about this recipe.
                        </Form.Text>
                    </Form.Group>
                    <div className="add-comment">
                    <Button disabled={isWaiting('adding comment')} variant="outline-primary" type="submit">
                        <Wait on="adding comment" fallback={
                            <div>
                                <Spinner
                                className="mr-2"
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />Loading...
                            </div>
                        }>
                            Add comment
                        </Wait>
                    </Button>
                    </div>
                </Form>
                </Card.Body>
                <ListGroup>
                    {commentsJSX}
                </ListGroup>
            </Card>
        </Col>
        <Col xs={12} sm={12} md={8} lg={5}>
            <Card>
                <Card.Img variant="top" src={recipe.imgUrl} />
                <Card.Body>
                <Card.Title className="text-center">{recipe.name}</Card.Title>
                    <div className="text-center mb-4">
                        <ListGroup.Item className="cooking-time" variant="warning">Cooking Time: {recipe.cook_time} <MdAccessAlarm className="cooking-time__icon"/></ListGroup.Item>
                    </div>
                <Card.Text>
                    {recipe.description}
                </Card.Text>
                </Card.Body>
                <Card.Footer className="card__footer">
                <small className="text-muted">By <strong>{recipe.author}</strong></small>
                </Card.Footer>
            </Card>
        </Col>
        <Col xs={12} sm={12} md={4} lg={3}>
            <Card>
                <Card.Header className="text-center">Needed Products</Card.Header>
                <ListGroup>
                    {recipe.ingredients.map(ingredient => {
                        return <ListGroup.Item key={uuid()} variant="light">
                            {ingredient}
                            </ListGroup.Item>
                    })}
                </ListGroup>
            </Card>
        </Col>
    </Row> : 
    (<Row className="justify-content-center mt-5">
        <Loader/>
    </Row>)

    return (
        <Container>
            {recipeJSX}
        </Container>
    )
}

export default ViewRecipe;