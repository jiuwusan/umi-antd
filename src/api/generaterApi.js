import APIFunction from './APIFunction';
const api = {
    queryDataList: 'POST /tool/generater/tablelist',
    genCode: '/tool/generater/genCode'
}
const API = APIFunction(api);

export default API;