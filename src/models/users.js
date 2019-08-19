import index from '../services/index'
import { formatResultsErrors } from "jest-message-util";
const {
    queryUserList
} = index
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

            let list = yield call(queryUserList, payload);
            console.log("获取列表", {
                list,
                payload
            });
            yield put({
                type: 'updateState',
                payload: { "list": list },
            });

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