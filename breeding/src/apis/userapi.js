import {post} from "../utils/axios"

/**
 * 登录
 * @param {*} data 
 * @returns 
 */
 export const login = function(data) { 
    return post({
        url:`/login`,
        data
    })
  }
/**
 * 注册
 * @param {*} data 
 * @returns 
 */
 export const register = function(data) { 
    return post({
        url:`/register`,
        data
    })
  }
  /**
 * 获取验证码
 * @param {*} data 
 * @returns 
 */
 export const getRegCode = function(data) { 
    return post({
        url:`/getRegCode?email=${data.email}`,
    })
  }

    /**
 * 发送授权码
 * @param {*} data 
 * @returns 
 */
 export const sendPermitCode = function(data) { 
    return post({
        url:`/sendPermitCode?email=${data.email}`,
    })
  }