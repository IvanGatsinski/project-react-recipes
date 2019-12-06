import { get, put, remove, post } from './utils';

export const addComment = (comment) => {
    return post(`/appdata/kid_rJ7liiTuS/comments`, comment, '');
}
export const fetchRecipeComments = (recipes_id) => {
    return get(`/appdata/kid_rJ7liiTuS/comments?query={"recipe_id":"${recipes_id}"}&sort={"_kmd.ect": -1}`);
}
export const fetchComment = (commentId) => {
    return get(`/appdata/kid_rJ7liiTuS/comments/${commentId}`)
}
export const updateComment = (commentId, comment) => {
    return put(`/appdata/kid_rJ7liiTuS/comments/${commentId}`, comment)
}
export const removeComment = (id) => {
    return remove(`/appdata/kid_rJ7liiTuS/comments/${id}`)
}