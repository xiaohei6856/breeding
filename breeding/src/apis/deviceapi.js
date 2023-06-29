import { post } from "@/utils/axios";
import { get } from "@/utils/axios";
import { del } from "@/utils/axios";
/**
 * 查询所有设备
 * @param {*} params 
 * @returns 
 */
export const deviceFindAll = function(params){
    return get({
        url:`/device/getAllType`,
       params
    })
}
/**
 * 增加设备
 * @param {*} data 
 * @returns 
 */
export const deviceAdd = function (data) {
     return post({
        url:`/device/addDevice`,
        data
    })
}

/**
 * 删除设备
 * @returns 
 */
 export const deviceDel = function(params){
    return del({
        url:`/device/delDevice?id=${params.id}`,
    })
}

/**
 * 根据种类查找设备
 * @param {} params 
 * @returns 
 */
export const deviceFindByType = function(params){
    return get({
        url:`/device/findByType?pageNo=${params.pageNo}&pageSize=${params.pageSize}&type=${params.type}`,
    })
}

/**
 * 获取所有设备
 */
export const getAllDevice = function(params){
    return get({
        url:`/device/getAllDevices`,
        params
    })
}