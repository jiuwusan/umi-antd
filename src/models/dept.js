import deptApi from 'api/deptApi'
import util from 'utils/util'
const {
    queryDataList,
    addData
} = deptApi

const {
    GetTreeData
} = util
export default {
    namespace: 'dept',
    state: {
        addShow: false,
        editShow: false,
        detailShow: false,
        datalist: [],
        query: [],
        parameter: {
            dept_name: ""
        }
    },
    effects: {
        /**
         * 查询列表
         */
        * list({ payload }, { call, put }) {

            let rs = yield call(queryDataList, { pageSize: 10, page: 1 });
            //构建treeTable数据
            let treeJson = GetTreeData("jiuwusan", "id", "parent_id", "children", rs.data.list);
            console.log("treeJson", treeJson);
            rs.data.list = treeJson;
            yield put({
                type: 'updateState',
                payload: { "datalist": [treeJson] },
            });

        },
        /**
         * 增加用户
         */
        * add({ payload }, { call, put }) {
            console.log("开始发送请求", payload);
            let rs = yield call(addData, payload);
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