import React, { Fragment, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { AuthContext, UserContext } from '../../contexts/index';
import { MdSentimentSatisfied } from "react-icons/md"
import { routes } from '../../routes';

const Navigation = () => {

    const { isAuth, destroyToken } = useContext(AuthContext);
    const { user, setUser, destroyUserSession } = useContext(UserContext);
    
    useEffect(() => {
      setUser(localStorage.getItem('user'));
    }, [])

    const username = user !== null ? JSON.parse(user).username : false;
    const routeToMyRecipes = user !== null ? routes.userRecipes(JSON.parse(user)._id) : '#'

    const logout = () => {
      destroyToken();
      destroyUserSession();
    }

    const welcomeMessage = isAuth ? 
    (<Navbar.Brand>
      <span className="welcome-msg">Welcome,</span> <span className="card-author">{username}</span> <MdSentimentSatisfied/>
    </Navbar.Brand>) : (<></>)

    const authMenuBtns = isAuth ? 
    (<Fragment>
      <NavLink className="mx-3 menu-link__dash--animated" to={routes.home()}>Home</NavLink>
      <NavLink className="mx-3 menu-link__dash--animated" to={routeToMyRecipes}>My recipes</NavLink>
      <NavLink className="mx-3 menu-link__dash--animated" to={routes.createRecipe()}>Create recipe</NavLink>
      <NavLink to={routes.logout()}
        onClick={logout}
        className="ml-3 menu-link__dash--animated">Logout
      </NavLink>
    </Fragment>) :
    (<Fragment>
          <NavLink className="mx-3 menu-link__dash--animated" to={routes.home()}>Home</NavLink>
          <NavLink className="mx-3 menu-link__dash--animated" to={routes.login()}>
            Login
          </NavLink>
          <NavLink className="mx-3 menu-link__dash--animated" to={routes.register()}>
            Register
          </NavLink>
    </Fragment>)


    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Row className="nav-row align-items-center justify-content-space-between">
            <Col>
              {welcomeMessage}
            </Col>
            <Col className="nav-col pr-0">
              <Nav className="align-items-center">
                {authMenuBtns}
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    )
}
export default Navigation