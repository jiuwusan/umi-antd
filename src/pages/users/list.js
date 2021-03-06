import React from 'react';
import { connect } from 'dva';
import { Button, Table, Divider, Tag, Form, Input, ConfigProvider } from 'antd';
import AddPage from './add';
import EditPage from './edit';
import DetailPage from './detail';

// 与model建立连接
@connect(({ users }) => ({
  datalist: users.datalist,
  addShow: users.addShow,
  editShow: users.editShow,
  detailShow: users.detailShow
}))
//初始化Form
@Form.create()
class List extends React.PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/list',
      payload: {},
    });
  }

  add = () => {
    console.log("新增用户");
    const { dispatch } = this.props;
    dispatch({
      type: 'users/updateState',
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
          type: 'users/query',
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
                <Input placeholder="用户名" />,
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" icon="search" size="small" htmlType="submit" >查 询</Button>
              <Button type="primary" icon="plus" size="small" className="mgl10" onClick={add} >新增</Button>
            </Form.Item>
          </Form>

        </div>
        <div style={{ marginTop: "15px" }}>
          <Table columns={columns} rowKey="id" dataSource={datalist.list} size="small" pagination={{
            "size": "small",
            "total": datalist.total,
            "showSizeChanger": true,
            "showQuickJumpetrue": true
          }} />
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
    title: '登录名称',
    dataIndex: 'login_name',
    key: 'login_name',
    // render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phonenumber',
    key: 'phonenumber',
  },
  {
    title: '所属部门',
    dataIndex: 'dept_id',
    key: 'dept_id'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: sex => (
      <span>
        <Tag color={sex == '1' ? 'geekblue' : 'green'} key={sex}>
        {sex == '1' ? '男' : '女'}
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
