import tokenutil from './utils/tokenutil'
//重新获取token
tokenutil.refreshAuthToken();
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  }
};
