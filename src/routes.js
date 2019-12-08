import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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

export default function RouterComponents() {
    return (
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
    )
}

export const routes = {
    login: () => { return "/login" },
    logout: () => { return "/logout" },
    register: () => { return "/register" },
    home: () => { return "/" },
    createRecipe: () => { return "/recipe/create" },
    viewRecipe: (recipe_id) => { return "/recipe/" + recipe_id + "/view" },
    editRecipe: (recipe_id) => { return "/recipe/" + recipe_id + "/edit" },
    editComment: (comment_id) => { return "/comment/" + comment_id + "/edit" },
    userRecipes: (user_id) => { return "/user/" + user_id + "/recipes" }
};