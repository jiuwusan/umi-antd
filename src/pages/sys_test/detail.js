
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Drawer, Form, Button, Col, Row, Descriptions } from 'antd';
import util from 'utils/util';

// 与model建立连接
@connect(({ sysTestModel }) => ({
    detailShowVisible: sysTestModel.detailShowVisible,
    detailData: sysTestModel.detailData
}))
class Detail extends PureComponent {

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
            payload: { detailShowVisible: false },
        });
    };

    render() {
        const { detailShowVisible,detailData } = this.props;
        const { fromKey } = this.state;
        const { onClose } = this;
        return (
            <div>
                <Drawer
                    title="详情"
                    width={720}
                    onClose={onClose}
                    visible={detailShowVisible}
                >
                <Descriptions column={2} bordered size="small">
                    
        <Descriptions.Item label="用户名">{detailData.username}</Descriptions.Item>
        <Descriptions.Item label="名称">{detailData.name}</Descriptions.Item>
        <Descriptions.Item label="年龄">{detailData.age}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{detailData.phone}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{detailData.email}</Descriptions.Item>
                </Descriptions>
                </Drawer>
            </div>
        );
    }
}

export default Detail;