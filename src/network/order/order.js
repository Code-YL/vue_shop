import {request} from 'network/request'

export function getOrderList(params){
    return request({
        url:'orders',
        method:'get',
        params
    })
}
export function showProgressDialog(url){
    return request({
        url,
        method:'get'
    })
}
