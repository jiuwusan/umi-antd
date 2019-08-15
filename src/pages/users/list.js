import { connect } from 'dva';
import { Button } from 'antd';
import AddPage from './add';
import EditPage from './edit';
import DetailPage from './detail';

const List = ({ dispatch, users }) => {

    function add() {
        dispatch({
            type: 'users/updateState',
            payload: { addShow: true },
        });
    }

    function edit() {
        console.log("编辑", users);
    }

    function del() {
        console.log("删除", users);
    }

    return (
        <div>
            <Button type="primary" onClick={add}>新增</Button>
            <Button onClick={edit}>编辑</Button>
            <Button type="danger" onClick={del}>删除</Button>
            <AddPage></AddPage>
            <AddPage></AddPage>
            <AddPage></AddPage>
        </div>
    );
};

//连接model
export default connect(({ users }) => ({
    users,
}))(List);