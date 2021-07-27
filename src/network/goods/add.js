import { request } from "network/request"

export function getCateList(){
    return request({
        url:'categories',
        method:'get'
    })
}
export function tabClicked(url,params){
    return request({
        url,
        method:'get',
        params
    })
}
export function addGoods(data){
    return request({
        url:'goods',
        method:'post',
        data
    })
}