import authApi from 'api/authApi'
import cryptoApi from 'api/cryptoApi'
import routerutil from 'utils/routerutil'
import authutil from 'utils/authutil'
import notification from 'utils/notification'
const {
    getImgCode,
    getRsaPublicPem,
    valiLogin
} = authApi

const {
    publicEncrypt
} = cryptoApi

export default {
    namespace: 'auth',
    state: {
        "key": "",
        "imgCode": "",
        "publicPem": ""
    },
    effects: {
        /**
         * 获取图形验证码
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
        * getRsaPublicPem({ payload }, { call, put }) {
            let rs = yield call(getRsaPublicPem, {});
            yield put({
                type: 'updateState',
                payload: {
                    "publicPem": rs.data.publicPem
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
            const { publicPem, key } = yield select(_ => _.auth);
            payload.password = publicEncrypt(payload.password, publicPem);
            //删除remember
            delete payload["remember"];
            //提交验证码key
            payload.key = key;
            let rs = yield call(valiLogin, payload);
            console.log("登录结果", rs);
            if (rs.code == 200) {
                //存token
                authutil.setAuthToken(rs.token);
                routerutil.toIndex();
            } else {
                notification.error(rs.msg);
                //刷新图形验证码
                yield put({
                    type: 'getImgCode'
                })
            }
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