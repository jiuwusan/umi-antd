
import notification from 'utils/notification';
import util from 'utils/util';
//引入接口
import sysTestApi from "api/sysTestApi";
const { queryDataList, sysTestAdd, sysTestEdit, sysTestDel, querySysTestById } = sysTestApi;

export default {
    namespace: 'sysTestModel',
    state: {
        addShowVisible: false,
        editShowVisible: false,
        detailShowVisible: false,
        tabledata: {
            datalist: [],
            totalSize: 0
        },
        queryParams: {},
        detailData: {},
        editData: {},
        pageSize: 10,
        page: 1
    },
    effects: {
        /**
          * 初始化页面
          */
        *initPageData({ payload,callback }, { select, call, put }) {
            //写入数据
            yield put({
                type: 'updateState',
                payload: { pageSize:10,page:1,queryParams:{},tabledata: {
                    datalist: [],
                    totalSize: 0
                    },
                    addShowVisible: false,
                    editShowVisible: false,
                    detailShowVisible: false
                },
            });
            //获取数据
            yield put({
                type: 'querylist',
                payload: {}
            });
        },
        /**
          * 刷新页面
          */
        *refreshPageData({ payload,callback }, { select, call, put }) {
            yield put({
                type: 'updateState',
                payload: { 
                    addShowVisible: false,
                    editShowVisible: false,
                    detailShowVisible: false },
            });
            //获取数据
            yield put({
                type: 'querylist',
                payload: {}
            });
        },
        /**
          * 查询列表
          */
        *querylist({ payload,callback }, { select, call, put }) {
            //获取搜索条件
            const { queryParams, pageSize, page } = yield select(_ => _.sysTestModel);
            let rs = yield call(queryDataList, { pageSize, page, queryParams });
            if (util.verifyErrCode(rs.code, "", rs.msg)) {
                //请求成功
                let datalist = rs.data.tabledata.datalist;
                let totalSize = rs.data.tabledata.datalist;
                if(datalist.length==0&&page>1){
                    //再次请求数据
                    yield put({
                        type: 'pageOrPageSizeChange',
                        payload: { pageSize,page:Math.ceil(totalSize/pageSize) },
                    });
                }else{
                    //写入数据
                    yield put({
                        type: 'updateState',
                        payload: { "tabledata": rs.data.tabledata },
                    });
                }
            }
        },

        *pageOrPageSizeChange({ payload }, { call, put }) {
            //更新页面大小，当前页数据
            yield put({
                type: 'updateState',
                payload: { pageSize: payload.pageSize, page: payload.page }
            });
            //重新获取列表数据
            yield put({
                type: 'refreshPageData',
                payload: {}
            });
        },

        *querySubmit({ payload }, { call, put }) {
            //设置搜索内容，page设置为1
            yield put({
                type: 'updateState',
                payload: { queryParams: payload.queryParams, page:1 }
            });
            //重新获取列表数据
            yield put({
                type: 'querylist',
                payload: {}
            });
        },
        *addShow({ payload, callback }, { call, put }) {
            yield put({
                type: 'updateState',
                payload: { addShowVisible: true }
            });
        },
        *editShow({ payload, callback }, { call, put }) {
            let rs = yield call(querySysTestById, payload);
            if (util.verifyErrCode(rs.code, "", rs.msg)) {
                yield put({
                    type: 'updateState',
                    payload: { editShowVisible: true,editData:rs.data }
                });
            }
        },
        *detailShow({ payload, callback }, { call, put }) {
            let rs = yield call(querySysTestById, payload);
            if (util.verifyErrCode(rs.code, "", rs.msg)) {
                yield put({
                    type: 'updateState',
                    payload: { detailShowVisible: true, detailData:rs.data }
                });
            }
        },
        *addRowData({ payload, callback }, { call, put }) {
            //构建数据提交到服务器
            let rs = yield call(sysTestAdd, payload.subData);
            if (util.verifyErrCode(rs.code, "保存成功", rs.msg)) {
                //刷新原页面
                yield put({
                    type: 'refreshPageData',
                    payload: {}
                });
                //回调清空表单
                callback({code:rs.code});
            }
        },
        *editRowData({ payload, callback }, { call, put }) {
            //构建数据提交到服务器
            let rs = yield call(sysTestEdit, payload);
            if (util.verifyErrCode(rs.code, "编辑并保存成功", rs.msg)) {
                //刷新原页面
                yield put({
                    type: 'refreshPageData',
                    payload: {}
                });
                //回调清空表单
                callback({code:rs.code});
            }
        },
        *delRowData({ payload, callback }, { call, put }) {
            let rs = yield call(sysTestDel, payload);
            if (util.verifyErrCode(rs.code, "删除成功", rs.msg)) {
                //刷新原页面
                yield put({
                    type: 'refreshPageData',
                    payload: {}
                });
            }
        }
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

