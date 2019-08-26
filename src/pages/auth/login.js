import styles from './auth.less';
import { Form, Icon, Input, Button, Layout, Checkbox } from 'antd';
import React from 'react';
import { connect } from 'dva';
const { Footer } = Layout;

// 与model建立连接
@connect(({ auth }) => ({
  "imgCode": auth.imgCode
}))
@Form.create()
class Login extends React.PureComponent {
  
  componentDidMount() {
    this.getRsaPublicPem();
    this.getImgCode();
  }

  getImgCode = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'auth/getImgCode',
      payload: {},
    });
  }

  getRsaPublicPem = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'auth/getRsaPublicPem',
      payload: {},
    });
  }
  
  handleSubmit = e => {
    e.preventDefault();
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
        type: 'auth/login',
        payload: formData
      });

    });
  };

  render() {
    const {imgCode} = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className={[styles.loginBox, "centerXY"]}>
        <div className={styles.loginForm}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('login_name', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                  size="large"
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
                  size="large"
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
                      size="large"
                      style={{ width: "150px" }}
                    />,
                  )}
                </div>
                <div className="centerY" onClick={this.getImgCode}>
                  <img src={imgCode} style={{ width: "80px", height: "40px" }}></img>
                  <div className={styles.codeChange}>换一张？</div>
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
        <Footer className={styles.loginFooter}>Jiu Wusan ©2019 Created by 953   渝ICP备18007185号-1</Footer>
      </Layout>

    );
  }
}

export default Login;