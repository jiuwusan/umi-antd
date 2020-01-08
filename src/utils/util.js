import notification from "./notification";
import config from "./config";
const util = {
    /**
     * 文件下载
     * @param {blob 数据类型} data 
     */
    download(data, fileType) {
        const blob = new Blob([data], { type: 'application/octet-stream;charset=utf-8' })
        //表名为：批次号+时间戳
        const fileName = "代码生成(" + new Date().getTime() + ")." + fileType;
        if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);// 释放 URL对象
            document.body.removeChild(elink);
        } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
        }
    },
    /**
     * 判断请求状态
     * @param {状态码} code 
     * @param {成功，提示语} notifice 
     * @param {失败，提示语} notifice 
     * @param {成功状态码} SUCCEEDCODE 
     */
    verifyErrCode(code, notifice, errnotifice, SUCCEEDCODE) {
        SUCCEEDCODE = SUCCEEDCODE || config.SUCCEEDCODE;
        if (code) {
            let status = (code == SUCCEEDCODE);
            if (notifice && status) {
                //给一个操作成功的提示
                notification.success(notifice);
            } else if (errnotifice && (!status)) {
                notification.error(errnotifice);
            }
            return status;
        }
        return false;
    },
    /**
     * 格式化boolean值
     * @param {*} value 
     * @param {*} isRev 
     */
    fttBoolean(value, isRev) {
        if (isRev) {
            //正向 true=>1,false=>0
            if (value == true) {
                return 1;
            } else {
                return 0;
            }
        } else {
            //反向，1=>true,0=>false
            return value == 1;
        }
    },
    /**
     * 检查 value 是否为空
     * 如果是null，直接返回true；如果是类数组，判断数据长度；如果是Object对象，判断是否具有属性；如果是其他数据，直接返回false(也可改为返回true)
     */
    isEmpty(value) {
        if (value == null) {
            return true;
        }
        if (this.isArrayLike(value)) {
            return !value.length;
        } else if (this.isPlainObject(value)) {
            for (let key in value) {
                if (hasOwnProperty.call(value, key)) {
                    return false;
                }
            }
        }
        return false;
    },
    /**
     * 格式化数字
     */
    formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    /**
     * 横线转驼峰命名
     */
    camelize(str) {
        let camelizeRE = /-(\w)/g;
        return str.replace(camelizeRE, function (_, c) {
            return c ? c.toUpperCase() : '';
        })
    },

    /**
     * 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
     */
    hyphenate(str) {
        let hyphenateRE = /\B([A-Z])/g;
        return str.replace(hyphenateRE, '-$1').toLowerCase()
    },

    /**
     * 字符串首位大写
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    },
    /**
     * 检查 value 是否是类数组
     * 如果一个值被认为是类数组，那么它不是一个函数，并且value.length是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。这里字符串也将被当作类数组。
     */
    isArrayLike(value) {
        return value != null && this.isLength(value.length) && !this.isFunction(value);
    },
    /**
     * 判断数据是不是Object类型的数据
     */
    isPlainObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]'
    },
    /**
     * 检查 value 是否为有效的类数组长度
     */
    isLength(value) {
        return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
    },
    /**
     * 检查 value 是不是函数
     */
    isFunction(value) {
        return Object.prototype.toString.call(value) === '[object Function]'
    },
    /**
     * 检查 字符串数组是否包含某个字符串
     */
    inStrArray(str, strArray) {
        let arrayStr = strArray.join(",");
        arrayStr = "," + arrayStr + ",";
        return (arrayStr.indexOf("," + str + ",")) > -1;
    },
    /**
     * 构建json树
     * @param {*} id 
     * @param {*} idKey 
     * @param {*} pidKey 
     * @param {*} childKey 
     * @param {*} arry 
     */
    GetTreeData(id, idKey, pidKey, childKey, arry) {

        var treeJson = util.GetPresentData(id, idKey, arry);
        var childArry = util.GetParentArry(id, pidKey, arry);
        console.log(childArry);
        if (childArry.length > 0) {
            for (var i in childArry) {
                childArry[i] = util.GetTreeData(childArry[i][idKey], idKey, pidKey, childKey, arry);
            }
        }
        treeJson[childKey] = childArry;

        return treeJson;
    },
    /**
     * 获取子节点
     * @param {*} id 
     * @param {*} pidKey 
     * @param {*} arry 
     */
    GetParentArry(id, pidKey, arry) {
        var newArry = new Array();
        for (var i in arry) {
            if (arry[i][pidKey] == id)
                newArry.push(arry[i]);
        }
        return newArry;
    },
    /**
     * 根据键获取json
     * @param {*} id 
     * @param {*} idKey 
     * @param {*} arry 
     */
    GetPresentData(id, idKey, arry) {
        let data = {};
        for (var i in arry) {
            if (arry[i][idKey] == id) {
                data = arry[i];
                break;
            }
        }
        return data;
    }
}

export default util;
