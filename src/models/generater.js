import generaterApi from 'api/generaterApi'
import { formatResultsErrors } from "jest-message-util";
import util from 'utils/util'
const {
    queryDataList,
    genCode,
    genCodeColumns,
    settingCodeColumns
} = generaterApi
export default {
    namespace: 'generater',
    state: {
        addShow: false,
        editShow: false,
        detailShow: false,
        datalist: [],
        queryParams: {},
        pageSize: 10,
        page: 1,
        parameter: {},
        columnsSetting: []
    },
    effects: {
        /**
         * 查询列表
         */
        * tablelist({ payload }, { select, call, put }) {
            //获取搜索条件
            const { queryParams, pageSize, page } = yield select(_ => _.generater);
            let rs = yield call(queryDataList, { pageSize: pageSize, page: page, queryParams: queryParams });
            console.log("请求成功", rs.data);
            yield put({
                type: 'updateState',
                payload: { "datalist": rs.data },
            });

        },
        /**
         * 增加用户
         */
        * add({ payload }, { call, put }) {
            console.log("开始发送请求", payload);
            let rs = yield call(queryDataList, payload);
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
        * query({ payload }, { put }) {
            console.log("搜索", payload);

            yield put({
                type: 'updateState',
                payload: { "queryParams": payload.queryParams }
            });
            yield put({
                type: 'tablelist'
            });
        },
        /**
         * 页面大小发生改变
         */
        * pageSizeChange({ payload }, { put }) {
            yield put({
                type: 'updateState',
                payload: { "pageSize": payload.size, "page": 1 }
            });
            yield put({
                type: 'tablelist'
            });
        },
        /**
         * 页码发生改变
         */
        * pageChange({ payload }, { put }) {
            yield put({
                type: 'updateState',
                payload: { "page": payload.page },
            });
            yield put({
                type: 'tablelist'
            });
        },
        /**
         * 生成代码
         */
        * genCode({ payload }, { call }) {
            console.log("payload", payload);
            let rs = yield call(genCode, { tablename: payload.tablename });
            const blob = new Blob([rs.data], { type: 'application/octet-stream;charset=utf-8' })
            //表名为：批次号+时间戳
            const fileName = "代码生成(" + new Date().getTime() + ").zip";
            if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href);// 释放 URL对象
                document.body.removeChild(elink);
            } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
            }
            //去掉加载中
            // notification.success("生成成功");
        },
        /**
         * 生成代码配置
         */
        * genCodeColumns({ payload, callback }, { call }) {
            console.log("payload", payload);
            let rs = yield call(genCodeColumns, { tablename: payload.tablename });
            console.log("rs",rs);
            if (util.verifyErrCode(rs.code)) {
                callback({
                    code: rs.code,
                    tableName: payload.tablename,
                    columnsSetting: rs.data
                })
            }
        },
        /**
         * 生成代码配置
         */
        * settingCodeColumns({ payload, callback }, { call }) {
            console.log("payload", payload);
            let rs = yield call(settingCodeColumns, { tableName: payload.tableName, columnsValue: payload.columnsValue });
            if (util.verifyErrCode(rs.code, "配置成功")) {
                callback({
                    code: 200,
                    msg: "成功"
                })
            } else {
                callback({
                    code: -99,
                    msg: rs.msg
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