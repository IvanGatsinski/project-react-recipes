import React, { useState, useContext } from 'react';
import useForm from 'react-hook-form';
import { useWait } from 'react-wait';
import { UserContext } from '../../contexts/index';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import uuid from 'uuid';
import { addRecipe } from '../../api/recipes';
import FormErrorMessage from '../utils/FormErrorMessage';
import { routes } from '../../routes';

const CreateRecipe = () => {

    const history = useHistory();
    const { user } = useContext(UserContext);
    const { startWaiting, endWaiting, isWaiting, Wait } = useWait();
    const [inputCount, setInputCount] = useState([{
        id: uuid(),
    }]);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (formData, e) => {
        startWaiting('add recipe');

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
            if (key !== 'recipe' && 
                key !== 'type' && 
                key !== 'description' && 
                key !== 'imgUrl' && 
                key !== 'time') {
                recipeData.ingredients.push(formData[key]);
            }
        };

        try {
            await addRecipe(recipeData);
            history.push(routes.home());
            endWaiting('add recipe');
        } catch (error) {
            endWaiting('add recipe');
            throw error;
        }
        e.target.reset()
    }
    
    const addIngredient = () => {   
        setInputCount([...inputCount, { id: uuid() }]);
    }
    const removeIngredient = (id) => {
        setInputCount(
            [...inputCount].filter(input => input.id !== id)
        );
    }

    const ingredientsInputFields = () => {

       return inputCount.map(input => {
            const ingredient = `ingredient-${input.id}`
            return (
                <Form.Group key={input.id}>
                    <Form.Label>Ingredient</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Add ingredient" 
                        name={ingredient}
                        ref={register({required: true, pattern: /^(?!\s).{3,}$/})}
                    />
                    {errors[`${ingredient}`] && errors[`${ingredient}`].type === 'required' &&  <FormErrorMessage message="Ingredient content is required"/>}
                    {errors[`${ingredient}`] && errors[`${ingredient}`].type === 'pattern' &&  <FormErrorMessage message="Invalid content"/>}
                    <Form.Text className="text-muted">
                        Example: 3 eggs or 250ml milk, ect...
                    </Form.Text>
                        <Button 
                        onClick={() => { removeIngredient(input.id)} } 
                        disabled={inputCount.length <= 1 ? true : false}
                        variant="warning"
                        size="sm"
                        >
                        Remove ingredient
                        </Button>
                </Form.Group>
            )
        })
    };

    return (
        <>
        <h2 className="heading-descr mt-2">Write your own recipe.</h2>
        <Container>
            <Row className="justify-content-center">
                <Col xs="6">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Recipe name" 
                                name="recipe"
                                ref={register({required: true, pattern: /^(?!\s)([a-zA-Z\s]){5,}$/})}
                            />
                            {errors.recipe && errors.recipe.type === 'required' &&  <FormErrorMessage message="Recipe content is required"/>}
                            {errors.recipe && errors.recipe.type === 'pattern' &&  <FormErrorMessage message="Invalid content"/>}
                            <Form.Text className="text-muted">
                            Copy-paste the image-url.
                            </Form.Text>
                        </Form.Group>

                        <Button
                         onClick={addIngredient}
                         variant="success"
                         className="my-3"
                         size="sm"
                         >Add ingredient
                        </Button>
                        {ingredientsInputFields()}

                        <Form.Group>
                            <Form.Label>Recipe Type</Form.Label>
                            <Form.Control as="select" name="type" ref={register}>
                                <option>Salads</option>
                                <option>Soups</option>
                                <option>Main Meals</option>
                                <option>Desserts</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control 
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

                        <Button disabled={isWaiting('add recipe')} variant="primary" type="submit">
                        <Wait on="add recipe" fallback={
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
                            Create recipe
                        </Wait>
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    )
}
export default CreateRecipe;