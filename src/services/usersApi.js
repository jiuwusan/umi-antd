import APIFunction from './APIFunction';
const api = {
    queryUserList: '/users/list',
    addUser: 'POST /users/add'
}
const API = APIFunction(api);

export default API;