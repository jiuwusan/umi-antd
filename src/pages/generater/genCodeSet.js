import React from 'react';
import { connect } from 'dva';
import { Button, Table, Divider, Tag, Form, Input, Modal } from 'antd';
import moment from "moment";
// 与model建立连接
@connect(({ }) => ({}))
//初始化Form
@Form.create()
class Page extends React.PureComponent {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'generater/tablelist'
        });
    }

    genCode = (tablename) => {
        console.log("生成代码", tablename);
        const { dispatch } = this.props;
        dispatch({
            type: 'generater/genCode',
            payload: { tablename }
        });
    }

    render() {
        const { genCode } = this;
        const { columnsSetting } = this.props;
        const { getFieldDecorator } = this.props.form;

        //表单渲染规则
        const columns = [
            {
                title: '序号',
                dataIndex: 't_ordinal_position',
                key: 't_ordinal_position'
            },
            {
                title: '字段名称',
                dataIndex: 't_column_name',
                key: 't_column_name',
            },
            {
                title: '物理类型',
                dataIndex: 't_data_type',
                key: 't_data_type',
            },
            {
                title: '字段描述',
                dataIndex: 't_column_comment',
                key: 't_column_comment',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('column_comment' + rowData.t_column_name, {
                        initialValue: (rowData.column_comment || rowData.t_column_comment),
                        rules: [{ required: true, message: '请填写字段描述' }],
                    })(<Input allowClear style={{ width: "150px" }} />)}</Form.Item></span>
                )
            },
            {
                title: '新增内容',
                dataIndex: 'update_time',
                key: 'update_time',
                render: update_time => (
                    <span>{(update_time || "") == "" ? (
                        <Tag color='green' key="update_time">无更新</Tag>
                    ) : moment(parseInt(new Date(update_time).getTime())).format('YYYY-MM-DD HH:mm')}</span>
                )
            }
        ];


        return (
            <div style={{ marginTop: "15px" }}>
                <Table columns={columns} rowKey="table_id" dataSource={columnsSetting} size="small" pagination={false} />
            </div>
        );
    }
}

export default Page;