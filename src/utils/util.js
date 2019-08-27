
/**
 * 获取子节点
 * @param {*} id 
 * @param {*} pidKey 
 * @param {*} arry 
 */
function GetParentArry(id, pidKey, arry) {
    var newArry = new Array();
    for (var i in arry) {
        if (arry[i][pidKey] == id)
            newArry.push(arry[i]);
    }
    return newArry;
}
/**
 * 根据键获取json
 * @param {*} id 
 * @param {*} idKey 
 * @param {*} arry 
 */
function GetPresentData(id, idKey, arry) {
    let data = {};
    for (var i in arry) {
        if (arry[i][idKey] == id) {
            data = arry[i];
            break;
        }
    }
    return data;
}
/**
 * 构建json树
 * @param {*} id 
 * @param {*} idKey 
 * @param {*} pidKey 
 * @param {*} childKey 
 * @param {*} arry 
 */
function GetTreeData(id, idKey, pidKey, childKey, arry) {
    
    var treeJson = GetPresentData(id, idKey, arry);
    var childArry = GetParentArry(id, pidKey, arry);
    console.log(childArry);
    if (childArry.length > 0) {
        for (var i in childArry) {
            childArry[i] = GetTreeData(childArry[i][idKey], idKey, pidKey, childKey, arry);
        }
    }
    treeJson[childKey] = childArry;
    
    return treeJson;
}


export default {
    GetTreeData
};