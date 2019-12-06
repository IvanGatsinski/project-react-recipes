import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({children}) => {

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;