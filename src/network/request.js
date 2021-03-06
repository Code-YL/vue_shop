import axios from "axios";

export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://timemeetyou.com:8889/api/private/v1/',
        timeout:5000
    })

    // 2.axios的拦截器
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        config.headers.Authorization = window.sessionStorage.getItem('token')
        // console.log(config)
        return config
    }, err => {
        // console.log(err);
    })

    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    // 3.发送真正的网络请求
    return instance(config)
}

export const policyInterface = (url,type,params = null,data = null) => {
    return request({
        url,
        method:type,
        params,
        data
    })
}