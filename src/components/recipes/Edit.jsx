import React, { useContext, useEffect } from 'react';
import { useWait } from 'react-wait';
import { RecipeContext, UserContext } from '../../contexts/index';
import { Form, ButtonToolbar, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { fetchRecipe, updateRecipe } from '../../api/recipes';
import { routes } from '../../routes';
import Loader from '../utils/Loader';
import FormErrorMessage from '../utils/FormErrorMessage';

const EditRecipe = () => {

    const history = useHistory()
    const { id } = useParams();
    const { register, handleSubmit, errors } = useForm();
    const { startWaiting, endWaiting, isWaiting, Wait } = useWait();
    const { user } = useContext(UserContext);
    const { recipe, setRecipe } = useContext(RecipeContext);

    useEffect(() => { 
        (async () => {
            const fetchedRecipe = await fetchRecipe(id);
            setRecipe(fetchedRecipe.data)
        })()
    }, []);

    useEffect(() => {
        return () => setRecipe(null);
    }, []);

    const onSubmit = async (formData, e) => {
        startWaiting('edit recipe')

        let recipeData = {
            author: JSON.parse(user).username,
            name: formData.recipe,
            type: formData.type,
            description: formData.description,
            imgUrl: formData.imgUrl,
            cook_time: formData.time,
            ingredients: [],
        };

        for (const key in formData) {
            if (key !== 'name' && 
                key !== 'type' && 
                key !== 'description' && 
                key !== 'imgUrl' && 
                key !== 'time') {
                recipeData.ingredients.push(formData[key]);
            }
        };

        try {
            await updateRecipe(id,recipeData);
            
            history.push(routes.userRecipes(JSON.parse(user)._id));
            endWaiting('edit recipe');
        } catch (error) {
            endWaiting('edit recipe');
            throw error;
        }
        e.target.reset()
    }

    const formRecipe = recipe !== null ? 
    (
        <Row className="justify-content-center">
        <Col xs="6">
    <Form onSubmit={handleSubmit(onSubmit)} className="my-5">
        {recipe.ingredients.map((ingr, index) => {
            const ingredient = `ingredient-${index}`
            return (
                <Form.Group key={index}>
                    <Form.Label>Ingredient</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Add ingredient" 
                        defaultValue={ingr}
                        name={ingredient}
                        ref={register({required: true, pattern: /^(?!\s).{3,}$/})}
                    />
                    {errors[`${ingredient}`] && errors[`${ingredient}`].type === 'required' &&  <FormErrorMessage message="Ingredient content is required"/>}
                    {errors[`${ingredient}`] && errors[`${ingredient}`].type === 'pattern' &&  <FormErrorMessage message="Invalid content"/>}
                    <Form.Text className="text-muted">
                        Example: 3 eggs or 250ml milk, ect...
                    </Form.Text>
                </Form.Group>
            )
        })}
        <Form.Group>
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control 
                    type="text" 
                    placeholder="Recipe name"
                    defaultValue={recipe.name}
                    name="recipe"
                    ref={register({required: true, pattern: /^(?!\s)([a-zA-Z\s]){5,}$/})}
                    />
                {errors.recipe && errors.recipe.type === 'required' &&  <FormErrorMessage message="Recipe content is required"/>}
                {errors.recipe && errors.recipe.type === 'pattern' &&  <FormErrorMessage message="Invalid content"/>}
            <Form.Text className="text-muted">
            Copy-paste the image-url.
            </Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Recipe Type</Form.Label>
            <Form.Control defaultValue={recipe.type} as="select" name="type" ref={register}>
                <option>Salads</option>
                <option>Soups</option>
                <option>Main Meals</option>
                <option>Desserts</option>
            </Form.Control>
        </Form.Group>

        <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
                defaultValue={recipe.imgUrl}
                type="text" 
                placeholder="Image URL" 
                name="imgUrl"
                ref={register({required: true, pattern: /^(?!\s).{5,}$/})}
                />
            {errors.imgUrl && errors.imgUrl.type === 'required' &&  <FormErrorMessage message="Recipe image is required"/>}
            {errors.imgUrl && errors.imgUrl.type === 'pattern' &&  <FormErrorMessage message="Invalid content"/>}
            <Form.Text className="text-muted">
            Copy-paste the image-url.
            </Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Describe recipe</Form.Label>
            <Form.Control 
                    defaultValue={recipe.description}
                    as="textarea" 
                    rows="3"
                    placeholder="Enter recipe description" 
                    name="description"
                    ref={register({required: true, pattern: /^(?!\s).{3,}$/gm})}
                />
                {errors.description && errors.description.type === 'required' &&  <FormErrorMessage message="Recipe description is required"/>}
                {errors.description && errors.description.type === 'pattern' &&  <FormErrorMessage message="Invalid content"/>}
            <Form.Text className="text-muted">
            Describe how to cook your recipe.
            </Form.Text>
        </Form.Group>

        <Form.Group>
            <Form.Label>Avarage cooking time</Form.Label>
            <Form.Control 
                    defaultValue={recipe.cook_time}
                    type="text" 
                    placeholder="Cooking time" 
                    name="time"
                    ref={register({required: true, pattern: /^(?!\s).{3,}$/})}
                />
                {errors.time && errors.time.type === 'required' &&  <FormErrorMessage message="Recipe cooking time is required"/>}
                {errors.time && errors.time.type === 'pattern' &&  <FormErrorMessage message="Invalid content"/>}
            <Form.Text className="text-muted">
            What is the avarage time to cook this meal by this recipe.
            </Form.Text>
        </Form.Group>
        <ButtonToolbar>
            <Button disabled={isWaiting('edit recipe')} className="mr-1 btn--min-width" variant="success" type="submit">
                <Wait on="edit recipe" fallback={
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
                Save
                </Wait>
            </Button>
            <Button onClick={() => history.goBack()} className="btn--min-width" variant="primary" type="submit">
                Cancel
            </Button>
        </ButtonToolbar>
    </Form>
    </Col>
    </Row>)
    : 
    (<Row className="justify-content-center mt-5">
        <Loader/>
    </Row>)

    return (
        <>
            <h2 className="heading-descr mt-2">Edit your recipe</h2>
            <Container>
                {formRecipe}
            </Container>
        </>
    )
}

export default EditRecipe;