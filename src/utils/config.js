const config = {
    apiPrefix: "https://api.jiuwusan.cn",//接口地前缀
    filePrefix: "https://www.jiuwusan.cn/public",//文件显示前缀nginx
    SUCCEEDCODE: 200,//成功状态码
    //POST需要以application/x-www-form-urlencoded方式提交的接口列表
    qsclude: [],
    //返回的数据为blob对象，需要对其进行处理
    blob: ["/tool/generater/genCode"],
    //返回的数据为blob对象，需要对其进行处理
    multipart: [],
}

// const config = {
//     apiPrefix: "http://10.103.24.70:9532",//接口地前缀
//     filePrefix: "http://10.103.24.70:9532/public",//文件显示前缀nginx
//     SUCCEEDCODE: 200,//成功状态码
//     //POST需要以application/x-www-form-urlencoded方式提交的接口列表
//     qsclude: [],
//     //返回的数据为blob对象，需要对其进行处理
//     blob: ["/tool/generater/genCode"],
//     //返回的数据为blob对象，需要对其进行处理
//     multipart: [],
// }

export default config;