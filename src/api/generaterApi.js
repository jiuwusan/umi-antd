import APIFunction from './APIFunction';
const api = {
    queryDataList: 'POST /tool/generater/tablelist',
    genCode: 'POST /tool/generater/genCode',
    genCodeColumns: '/tool/generater/genCodeColumns',
    settingCodeColumns: 'POST /tool/generater/settingCodeColumns',
}
const API = APIFunction(api);

export default API;