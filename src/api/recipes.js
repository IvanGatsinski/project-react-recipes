import { get, put, post, remove } from './utils'
import env from '../env';

export const fetchAllRecipes = () => {
    return get(`/appdata/${env.APP_KEY}/recipes?query={}&sort={"_kmd.ect": -1}`)
}
export const fetchRecipe = (recipeId) => {
    return get(`/appdata/${env.APP_KEY}/recipes/${recipeId}`)
}
export const fetchUserRecipes = (userId) => {
    return get(`/appdata/${env.APP_KEY}/recipes?query={"_acl.creator":"${userId}"}`)
}
export const addRecipe = (recipe) => {
    return post(`/appdata/${env.APP_KEY}/recipes`, recipe, '')
}
export const updateRecipe = (recipeId, recipe) => {
    return put(`/appdata/${env.APP_KEY}/recipes/${recipeId}`, recipe)
}
export const removeRecipe = (id) => {
    return remove(`/appdata/${env.APP_KEY}/recipes/${id}`)
}