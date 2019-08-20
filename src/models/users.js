import userApi from '../services/usersApi'
import { formatResultsErrors } from "jest-message-util";
const {
    queryUserList,
    addUser
} = userApi
export default {
    namespace: 'users',
    state: {
        addShow: false,
        editShow: false,
        detailShow: false,
        list: [],
        query: []
    },
    effects: {
        /**
         * 查询列表
         */
        * list({ payload }, { call, put }) {

            let list = yield call(queryUserList, { pageSize: 10, page: 1 });
            yield put({
                type: 'updateState',
                payload: { "list": list },
            });

        },
        /**
         * 增加用户
         */
        * add({ payload }, { call, put }) {
            
            let rs = yield call(addUser, { userName: "周开栋", sex: "男" });
            console.log(rs);
            //数据提交成功，隐藏表单
            if (rs.code == 200) {
                yield put({
                    type: 'updateState',
                    payload: { "addShow": false },
                });
            }
        },
        /**
         * 搜索
         */
        * query(action, { select, call, put }) {
            yield put({
                type: 'updateState',
                payload: { "query": action.payload.query }
            });

        },
    },

    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    }
}