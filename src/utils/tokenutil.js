import axios from "axios";
//引入解析token的方法
import jwt_decode from 'jwt-decode'
import router from 'umi/router';

/**
 * 通用工具类
 */
const tokenutil = {
    setAuthToken(token) {
        //存token
        localStorage.setItem('jwToken', token);
        //解析token
        const decoded = jwt_decode(token);
        console.log("解析后", decoded);
        //挂载token到axios
        tokenutil.setAxiosToken(token);
    },
    refreshAuthToken() {
        let token = localStorage.jwToken;
        if (token) {
            this.setAuthToken(token);
            // 解析token
            const decoded = jwt_decode(localStorage.jwToken)
            //store.dispatch(setCurrentUser(decoded))
            // 检测token过期
            // 获取当前时间
            const currentTime = Date.now() / 1000;//由毫秒转成秒
            // 判断当前时间是否大于token中的exp时间;如果大于是为过期
            if (decoded.exp < currentTime) {
                // 过期
                //store.dispatch(logoutUser())
                // 退出后再跳转页面
                router.push("/auth/login");
            }
        }else{
            router.push("/auth/login");
        }
    },
    setAxiosToken(token) {
        if (token) {
            // token存在设置header,因为后续每个请求都需要
            axios.defaults.headers.common['authorization'] = token;
        } else {
            // 没有token就移除
            delete axios.defaults.headers.common['authorization'];
        }
    }

}

export default tokenutil;