import React, { useContext, useEffect } from 'react';
import { RecipeContext } from '../../contexts/index';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { MdAccessAlarm } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../../api/recipes';
import uuid from 'uuid';
import CommentSection from '../comments/Section';
import Loader from '../utils/Loader';

const ViewRecipe = () => {
    const { id } = useParams();
    const { recipe, setRecipe } = useContext(RecipeContext);

    useEffect(() => {
        (async () => {
            const fetchedRecipe = await fetchRecipe(id);
            setRecipe(fetchedRecipe.data)
        })()
    }, []);

    useEffect(() => {
        return () => {
            setRecipe(null);
        }
    }, []);

    return (
        <Container>
            {recipe !== null ?
                <Row className="justify-content-center my-3">
                    <CommentSection />
                    <Col xs={12} sm={12} md={8} lg={5}>
                        <Card>
                            <Card.Img variant="top" src={recipe.imgUrl} />
                            <Card.Body>
                                <Card.Title className="text-center">{recipe.name}</Card.Title>
                                <div className="text-center mb-4">
                                    <ListGroup.Item
                                        className="cooking-time"
                                        variant="warning">
                                        Cooking Time: {recipe.cook_time}
                                        <MdAccessAlarm className="cooking-time__icon" />
                                    </ListGroup.Item>
                                </div>
                                <Card.Text>
                                    {recipe.description}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="card__footer">
                                <small className="text-muted">By <strong>{recipe.author}</strong>
                                </small>
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
                <Row className="justify-content-center mt-5">
                    <Loader />
                </Row>}
        </Container>
    )
}

export default ViewRecipe;