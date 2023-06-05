import axios from "axios";
import router from '../router/index'
import { getlocal } from "./localStorage";
import { MessagePlugin } from 'tdesign-vue-next';
let loadingObj = null
const http = axios.create({
  baseURL: 'http://xiaohei6856.cn:8081/breeding',
  timeout: 8000,
  headers: {
    "Content-Type":"application/json",
    // 'token': getlocal('token')||''
  }
});
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.token=getlocal('token')||''

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // loadingObj.close()
    const data = response.data
    if(data.code==20001){
      MessagePlugin.error(data||"账户未登录")
        router.push({
          path:'/login'
        })
        // 请求出错 
        return data
    }else if(data.code!=20000){
      MessagePlugin.error(data||"服务器出错")
      // 请求出错 
      return data
    }
    return data
}, function (error) {
  // 对响应错误做点什么
  // loadingObj.close()
  if(error.request.status==500){
    router.push({
      path:'/login'
    })
  }
    console.log(error);
  // return Promise.reject(error);
});
// post请求
export const post=config=>{
  return http({
      ...config,
      method:"post",
      data:config.data
  })
}
// get请求
export const get=config=>{
  return http({
      ...config,
      method:"get",
      params:config.data
  })
}
// patch请求
export const patch=config=>{
  return http({
      ...config,
      method:"patch",
      data:config.data
  })
}
// delete请求
export const del=config=>{
  return http({
      ...config,
      method:"delete" 
  })
}


// post请求
export const postform=config=>{
  return http({
      ...config,
      method:"post",
      headers: {
        'Content-Type': 'multipart/form-data', // 设置请求头
        ...config.headers // 保留原有请求头
      },
      data:config.data
  })
}
// patch请求
export const patchform=config=>{
  return http({
      ...config,
      method:"patch",
      headers: {
        'Content-Type': 'multipart/form-data', // 设置请求头
        ...config.headers // 保留原有请求头
      },
      data:config.data
  })
}

export default http