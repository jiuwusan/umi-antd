import { notification} from 'antd';
const util = {
    error (msg,title) {
        notification.error({
          message: title||'温馨提示',
          description:msg||'系统错误'
        });
    },
    success (msg,title) {
      notification.success({
        message: title||'系统提示',
        description:msg||'操作成功'
      });
  }
}

export default util;