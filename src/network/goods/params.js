import {request} from 'network/request'

export function getCateList() {
    return request({
        url:'categories',
        method:'get'
    })
}
export function getParamsData(url,params) {
    return request({
        url,
        method:'get',
        params
    })
}
export function addParams(url,data) {
    return request({
        url,
        method:'post',
        data
    })
}
export function showEditDialog(url,params) {
    return request({
        url,
        method:'get',
        params
    })
}
export function editParams(url,data) {
    return request({
        url,
        method:'put',
        data
    })
}
export function removeParams(url) {
    return request({
        url,
        method:'delete'
    })
}
export function saveAttrVals(url,data) {
    return request({
        url,
        method:'put',
        data
    })
}
