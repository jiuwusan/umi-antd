import APIFunction from './APIFunction';
const api = {
    queryUserList: '/users/list',
    addUser: 'POST /users/add',
    loginUser: 'POST /users/login'
}
const API = APIFunction(api);

export default API;