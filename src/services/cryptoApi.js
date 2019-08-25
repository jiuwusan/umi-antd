const crypto = require('crypto');
const cryptoApi = {
    //加密
    encrypt(data, publicPem) {      
        // 注意，第二个参数是Buffer类型
        return crypto.publicEncrypt(publicPem, Buffer.from(data)).toString('base64');
    },
    //解密
    decrypt(encrypted, privatePem){
        // 注意，encrypted是Buffer类型
        let decodeData= crypto.privateDecrypt(privatePem, Buffer.from(encrypted.toString('base64'), 'base64'));
        return decodeData.toString();
    }
}

export default cryptoApi;