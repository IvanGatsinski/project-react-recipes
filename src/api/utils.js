import axios from 'axios'
import env from '../env';

axios.defaults.baseURL = 'https://baas.kinvey.com';

const APP_KEY = env.APP_KEY;
const APP_SECRET = env.APP_SECRET;

const APP_CREDENTIALS = `${APP_KEY}:${APP_SECRET}`

const BASIC_TOKEN = `${btoa(APP_CREDENTIALS)}`;
const AUTH_TOKEN = () => localStorage.getItem('authtoken');
const GUEST_TOKEN = () => localStorage.getItem('guestToken');

const GET_REQUEST_HEADERS = AUTH_TOKEN() ? AUTH_TOKEN() : GUEST_TOKEN()

function get(url) {
    return axios({
        method: 'GET',
        url: `${url}`,
        headers: {
            'Authorization': `Kinvey ${GET_REQUEST_HEADERS}`
        },
    })
}
function post(url, data, auth) {
    
    const AUTHORIZATION =
        auth === 'Basic' ?
            `Basic ${BASIC_TOKEN}` : `Kinvey ${AUTH_TOKEN()}`

    return axios({
        method: 'POST',
        url: `${url}`,
        data,
        headers: {
            'Authorization': AUTHORIZATION
        }
    })
}
function put(url, data) {

    return axios({
        method: 'PUT',
        url: `${url}`,
        data,
        headers: {
            'Authorization': `Kinvey ${AUTH_TOKEN()}`
        }
    })
}
function remove(url) {
    
    return axios({
        method: 'DELETE',
        url: `${url}`,
        headers: {
            'Authorization': `Kinvey ${AUTH_TOKEN()}`
        }
    })
}

async function loginGuest() {
    const data = {
        username: 'guest',
        password: 'guest'
    }

    const guest = await axios({
        method: 'POST',
        url: '/user/kid_rJ7liiTuS/login',
        data,
        headers: {
            'Authorization': `Basic ${btoa(APP_CREDENTIALS)}`
        }
    })
    localStorage.setItem('guestToken', guest.data._kmd.authtoken);
}
export {
    get, post, put, remove, loginGuest
}