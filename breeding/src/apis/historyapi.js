import { get } from "@/utils/axios";

/**
 * 查询所有历史记录
 * @param {*} params 
 * @returns 
 */
export const historyFindAll = function(params){
    return get({
        url:`/warning/getAll`,
        params
    })
}

/**
 * 种类查询
 * @param {*} params 
 * @returns 
 */
export const historyFindByCondition = function(params){
    return get({
        url:`/warning/conditionFind?pageNo=${params.pageNo}&pageSize=${params.pageSize}&type=${params.type}`,
    })
}


/**
 * 名字查询
 * @param {*} params 
 * @returns 
 */
export const historyFindByName = function(params){
    return get({
        url:`/warning/conditionFind?pageNo=${params.pageNo}&pageSize=${params.pageSize}&name=${params.name}`,
    })
}