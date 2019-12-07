import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { loginGuest } from '../../api/utils'
import AllRecipes from '../recipes/HomeGallery';

const Home = () => {
    loginGuest()

    return (
        <>
            <h2 className="heading-descr mt-2">Choose the best recipe for you.</h2>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <AllRecipes/>
                </Row>
            </Container>
        </>
    )
}

export default Home