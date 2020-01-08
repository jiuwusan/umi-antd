
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Drawer, Form, Button, Col, Row, Input,InputNumber } from 'antd';
import util from 'utils/util';


// 与model建立连接
@connect(({ sysTestModel }) => ({
    editShowVisible: sysTestModel.editShowVisible,
    editData: sysTestModel.editData
}))
@Form.create()
class Edit extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            //用于重新加载数据项
            fromKey: Math.random()
        };
    }

    componentDidMount() {
    }

    onClose = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'sysTestModel/updateState',
            payload: { editShowVisible: false },
        });
    };

    submitModel = (params) => {
        const { dispatch,editData } = this.props;
        //加入主键
        params.subData.id = editData.id;
        let that = this;
        dispatch({
            type: "sysTestModel/editRowData",
            payload: params,
            callback: (res) => {
                if (res) {
                    that.props.form.resetFields();
                    that.setState({ fromKey: Math.random() });
                }
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                console.log("提交数据", values)
                let subData = values;
                //向model传递数据
                this.submitModel({ subData });     
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { editShowVisible,editData } = this.props;
        const { fromKey } = this.state;
        const { onClose,handleSubmit } = this;
        return (
            <div>
                <Drawer
                    title="编辑"
                    width={720}
                    onClose={onClose}
                    visible={editShowVisible}
                >
                    <Form layout="vertical" key={ fromKey }>
                        
                <Row gutter={16}>
                
            <Col span={12}>
            <Form.Item label="用户名">
            {getFieldDecorator('username', {
                valuePropName:'value',
                initialValue: editData.username,
                rules: [{ required: true, message: '请填写用户名' }],
            })(<Input disable allowClear ></Input>)}
        </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="名称">
            {getFieldDecorator('name', {
                valuePropName:'value',
                initialValue: editData.name,
                rules: [{ required: true, message: '请填写名称' }],
            })(<Input  allowClear ></Input>)}
        </Form.Item>
            </Col>
                </Row>
                <Row gutter={16}>
                
            <Col span={12}>
            <Form.Item label="年龄">
            {getFieldDecorator('age', {
                valuePropName:'value',
                initialValue: editData.age,
                rules: [{ required: true, message: '请填写年龄' }],
            })(<InputNumber  allowClear ></InputNumber>)}
        </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="联系电话">
            {getFieldDecorator('phone', {
                valuePropName:'value',
                initialValue: editData.phone,
                rules: [{ required: false, message: '请填写联系电话' }],
            })(<Input  allowClear ></Input>)}
        </Form.Item>
            </Col>
                </Row>
                <Row gutter={16}>
                
            <Col span={12}>
            <Form.Item label="邮箱">
            {getFieldDecorator('email', {
                valuePropName:'value',
                initialValue: editData.email,
                rules: [{ required: false, message: '请填写邮箱' }],
            })(<Input  allowClear ></Input>)}
        </Form.Item>
            </Col>
                </Row>
                        <div className="drawerBottombutton">
                            <Button onClick={handleSubmit} type="primary" style={{ marginRight: 8 }}>提交</Button>
                            <Button onClick={onClose}>取消</Button>
                        </div>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

export default Edit;