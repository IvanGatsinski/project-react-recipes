import { get, put, post, remove } from './utils'

export const fetchAllRecipes = () => {
    return get(`/appdata/kid_rJ7liiTuS/recipes?query={}&sort={"_kmd.ect": -1}`)
}
export const fetchRecipe = (recipeId) => {
    return get(`/appdata/kid_rJ7liiTuS/recipes/${recipeId}`)
}
export const fetchUserRecipes = (userId) => {
    return get(`/appdata/kid_rJ7liiTuS/recipes?query={"_acl.creator":"${userId}"}`)
}
export const addRecipe = (recipe) => {
    return post(`/appdata/kid_rJ7liiTuS/recipes`, recipe, '')
}
export const updateRecipe = (recipeId, recipe) => {
    return put(`/appdata/kid_rJ7liiTuS/recipes/${recipeId}`, recipe)
}
export const removeRecipe = (id) => {
    return remove(`/appdata/kid_rJ7liiTuS/recipes/${id}`)
}