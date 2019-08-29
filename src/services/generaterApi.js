import APIFunction from './APIFunction';
const api = {
    queryDataList: 'POST /tool/generater/tablelist',
    addData: 'POST /dept/add'
}
const API = APIFunction(api);

export default API;