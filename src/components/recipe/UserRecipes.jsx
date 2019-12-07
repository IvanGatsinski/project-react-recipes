import React,{ useEffect, useContext } from 'react'
import { Container, Row, Col, CardGroup, Card, Button, ButtonToolbar, Spinner } from 'react-bootstrap';
import { useParams, NavLink } from 'react-router-dom';
import { useWait } from 'react-wait';
import { fetchUserRecipes, removeRecipe } from '../../api/recipes';
import { RecipeContext } from '../../contexts/index';
import Loader from '../utils/Loader';
import { routes } from '../../routes';

const UserRecipes = () => {

    const { id } = useParams();
    const { recipes, setRecipes } = useContext(RecipeContext);
    const { startWaiting, endWaiting, isWaiting, Wait } = useWait();

    useEffect(() => {
        fetchUserRecipes(id)
            .then(({ data }) => {
                setRecipes(data);
            })
            .catch(err => {throw err})
    }, [])

    useEffect(() => {
        return () => setRecipes(null);
    }, []);

    const deleteRecipe = async (recipeId) => {
        startWaiting(`delete recipe ${recipeId}`);

        try {
            await removeRecipe(recipeId);
            const updatedRecipes = await fetchUserRecipes(id);
            setRecipes(updatedRecipes.data);
            endWaiting(`delete recipe ${recipeId}`);
        } catch (error) {
            endWaiting(`delete recipe ${recipeId}`);
            throw error;
        }
    }

    const userRecipes = recipes !== null ?
    [...recipes].map(recipe => (
        <Row className="justify-content-center my-2" key={recipe._id}>
        <Col xs={12} md={8} lg={6}>
            <Card>
                <Card.Header as="h5">{recipe.name}</Card.Header>
                    <Card.Body>
                        <CardGroup className="mb-2">
                            <Card className="p-2">
                                <Card.Img variant="top" src={recipe.imgUrl} />
                            </Card>
                            <Card className="p-2">
                                <Card.Title>Recipe type: {recipe.type}</Card.Title>
                                <Card.Text>
                                    Cooking Time {recipe.cook_time}
                                    <br/>
                                    Created at: {new Date(recipe._kmd.ect).toLocaleDateString()}
                                </Card.Text>
                            </Card>
                        </CardGroup>
                        <ButtonToolbar>
                        <NavLink to={routes.viewRecipe(recipe._id)}>
                            <Button className="mx-2" variant="outline-info">
                                View
                            </Button>
                        </NavLink>
                        <NavLink to={routes.editRecipe(recipe._id)}>
                            <Button className="mx-2" variant="outline-success">Update</Button>
                        </NavLink>
                        <Button
                            disabled={isWaiting(`delete recipe ${recipe._id}`)}
                            onClick={() => deleteRecipe(recipe._id)}
                            className="btn--min-width mx-2 px-3"
                            variant="outline-danger">
                            <Wait on={`delete recipe ${recipe._id}`} fallback={
                                <div>
                                    <Spinner
                                    className="mr-2"
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />Deleting
                                </div>
                            }>
                            Delete
                            </Wait>
                        </Button>
                        </ButtonToolbar>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )) : 
    false
    
    return (
        <Container className="mt-3">
            {Array.isArray(userRecipes) ? 
            (userRecipes.length > 0 ? userRecipes : <h2 className="heading-descr mt-2">You haven't any recipes yet.</h2>)
            : 
            <Row className="justify-content-center mt-5">
                <Loader/>
            </Row>}
        </Container>
    )
}

export default UserRecipes;