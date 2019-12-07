import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import Home from './components/common/Home';
import Login from './components/auth/login/Index';
import Register from './components/auth/register/Index';
import CreateRecipe from './components/recipe/Create';
import ViewRecipe from './components/recipe/View';
import EditRecipe from './components/recipe/Edit';
import UserRecipes from './components/recipe/UserRecipes';
import EditComment from './components/comments/Edit';
import PrivateRoute from './components/helpers/PrivateRoute';
import NotFound from './components/404/NotFound';
import Provider from './providers/index';
require('dotenv').config();

function App() {

  return (
    <Router>
      <Provider>
        <Navigation />
          <MainContainer>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/logout" render={props =>
                <Redirect to="/login" />
              } />
              <Route path="/register" component={Register} />
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/recipe/create" component={CreateRecipe} />
              <PrivateRoute path="/recipe/:id/view" component={ViewRecipe} />
              <PrivateRoute path="/recipe/:id/edit" component={EditRecipe} />
              <PrivateRoute path="/comment/:id/edit" component={EditComment} />
              <PrivateRoute path="/user/:id/recipes" component={UserRecipes} />
              <Route component={NotFound} />
            </Switch>
          </MainContainer>
        <Footer />
      </Provider>
    </Router>
  );
}

export default App;
