import {request} from 'network/request'

export function getGoodsList(params){
    return request({
        url:'goods',
        method:'get',
        params
    })
}
export function removeById(url){
    return request({
        url,
        method:'get'
    })
}
