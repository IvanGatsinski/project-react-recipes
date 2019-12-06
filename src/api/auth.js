import { post } from './utils';

function authenticateUser(data) {
    let authType = data.authType;
    delete data.authType;
    return authType.toLowerCase() === 'register' ?
           post(`/user/kid_rJ7liiTuS` ,data, 'Basic') :
           post(`/user/kid_rJ7liiTuS/login`, data, 'Basic');
}
function logoutUser() {
    return post(`/user/kid_rJ7liiTuS/_logout`, {}, 'Kinvey');
}

export {
    authenticateUser,
    logoutUser
}