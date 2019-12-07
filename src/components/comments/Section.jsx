import React, { useEffect, useContext } from 'react';
import ListComments from './ListComments';
import { UserContext, CommentContext } from '../../contexts/index';
import { Col, Card, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useWait } from 'react-wait';
import { addComment, fetchRecipeComments } from '../../api/comments';
import useForm from 'react-hook-form';
import FormErrorMessage from '../utils/FormErrorMessage';

function SectionComments() {
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const { setComments } = useContext(CommentContext);
    const { startWaiting, endWaiting, isWaiting, Wait } = useWait();
    const { register, handleSubmit, errors } = useForm();

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
            const comments = await fetchRecipeComments(id); 
            setComments(comments.data);
        })()
    }, []);

    useEffect(() => {
        return () => {
            setComments(null);
        }
    }, []);

    return (
        <Col xs={12} sm={12} md={4} lg={3}>
            <Card>
                <Card.Header className="text-center">Comments</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                placeholder="Add a comment."
                                name="comment"
                                ref={register({ required: true, pattern: /^(?!\s)([\w\,\.\s]){3,}$/ })}
                            />
                            {errors.comment && errors.comment.type === 'required' && <FormErrorMessage message="comment should not be empty" />}
                            {errors.comment && errors.comment.type === 'pattern' && <FormErrorMessage message="invalid message" />}
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
                                    </div>}>
                                    Add comment
                                </Wait>
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <ListGroup>
                    <ListComments/>
                </ListGroup>
            </Card>
        </Col>
    )
}

export default SectionComments