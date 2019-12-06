import React, { useContext } from 'react';
import { ErrorContext, AuthContext, UserContext } from '../../../contexts/index';
import { useHistory } from 'react-router-dom';
import { useWait } from 'react-wait';
import useForm from 'react-hook-form';
import { authenticateUser } from '../../../api/auth';
import { Form, Button, Spinner } from 'react-bootstrap';
import { routes } from '../../../routes';
import FormErrorMessage from '../../utils/FormErrorMessage';
import Alert from '../../utils/Alert';

const LoginForm = () => {
    const history = useHistory()

    const { errorText, setError, setErrorText } = useContext(ErrorContext);
    const { setToken } = useContext(AuthContext);
    const { setUser } = useContext(UserContext)
    
    const { startWaiting, endWaiting, isWaiting, Wait} = useWait();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data, e) => {
        startWaiting('login')

        data.authType = 'login'
        try {
            const loggedInUser = await authenticateUser(data);

            setToken(loggedInUser.data._kmd.authtoken);
            localStorage.setItem('user', JSON.stringify(loggedInUser.data));
            setUser(localStorage.getItem('user'));
            
            e.target.reset();
            history.push(routes.home());
            endWaiting('login')
        } catch (error) {
            setError(true)
            setErrorText(error.toString())

            endWaiting('login')
        }
    }

    return (
        <>
        <h2 className="heading-descr">Log in</h2>
        <Alert text={errorText}/>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    name="username"
                    type="text" 
                    placeholder="Enter username" 
                    ref={register({ required: true })}/>
                {errors.username && errors.username.type === 'required' && <FormErrorMessage message="Username is required"/>}
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    ref={register({required: true})}/>
                {errors.password && errors.password.type === 'required' &&  <FormErrorMessage message="Password is required"/>}
                <Form.Text className="text-muted">
                We'll never share your password with anyone else.
                </Form.Text>
            </Form.Group>

            <Button disabled={isWaiting('login')} className="btn--min-width" variant="primary" type="submit">
                <Wait on="login" fallback={
                    <div>
                        <Spinner
                        className="mr-2"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />Logging
                    </div>
                }>
                    Login
                </Wait>
            </Button>
        </Form>
        </>
    )
}

export default LoginForm;