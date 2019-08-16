import React from 'react';
import { connect } from 'dva';
import { Button, Table, Divider, Tag,Form,Input,ConfigProvider } from 'antd';
import AddPage from './add';
import EditPage from './edit';
import DetailPage from './detail';

// 与model建立连接
@connect(({ users }) => ({
    list: users.list,
    addShow: users.addShow,
    editShow: users.editShow,
    detailShow: users.detailShow
}))
//初始化Form
@Form.create()
class List extends React.PureComponent {

    add() {
        const { dispatch } = this.props;
        dispatch({
            type: 'users/updateState',
            payload: { addShow: true },
        });
    }

    edit() {
        console.log("编辑");
    }

    del() {
        console.log("删除");
    }

    render() {
        const {add,edit,del} = this;
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            
            <div>
                <div>
                <Form layout="inline">
                        <Form.Item >
                            {getFieldDecorator('username', {
                                rules: [],
                            })(
                                <Input placeholder="用户名" />,
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" icon="search" htmlType="submit" >
                                查 询
                        </Button>
                        <Button type="primary" onClick={add}>新增</Button>
                        </Form.Item>
                    </Form>
                    
                </div>
                <div>
                    <Table columns={columns} dataSource={data} size="small" pagination={{
                         "size":"small",
                         "total":50,
                         "showSizeChanger":true,
                         "showQuickJumpetrue":true
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


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <a href="javascript:;">Invite {record.name}</a> */}
          <Divider type="vertical" />
          {/* <a href="javascript:;">Delete</a> */}
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];