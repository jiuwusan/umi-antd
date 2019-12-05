import React from 'react';
import { connect } from 'dva';
import { Button, Table, Divider, Tag, Form, Input, Modal } from 'antd';
import moment from "moment";
import GenCodeSet from "./genCodeSet";
// 与model建立连接
@connect(({ generater }) => ({
  datalist: generater.datalist
}))
//初始化Form
@Form.create()
class List extends React.PureComponent {

  state = {
    visible: false,
    columnsSetting: [],
    tableName: "",
    settingKey: "qwer"
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'generater/tablelist'
    });
  }

  add = () => {
    console.log("新增用户");
    const { dispatch } = this.props;
    dispatch({
      type: 'generater/updateState',
      payload: { addShow: true }
    });
  }

  pageSizeChange = (current, size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'generater/pageSizeChange',
      payload: { current, size }
    });
  }

  pageChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'generater/pageChange',
      payload: { page, pageSize }
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

  genCodeSetting = (tablename) => {
    console.log("生成代码配置", tablename);
    let _this = this;
    const { dispatch } = this.props;
    dispatch({
      type: 'generater/genCodeColumns',
      payload: { tablename },
      callback: (res) => {
        if (res.code == 200) {
          _this.setState({
            visible: true,
            tableName: res.tableName,
            columnsSetting: res.columnsSetting,
            settingKey: Math.random()
          })
        }
      }
    });
  }

  search = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'generater/query',
          payload: { queryParams: values },
        });
      }
    });
  };

  cancelSet = e => {
    this.setState({
      visible: false
    })
  }

  enterSet = e => {
    let that = this;
    //首先验证基本信息是否完整
    that.genCodeSetForm.props.form.validateFields((err, values) => {
      console.log("配置参数", values)
      if (!err) {
        console.log("配置参数", values)
      }
    });
    // this.setState({
    //   visible: false
    // })
  }

  render() {
    const { search, pageChange, pageSizeChange, genCode, genCodeSetting, cancelSet } = this;
    const { datalist } = this.props;
    const { tableName, columnsSetting, settingKey } = this.state;
    const { getFieldDecorator } = this.props.form;

    //表单渲染规则
    const columns = [
      {
        title: '表名',
        dataIndex: 'table_name',
        key: 'table_name',
        // render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '表名(zh-cn)',
        dataIndex: 'table_comment',
        key: 'table_comment',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: created_time => (
          <span>{moment(parseInt(new Date(created_time).getTime())).format('YYYY-MM-DD HH:mm')}</span>
        )
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
        render: update_time => (
          <span>{(update_time || "") == "" ? (
            <Tag color='green' key="update_time">无更新</Tag>
          ) : moment(parseInt(new Date(update_time).getTime())).format('YYYY-MM-DD HH:mm')}</span>
        )
      },
      {
        title: '操作',
        key: 'table_id',
        render: (record) => (
          <span>
            <Button onClick={genCode.bind(this, record.table_name)} type="primary" icon="tool" size="small" htmlType="submit" >生成代码</Button>
            <Divider type="vertical" />
            <Button onClick={genCodeSetting.bind(this, record.table_name)} type="danger" icon="tool" size="small" htmlType="submit" >配置</Button>
          </span>
        ),
      },
    ];


    return (

      <div>
        <div className="flex">
          <Form layout="inline" onSubmit={this.search}>
            <Form.Item>
              {getFieldDecorator('tablename', {
                rules: [],
              })(
                <Input placeholder="表名" />,
              )}
            </Form.Item>

            <Form.Item>
              <Button onClick={search} type="primary" icon="search" size="small" >查询</Button>
            </Form.Item>
          </Form>

        </div>
        <div style={{ marginTop: "15px" }}>
          <Table columns={columns} rowKey="table_id" dataSource={datalist.list} size="small" pagination={{
            "size": "small",
            "total": datalist.total,
            "showSizeChanger": true,
            "showQuickJumpetrue": true,
            "onChange": pageChange,
            "onShowSizeChange": pageSizeChange
          }} />
        </div>
        <Modal
          width={"70vw"}
          title={tableName}
          visible={this.state.visible}
          onOk={this.enterSet}
          onCancel={this.cancelSet}>
          <GenCodeSet key={settingKey} columnsSetting={columnsSetting} wrappedComponentRef={(settingForm) => this.genCodeSetForm = settingForm}></GenCodeSet>
        </Modal>
      </div>

    );
  }
}

export default List;


