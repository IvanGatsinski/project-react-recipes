import { get, put, remove, post } from './utils';
import env from '../env';

export const addComment = (comment) => {
    return post(`/appdata/${env.APP_KEY}/comments`, comment, '');
}
export const fetchRecipeComments = (recipes_id) => {
    return get(`/appdata/${env.APP_KEY}/comments?query={"recipe_id":"${recipes_id}"}&sort={"_kmd.ect": -1}`);
}
export const fetchComment = (commentId) => {
    return get(`/appdata/${env.APP_KEY}/comments/${commentId}`)
}
export const updateComment = (commentId, comment) => {
    return put(`/appdata/${env.APP_KEY}/comments/${commentId}`, comment)
}
export const removeComment = (id) => {
    return remove(`/appdata/${env.APP_KEY}/comments/${id}`)
}