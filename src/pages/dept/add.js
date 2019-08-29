import React from 'react';
import ReactDOM from 'react-dom';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, TreeSelect, Radio } from 'antd';
import { connect } from 'dva';
import Onepic from '../../components/upload/Onepic';
const { Option } = Select;

//连接model,并将addShow赋值给props
@connect(({ dept }) => ({
  addShow: dept.addShow
}))
//创建From
@Form.create()
class Add extends React.PureComponent {

  componentDidMount() {
    // 初始化
    const { dispatch } = this.props;
  }

  showDrawer = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/updateState',
      payload: { addShow: true },
    });
  };

  onClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dept/updateState',
      payload: { addShow: false },
    });
  };

  saveData = () => {
    console.log("新增用户",this.props.form);
    const { dispatch } = this.props;
    //验证表单数据
    this.props.form.validateFields((errors, values) => {
      if (errors) {
          console.log('Errors in form!!!');
          return;
      }
      
      //所有的form表单值，等同于values
      const formData = this.props.form.getFieldsValue();
      dispatch({
        type: 'users/add',
        payload: formData
      });

    });
   
  };

  deptChange = value => {
    console.log(value);
  };

  render() {
    const { addShow,datalist } = this.props;
    const { saveData, onClose } = this;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Drawer
          title="创建用户"
          width={720}
          onClose={this.onClose}
          visible={addShow}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>        
                  <Form.Item label="所属部门">
                    {getFieldDecorator('dept_id', {
                      rules: [{ message: '请选择所属部门' }],
                    })(
                      <TreeSelect
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={deptData}
                        placeholder="请选择"
                        treeDefaultExpandAll
                        onChange={this.deptChange}
                      />
                    )}
                  </Form.Item>            
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="登录账号">
                  {getFieldDecorator('login_name', {
                    rules: [{ required: true, message: '请输入登录账号' }],
                  })(<Input placeholder="请输入登录账号" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="登录密码">
                  {getFieldDecorator('password', {
                    rules: [{ message: '请输入登录密码' }],
                  })(
                    <Input placeholder="请输入登录密码" />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="用户昵称">
                  {getFieldDecorator('nick_name', {
                    rules: [{ message: '请输入用户昵称' }],
                  })(<Input placeholder="请输入用户昵称" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="真实姓名">
                  {getFieldDecorator('real_name', {
                    rules: [{ message: '请输入真实姓名' }],
                  })(<Input placeholder="请输入真实姓名" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="邮箱">
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email',
                      message: '这不是一个邮箱',
                    }, { message: '请输入邮箱' }],
                  })(<Input placeholder="请输入邮箱" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号码">
                  {getFieldDecorator('phonenumber', {
                    rules: [{ message: '请输入手机号码' }],
                  })(<Input placeholder="请输入手机号码" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="性别">
                  {getFieldDecorator('sex', {
                    rules: [{ message: '请选择性别' }],
                  })(<Radio.Group buttonStyle="solid">
                    <Radio.Button value="0">男</Radio.Button>
                    <Radio.Button value="1">女</Radio.Button>
                  </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="帐号状态">
                  {getFieldDecorator('status', {
                    rules: [{ message: '请输入手机号码' }],
                  })(<Radio.Group buttonStyle="solid">
                  <Radio.Button value="1">正常</Radio.Button>
                  <Radio.Button value="0">停用</Radio.Button>
                </Radio.Group>)}
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="备注">
                  {getFieldDecorator('remark', {
                    rules: [
                      {
                        message: '备注',
                      },
                    ],
                  })(<Input.TextArea rows={4} placeholder="备注" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={saveData} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

// ReactDOM.render(<Add />, document.getElementById('root'));

export default Add;

const deptData = [
  {
    title: '研发部',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'antd研发',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: 'egg研发',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '市场部',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: '营销策划',
        value: '0-1-1',
        key: '0-1-1',
      }
    ],
  },
];