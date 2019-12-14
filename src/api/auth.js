import { post } from './utils';
import env from '../env';

function authenticateUser(data) {
    let authType = data.authType;
    delete data.authType;
    return authType.toLowerCase() === 'register' ?
           post(`/user/${env.APP_KEY}` ,data, 'Basic') :
           post(`/user/${env.APP_KEY}/login`, data, 'Basic');
}
function logoutUser() {
    return post(`/user/${env.APP_KEY}/_logout`, {}, 'Kinvey');
}

export {
    authenticateUser,
    logoutUser
}