import styles from './Login.less';
import { Form, Icon, Input, Button, Layout, Checkbox } from 'antd';
import React from 'react';
import router from 'umi/router';
import vcodeImg from '../../assets/vcode-test.png';
const { Footer } = Layout;
@Form.create()
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        router.push('/order/order_list');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className={[styles.loginBox, "centerXY"]}>
        <div className={styles.loginForm}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <div className="betweenX">
                <div>
                  {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入验证码!' }],
                  })(
                    <Input
                      prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Validate Code"
                      style={{ width: "150px" }}
                    />,
                  )}
                </div>
                <div>
                  <img src={vcodeImg} style={{ width: "80px", height: "30px" }}></img>
                  <a style={{fontSize:"12px",marginLeft:"3px"}}>换一张？</a>
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="betweenX">
                <div>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                  })(<Checkbox>记住我</Checkbox>)}
                </div>
                <div>
                  <a>忘记密码？</a>
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                登录
          </Button>

            </Form.Item>
          </Form>
        </div>
        <Footer className={styles.loginFooter}>Jiu Wusan ©2019 Created by 953</Footer>
      </Layout>

    );
  }
}

export default Login;