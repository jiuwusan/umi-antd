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
        query: [],
        parameter:{
            login_name:"",//账号
            password:"",//密码
            nick_name:"",//用户昵称
            real_name:"",//真实姓名
            user_type:"",//用户类型
            email:"",//用户邮箱
            phonenumber:"",//手机号码
            dept_id:"",//部门ID
            sex:"",//用户性别（0男 1女 2未知
            avatar:"",//头像路径
            status:"",//帐号状态（0正常 1停用）
            remark:""//备注
        }
    },
    effects: {
        /**
         * 查询列表
         */
        * list({ payload }, { call, put }) {

            let list = yield call(queryUserList, { pageSize: 10, page: 1 });
            console.log("请求成功",list);
            yield put({
                type: 'updateState',
                payload: { "list": list },
            });

        },
        /**
         * 增加用户
         */
        * add({ payload }, { call, put }) {
            console.log("开始发送请求",payload);
            let rs = yield call(addUser, payload);
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