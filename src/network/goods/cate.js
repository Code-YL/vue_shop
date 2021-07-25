import { request } from "network/request";

export function getCateList(params) {
    return request({
        url:'categories',
        method:'get',
        params
    })
}
export function getParentCateList(params){
    return request({
        url:'categories',
        method:'get',
        params
    })
}
export function addCate(data){
    return request({
        url:'categories',
        method:'post',
        data
    })
}
export function showEditCateDialog(url){
    return request({
        url,
        method:'get'
    })
}
export function eidtCate(url,data){
    return request({
        url,
        method:'put',
        data
    })
}
export function removeCate(url){
    return request({
        url,
        method:'delete',
    })
}