
/**
 * 这是一个专门用于数据提交的button
 * 无参数
 * <MoButton type="primary" icon="tool" size="small" moClick={loadBackTest}>生成代码</MoButton>
 * 多参数
 * <MoButton type="primary" icon="tool" size="small" moClick={(loadBack) => loadBackTest(参数1,参数2,loadBack)}>生成代码</MoButton>
 */
import React from 'react';
import { Button, notification } from 'antd';
class MoButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    onClick = () => {
        let loading = this.state.loading;
        if (loading) {
            //处于执行状态
            notification.error({ message: "正在执行，勿重复操作" })
            return false;
        } else {
            this.setState({
                loading: true
            })
        }
        const { moClick } = this.props;
        if (moClick) {
            //传入一个回调函数
            moClick(this.loadBack);
        }
    }

    loadBack = () => {
        console.log("关闭按钮状态");
        this.setState({
            loading: false
        })
    }

    render() {
        const { size, icon, type } = this.props;
        const { loading } = this.state;
        const { onClick } = this;

        return (<Button size={size || "default"} icon={icon || "-"} type={type || "-"} onClick={onClick} loading={loading}>
            {this.props.children}
        </Button>);
    }
}

export default MoButton;