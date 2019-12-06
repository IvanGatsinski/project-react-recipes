import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import img_not_found from './sad_cook.jpeg';

export default function NotFound() {
    return (
        <>
            <h2 className="heading-descr mt-5 text-center">Error 404 <br/> Page was not found.</h2>
            <Container>
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <img src={img_not_found} alt="img404"/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}