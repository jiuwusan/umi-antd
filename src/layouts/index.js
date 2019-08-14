import styles from './index.css';
import logo from '../assets/logo.png';
import { Layout, Menu, Breadcrumb, Dropdown, Icon,Avatar } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;
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
function BasicLayout(props) {
  return (
    <Layout>
    <Sider className={styles.jwsider}>
      <div className={styles.jwlogo}>
        <img src={logo}/>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
 
    </Sider>
    <Layout style={{ marginLeft: 200}}>
      <Header style={{ background: '#fff', padding: 0 }} className="betweenX">
        <div></div>
        <div style={{paddingRight:"10px"}}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
          ...
          <br />
          Really
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          long
          <br />
          ...
          <br />
          ...
          <br />
          content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  );
}

export default BasicLayout;
