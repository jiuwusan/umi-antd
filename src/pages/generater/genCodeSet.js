import React from 'react';
import { connect } from 'dva';
import { Table, Form, Input, Switch, Select } from 'antd';
import moment from "moment";
const { Option } = Select;
// 与model建立连接
@connect(({ }) => ({}))
//初始化Form
@Form.create()
class Page extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            //将其赋值在state上，方便改动
            columnsSetting: props.columnsSetting
        }
    }
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
        const { columnsSetting } = this.state;
        const { getFieldDecorator } = this.props.form;

        //表单渲染规则
        const columns = [
            {
                title: '序号',
                align: "center",
                dataIndex: 't_ordinal_position',
                key: 't_ordinal_position'
            },
            {
                title: '字段名称',
                align: "center",
                dataIndex: 't_column_name',
                key: 't_column_name',
            },
            {
                title: '物理类型',
                align: "center",
                dataIndex: 't_data_type',
                key: 't_data_type',
            },
            {
                title: '字段描述',
                align: "center",
                dataIndex: 't_column_comment',
                key: 't_column_comment',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('column_comment' + rowData.t_column_name, {
                        initialValue: (rowData.column_comment || rowData.t_column_comment),
                        rules: [{ required: true, message: '请填写字段描述' }],
                    })(<Input allowClear style={{ width: "120px" }} />)}</Form.Item></span>
                )
            },
            {
                title: '新增',
                align: "center",
                dataIndex: 'is_add',
                key: 'is_add',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('is_add' + rowData.t_column_name, {
                        valuePropName: "checked",
                        initialValue: (rowData.is_add == 1),
                        rules: [{ required: true, message: '请选择是否新增' }],
                    })(<Switch />)}</Form.Item></span>
                )
            },
            {
                title: '编辑',
                align: "center",
                dataIndex: 'is_edit',
                key: 'is_edit',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('is_edit' + rowData.t_column_name, {
                        valuePropName: "checked",
                        initialValue: (rowData.is_edit == 1),
                        rules: [{ required: true, message: '请选择是否编辑' }],
                    })(<Switch />)}</Form.Item></span>
                )
            },
            {
                title: '列表',
                align: "center",
                dataIndex: 'is_list',
                key: 'is_list',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('is_edit' + rowData.t_column_name, {
                        valuePropName: "checked",
                        initialValue: (rowData.is_list == 1),
                        rules: [{ required: true, message: '请选择是否列表' }],
                    })(<Switch />)}</Form.Item></span>
                )
            },
            {
                title: '查询',
                align: "center",
                dataIndex: 'is_query',
                key: 'is_query',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('is_query' + rowData.t_column_name, {
                        valuePropName: "checked",
                        initialValue: (rowData.is_query == 1),
                        rules: [{ required: true, message: '请选择是否查询' }],
                    })(<Switch />)}</Form.Item></span>
                )
            },
            {
                title: '查询方式',
                align: "center",
                dataIndex: 'query_type',
                key: 'query_type',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('query_type' + rowData.t_column_name, {
                        initialValue: rowData.query_type || "Like",
                        rules: [{ required: true, message: '查询方式' }],
                    })(<Select allowClear style={{ width: 80 }}>
                        <Option value="Like">Like</Option>
                        <Option value="=">=</Option>
                        <Option value="!=">!=</Option>
                        <Option value=">=">&ge;</Option>
                        <Option value="<=">&le;</Option>
                        <Option value=">">&gt;</Option>
                        <Option value="<">&lt;</Option>
                    </Select>)}</Form.Item></span>
                )
            },
            {
                title: '必填',
                align: "center",
                dataIndex: 'is_required',
                key: 'is_required',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('is_required' + rowData.t_column_name, {
                        valuePropName: "checked",
                        initialValue: (rowData.is_required == 1),
                        rules: [{ required: true, message: '是否必填' }],
                    })(<Switch />)}</Form.Item></span>
                )
            },
            {
                title: '控件类型',
                align: "center",
                dataIndex: 'html_type',
                key: 'html_type',
                render: (text, rowData) => (
                    <span><Form.Item style={{ marginBottom: 0, paddingBottom: 0 }}>{getFieldDecorator('html_type' + rowData.t_column_name, {
                        initialValue: rowData.html_type || "01",
                        rules: [{ required: true, message: '控件类型' }],
                    })(<Select allowClear style={{ width: 120 }}>
                        <Option value="01">文本框</Option>
                        <Option value="02">文本域</Option>
                        <Option value="03">下拉框</Option>
                        <Option value="04">下拉多选框</Option>
                        <Option value="05">复选框</Option>
                        <Option value="06">单选框</Option>
                        <Option value="07">日期控件</Option>
                    </Select>)}</Form.Item></span>
                )
            },
        ];


        return (
            <div style={{ marginTop: "15px", height: "60vh", overflow: "auto" }}>
                <Table columns={columns} rowKey="table_id" dataSource={columnsSetting} size="small" pagination={false} />
            </div>
        );
    }
}

export default Page;