import React, { useState } from 'react';
import { ErrorContext } from '../contexts/index';

const ErrorProvider = (props) => {
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    return (
        <ErrorContext.Provider 
        value={{error, setError, errorText, setErrorText}}>
            {props.children}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider;