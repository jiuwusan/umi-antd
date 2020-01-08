
import React from 'react';
import { connect } from 'dva';
import { Form, Button, Table, Divider, Tag, Input } from 'antd';
import AddPage from './add';
import EditPage from './edit';
import DetailPage from './detail';
import moment from "moment";
import MoButton from "components/form/MoButton";


// 与model建立连接
@connect(({ sysTestModel }) => ({
  page: sysTestModel.page,
  pageSize: sysTestModel.pageSize,
  tabledata: sysTestModel.tabledata,
  addShowVisible: sysTestModel.addShowVisible,
  editShowVisible: sysTestModel.editShowVisible,
  detailShowVisible: sysTestModel.detailShowVisible
}))

//初始化Form
@Form.create()
class List extends React.PureComponent {

  componentDidMount() {
    //初始化页面数据
    const { dispatch } = this.props;
    dispatch({
      type: 'sysTestModel/initPageData',
      payload: {},
    });
  }

  addShow = () => {
    console.log("新增");
    const { dispatch } = this.props;
    dispatch({
      type: 'sysTestModel/addShow',
      payload: {}
    });
  }

  editShow = (value,loadBack) => {
    console.log("编辑");
    const { dispatch } = this.props;
    dispatch({
      type: 'sysTestModel/editShow',
      payload: { id: value }
    });
  }

  delRowData = (value,loadBack) => {
    console.log("删除");
    const { dispatch } = this.props;
    dispatch({
      type: 'sysTestModel/delRowData',
      payload: { id: value }
    });
  }

  querySubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: 'sysTestModel/querySubmit',
          payload: { queryParams: values }
        });
      }
    });
  };

  /**
   * 页数据长度发生改变
   */
   pageSizeChange = (current, pageSize) => {
       const { dispatch } = this.props;
       dispatch({
           type: 'sysTestModel/pageOrPageSizeChange',
           payload: { page: 1, pageSize }
       });
   };

   /**
    * 页码发生改变
    */
   pageChange = (page, pageSize) => {
       const { dispatch } = this.props;
       dispatch({
           type: 'sysTestModel/pageOrPageSizeChange',
           payload: { page, pageSize }
       });
   };

  render() {
    const { addShow, editShow, delRowData, querySubmit, pageSizeChange, pageChange } = this;
    const { tabledata,page,pageSize } = this.props;
    const { getFieldDecorator} = this.props.form;
    //定义数据显示项
    const columns = [{
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        align: "center"
    },{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        align: "center"
    },{
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        align: "center"
    },{
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone',
        align: "center"
    },{
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align: "center"
    },
{
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: "center",
        render: (value, rowData, index) => (
          <span>
              {value!=null&&moment(value).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        )
      },{
    title: '操作',
    key: 'table_id',
    render: (value, rowData, index) => (
      <span>
        <MoButton ghost="true" type="primary" size="small" moAuto={3} moClick={(loadBack) => editShow(rowData.id, loadBack)}>编辑</MoButton>
        <Divider type="vertical" />
        <MoButton ghost="true" type="danger" size="small" moAuto={3} moClick={(loadBack) => delRowData(rowData.id, loadBack)}>删除</MoButton>
      </span>
    ),
  }]
    return (

      <div>
        <div className="flex">
          <Form layout="inline">
            
            
<Form.Item label="用户名">
            {getFieldDecorator('username', {
                valuePropName:'value',
                initialValue: '',
                rules: [{ message: '请填写用户名' }],
            })(<Input allowClear ></Input>)}
            </Form.Item>
<Form.Item label="名称">
            {getFieldDecorator('name', {
                valuePropName:'value',
                initialValue: '',
                rules: [{ message: '请填写名称' }],
            })(<Input allowClear ></Input>)}
            </Form.Item>
<Form.Item label="联系电话">
            {getFieldDecorator('phone', {
                valuePropName:'value',
                initialValue: '',
                rules: [{ message: '请填写联系电话' }],
            })(<Input allowClear ></Input>)}
            </Form.Item>

            <Form.Item>
              <Button type="primary" icon="search" size="small" onClick={querySubmit}>查 询</Button>
              <Button type="primary" icon="plus" size="small" className="mgl10" onClick={addShow} >新增</Button>
            </Form.Item>
          </Form>

        </div>
        <div style={{ marginTop: "15px" }}>
            <Table rowKey="id" columns={columns} dataSource={tabledata.datalist} pagination={{
              "size": "small",
              "current": page,
              "pageSize": pageSize,
              "total": tabledata.totalSize,
              "showSizeChanger": true,
              "showQuickJumper": true,
              "onChange": pageChange,
              "onShowSizeChange": pageSizeChange
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
