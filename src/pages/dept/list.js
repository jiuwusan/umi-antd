import React from 'react';
import { connect } from 'dva';
import { Button, Table, Divider, Tag, Form, Input, ConfigProvider } from 'antd';
import AddPage from './add';
import EditPage from './edit';
import DetailPage from './detail';
import moment from "moment";

// 与model建立连接
@connect(({ dept }) => ({
  datalist: dept.datalist,
  addShow: dept.addShow,
  editShow: dept.editShow,
  detailShow: dept.detailShow
}))
//初始化Form
@Form.create()
class List extends React.PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/list',
      payload: {},
    });
  }

  add = () => {
    console.log("新增");
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/updateState',
      payload: { addShow: true }
    });
  }

  edit() {
    console.log("编辑");
  }

  del() {
    console.log("删除");
  }

  search = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'dept/query',
          payload: { query: values },
        });
      }
    });
  };

  render() {
    const { add, edit, del } = this;
    const { datalist } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (

      <div>
        <div className="flex">
          <Form layout="inline" onSubmit={this.search}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [],
              })(
                <Input placeholder="上级部门" />,
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" icon="search" size="small" htmlType="submit" >查 询</Button>
              <Button type="primary" icon="plus" size="small" className="mgl10" onClick={add} >新增</Button>
            </Form.Item>
          </Form>

        </div>
        <div style={{ marginTop: "15px" }}>
          <Table columns={columns} rowKey="id" dataSource={datalist} size="small" pagination={false}/>
        </div>
        <div>
          <AddPage></AddPage>
          <EditPage></EditPage>
          <DetailPage></DetailPage>
        </div>
      </div>

    );
  }
}

export default List;

//表单渲染规则
const columns = [
  {
    title: '部门名称',
    dataIndex: 'dept_name',
    key: 'dept_name'
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    key: 'leader',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '排序',
    dataIndex: 'order_num',
    key: 'order_num',
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    key: 'created_time',
    render: created_time => (
    <span>{moment(parseInt(new Date(created_time).getTime())).format('YYYY-MM-DD HH:mm')}</span>
    )
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <span>
        <Tag color={status == '1' ? 'geekblue' : 'green'} key={status}>
        {status == '1' ? '正常' : '停用'}
      </Tag></span>
    )
  },
  {
    title: 'Action',
    key: 'id',
    render: (record) => (
      <span>
        <a >编辑 {record.name}</a>
        <Divider type="vertical" />
        <a >删除</a>
      </span>
    ),
  },
];
