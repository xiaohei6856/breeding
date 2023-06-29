import { post } from "@/utils/axios";
import { get } from "@/utils/axios";
import { del } from "@/utils/axios";
import { patch } from "@/utils/axios";

/**
 *  添加养殖舍
 * @param {} data 
 * @returns 
 */
export const farmAdd = function(data){
    return post({
        url:`/houses/add`,
        data
    })
}
/**
 * 删除养殖舍
 * @returns 
 */
export const farmDel = function(params){
    return del({
        url:`/houses/delete`,
        params
    })
}
/**
 * 查找所有养殖舍
 * @param {*} params 
 * @returns 
 */
export const farmFindAll = function(params){
    return get({
        url:`/houses/findAllHouses`,
        params
    })
}
/**
 * 根据种类查找养殖舍
 * @param {} params 
 * @returns 
 */
export const farmFindByType = function(params){
    return get({
        url:`/houses/findByType?pageNo=${params.pageNo}&pageSize=${params.pageSize}&type=${params.type}`, 
    })
}
/**
 * 养殖舍类型
 * @param {*} params 
 * @returns 
 */
export const farmGetTypes = function(params){
    return get({
        url:`/houses/getTypes`,
        params
    })
}
/**
 * houseModel
 * @param {} data 
 * @returns 
 */
export const houseModel = function(data){
    return post({
        url:`/houses/houseModel`,
        data
    })
}
/**
 * 修改养殖舍
 * @param {*} data 
 * @returns 
 */
export const farmModify = function(data){
    return patch({
        url:`/houses/modify`,
        data
    })
}
