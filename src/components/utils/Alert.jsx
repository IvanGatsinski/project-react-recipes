import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { ErrorContext } from '../../contexts/index';

const AlertDismissible = ({ text }) => {
    const { error, setError } = useContext(ErrorContext);
    
    if (error) {
     setTimeout(() => { setError(false) }, 5000)
     return (
        <Alert variant="danger" onClose={() => setError(false)} dismissible>
            <p className="mb-0">{text}</p>
        </Alert>
    );
    }
    return (<></>);
}

export default AlertDismissible