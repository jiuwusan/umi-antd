import authutil from './utils/authutil'
//重新获取token
authutil.refreshAuthToken();
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  }
};
