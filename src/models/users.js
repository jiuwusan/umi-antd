import { list } from "../services/users"
import { formatResultsErrors } from "jest-message-util";
export default {
    namespace: 'users',
    state: {
        addShow: false,
        editShow: false,
        detailShow: false,
        list: []
    },
    effects: {
        * list({ payload }, { call, put }) {

            let shop_list = yield call(list, payload);

            yield put({
                type: 'updateState',
                payload: { list: shop_list },
            });

        },
    },

    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload, 
            }
        },
    }
}