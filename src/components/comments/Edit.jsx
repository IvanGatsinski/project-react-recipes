import React, { useEffect, useContext } from 'react';
import { CommentContext } from '../../contexts/index';
import useForm from 'react-hook-form';
import { useWait } from 'react-wait';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { fetchComment, updateComment } from '../../api/comments';
import Loader from '../utils/Loader';
import FormErrorMessage from '../utils/FormErrorMessage';

const EditComment = () => {

  const { id } = useParams();
  const { comment, setComment } = useContext(CommentContext);
  const { register, handleSubmit, errors } = useForm();
  const { startWaiting, endWaiting, isWaiting, Wait } = useWait();

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const currentComment = await fetchComment(id);
        setComment(currentComment)
      } catch (error) {
        throw error;
      }
    })()
  }, []);

  useEffect(() => {
    return () => setComment(null);
  }, []);

  const onSubmit = async (formData, e) => {
    startWaiting('edit comment')

    const updatedComment = {
      content: formData.comment,
      author: comment.data.author,
      recipe_id: comment.data.recipe_id
    };

    (async () => {
      try {
        await updateComment(id, updatedComment);
        history.goBack()
        endWaiting('edit comment')
      } catch (error) {
        endWaiting('edit comment')
        throw error;
      }
      e.target.reset()
    })()
  }

  return (
    <>
      <h2 className="heading-descr mt-2">Edit your comment.</h2>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} className="text-center">
            {comment !== null ?
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    defaultValue={comment.data.content}
                    name="comment"
                    ref={register({ required: true, pattern: /^(?!\s)([\w\,\.\s]){3,}$/ })}
                  />
                  {errors.comment && errors.comment.type === 'required' && <FormErrorMessage message="comment should not be empty" />}
                  {errors.comment && errors.comment.type === 'pattern' && <FormErrorMessage message="invalid message" />}
                  <Form.Text className="text-muted">
                    Write your own comment about this recipe.
                  </Form.Text>
                </Form.Group>
                <Button className="mr-1" variant="primary" onClick={() => history.goBack()}>
                  Close
                </Button>
                <Button disabled={isWaiting('edit comment')} variant="success" type="submit">
                  <Wait on="edit comment" fallback={
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
                    Save Changes
                  </Wait>
                </Button>
              </Form> :
              <Loader />}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EditComment;