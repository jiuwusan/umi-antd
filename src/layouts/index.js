import styles from './index.css';
import logo from '../assets/logo.png';
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Dropdown, Icon, Avatar } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" >
        个人信息
      </a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" >
        修改密码
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      安全退出
    </Menu.Item>
  </Menu>
);

class BasicLayout extends React.Component {


  render() {
    const { props } = this;
    return (
      <Layout>
        <Sider className={styles.jwsider}>
          <div className={styles.jwlogo}>
            <img src={logo} />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>系统监控</span>
            </Menu.Item>
            
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>系统设置</span>
                </span>
              }
            >
              <Menu.Item key="2">定时任务</Menu.Item>
              <Menu.Item key="3">代码生成</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>系统管理</span>
                </span>
              }
            >
              <Menu.Item key="4">用户管理</Menu.Item>
              <Menu.Item key="5">部门管理</Menu.Item>
              <Menu.Item key="6">管理</Menu.Item>
            </SubMenu>
            <Menu.Item key="7">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>

        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} className="betweenX">
            <div></div>
            <div style={{ paddingRight: "10px" }}>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Jiu Wusan ©2019 Created by 953</Footer>
        </Layout>
      </Layout>
    );
  };

}


export default BasicLayout;
