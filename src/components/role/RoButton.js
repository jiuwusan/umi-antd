
/**
 * 这是一个专门用于权限验证的button
 * dispatch 需要调用的model方法
 */
import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
@connect(({ authModel }) => ({
    roles: authModel.authModel
}))
class RoButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    onClick = () => {
        const { roClick } = this.props;
        if (roClick) {
            //传入一个回调函数
            roClick();
        }
    }

    render() {
        const { size, icon, type } = this.props;
        const { loading } = this.state;
        const { onClick } = this;

        return (<Button size={size || "default"} icon={icon || "-"} type={type || "-"} onClick={onClick} >
            {this.props.children}
        </Button>);
    }
}

export default RoButton;