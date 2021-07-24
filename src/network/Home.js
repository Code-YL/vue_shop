import { request, } from "./request";

export function getMenusList(){
    return request({
        url:'menus',
        method:'get'
    })
}
export function getUsersInfo(params){
    return request({
        url:'users',
        method:'get',
        params
    })
}
export function userStateChange(params){
    return request({
        url:'users/'+params.id+'/state/'+params.mg_state,
        method:'put'
    })
}
export function addUserForm(data) {
    return request({
        url:'users',
        method:'post',
        data
    })
}
export function showEditDialog(url) {
    return request({
        url,
        method:'get'
    })
}
export function editUser (url,data) {
    return request({
        url,
        method:'put',
        data
    })
}
export function removeUser(url) {
    return request({
        url,
        method:'delete'
    })
}