import APIFunction from './APIFunction';
const api = {
    getImgCode: '/auth/getImgCode',
    valiLogin: 'POST /auth/login',
    getRsaPem: '/auth/getRsaPem'
}
const API = APIFunction(api);

export default API;