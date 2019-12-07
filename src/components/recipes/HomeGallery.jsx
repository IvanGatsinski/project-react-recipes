import React, { useContext, useEffect } from 'react';
import { fetchAllRecipes } from '../../api/recipes';
import { RecipeContext } from '../../contexts/index';
import { Col, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Loader from '../utils/Loader';
import { routes } from '../../routes';

const AllRecipes = () => {
    const { recipes, setRecipes } = useContext(RecipeContext);

    useEffect(() => {
        fetchAllRecipes()
            .then(({ data }) => {
                setRecipes(data)
            })
            .catch(err => { throw err })
    }, []);

    useEffect(() => {
        return () => {
            setRecipes(null);
        }
    }, []);

    return recipes !== null ?
        recipes.map(recipe => (
            <Col xs={12} sm={6} md={4} lg={4} key={recipe._id}>
                <Card className="my-3">
                    <Card.Img className="main-gallery__card--height" variant="top" src={recipe.imgUrl} />
                    <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        <Card.Text>
                            {recipe.type}
                        </Card.Text>
                        <NavLink to={routes.viewRecipe(recipe._id)}>
                            <Button className="mr-2" variant="outline-info">
                                View Recipe
                        </Button>
                        </NavLink>
                    </Card.Body>
                    <Card.Footer>
                        Written by <span className="card-author">{recipe.author}</span>
                    </Card.Footer>
                </Card>
            </Col>
        )) : (<Loader />)
}

export default AllRecipes;