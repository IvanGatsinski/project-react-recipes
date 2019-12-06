import React, { useContext } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useWait } from 'react-wait';
import { Form, Button, Spinner } from 'react-bootstrap';
import { authenticateUser } from '../../../api/auth';
import FormErrorMessage from '../../utils/FormErrorMessage';
import { ErrorContext } from '../../../contexts/index';
import Alert from '../../utils/Alert';
import { routes } from '../../../routes';

const RegisterForm = () => {

    const history = useHistory();
    const { errorText, setError, setErrorText } = useContext(ErrorContext);
    const { startWaiting, endWaiting, isWaiting, Wait } = useWait();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data, e) => {
        startWaiting('register')

        data.recipe_ids = [];
        data.authType = 'register';

        try {
            await authenticateUser(data);
            history.push(routes.login())
            endWaiting('register');

        } catch (error) {
            setError(true)
            setErrorText(error.toString())
            endWaiting('register');
            throw error;
        }
        e.target.reset();
    }

    return (
        <>
            <h2 className="heading-descr">Register</h2>
            <Alert text={errorText}/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        ref={register({ required: true, minLength: 3, maxLength: 9, pattern: /^[^\s]+$/ })} />
                    {errors.username && errors.username.type === 'required' && <FormErrorMessage message="Username is required"/>}
                    {errors.username && errors.username.type === 'minLength' &&  <FormErrorMessage message="Username must be at least 3 characters long"/>}
                    {errors.username && errors.username.type === 'maxLength' && <FormErrorMessage message="Username must be up to 9 characters long"/>}
                    {errors.username && errors.username.type === 'pattern' && <FormErrorMessage message="Username should not contain any whitespaces"/>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                    {errors.email && errors.email.type === 'required' && <FormErrorMessage message="E-mail is required"/>}
                    {errors.email && errors.email.type === 'pattern' && <FormErrorMessage message="Invalid e-mail"/>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        ref={register({ required: true, minLength: 3, maxLength: 9, pattern: /^[^\s]+$/ })} />
                    {errors.password && errors.password.type === 'required' && <FormErrorMessage message="Password is required"/>}
                    {errors.password && errors.password.type === 'minLength' && <FormErrorMessage message="Password must be at least 3 characters long"/>}
                    {errors.password && errors.password.type === 'maxLength' && <FormErrorMessage message="Password must be up to 9 characters long"/>}
                    {errors.password && errors.password.type === 'pattern' && <FormErrorMessage message="Password should not contain any whitespaces"/>}
                    <Form.Text className="text-muted">
                        We'll never share your password with anyone else.
                </Form.Text>
                </Form.Group>

                <Button disabled={isWaiting('register')} className="btn--min-width" variant="primary" type="submit">
                    <Wait on="register" fallback={
                        <div>
                            <Spinner
                                className="mr-2"
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />Registering
                    </div>
                    }>
                        Register
                </Wait>
                </Button>
            </Form>
        </>
    )
}

export default RegisterForm;