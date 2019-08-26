import router from 'umi/router';
/**
 * 通用工具类
 */
const toolutil = {
    toPage(e) {
        console.log(e);
        router.push(e.key);
    },
    toIndex(){
        router.push("/users/list");
    }

}

export default toolutil;