import APIFunction from './APIFunction';
const api = {
    queryDataList: '/dept/list',
    addData: 'POST /dept/add'
}
const API = APIFunction(api);

export default API;