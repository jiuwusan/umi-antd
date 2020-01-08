
import APIFunction from './APIFunction';
const api = {
    queryDataList: 'POST /sys_test/querylist',
    sysTestAdd: 'POST /sys_test/add',
    sysTestEdit: 'POST /sys_test/edit',
    sysTestDel: 'POST /sys_test/delete',
    querySysTestById: 'POST /sys_test/querybyid',
}
const API = APIFunction(api);

export default API;