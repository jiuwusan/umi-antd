import APIFunction from './APIFunction';
const api = {
    getImgCode: '/auth/getImgCode',
    valiLogin: 'POST /auth/login',
    getRsaPublicPem: '/auth/getRsaPublicPem'
}
const API = APIFunction(api);

export default API;