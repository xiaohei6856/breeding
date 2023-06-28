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
 * 条件查询
 * @param {*} params 
 * @returns 
 */
export const historyFindByCondition = function(params){
    return get({
        url:`/warning/conditionFind`,
        params
    })
}
