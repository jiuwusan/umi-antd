import authApi from '../services/authApi'
import { formatResultsErrors } from "jest-message-util";
import NodeRSA from 'node-rsa';
const {
    getImgCode,
    getRsaPem,
    valiLogin
} = authApi
export default {
    namespace: 'auth',
    state: {
        "key": "",
        "imgCode": "",
        "privatePem": ""
    },
    effects: {
        /**
         * 查询列表
         */
        * getImgCode({ payload }, { call, put }) {
            let rs = yield call(getImgCode, {});
            yield put({
                type: 'updateState',
                payload: {
                    "key": rs.data.key,
                    "imgCode": rs.data.code
                },
            });
        },

        /**
         * 查询列表
         */
        * getRsaPem({ payload }, { call, put }) {
            let rs = yield call(getRsaPem, {});
            yield put({
                type: 'updateState',
                payload: {
                    "privatePem": rs.data.privatePem
                },
            });
        },
        /**
         * 记住我
         */
        * rememberMe({ payload }, { call, put }) {

        },

        /**
         * 登录
         */
        * login({ payload }, { call, put, select }) {
            //加密密码
            const { privatePem,key } = yield select(_ => _.auth);
            var RSAKEY = new NodeRSA(privatePem);
            payload.password = RSAKEY.encryptPrivate(payload.password, 'base64');
            //删除remember
            delete payload["remember"];
            //提交验证码key
            payload.key = key;
            console.log("结果",payload);
            let rs = yield call(valiLogin, payload);
            console.log("登录结果",rs);
        }
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