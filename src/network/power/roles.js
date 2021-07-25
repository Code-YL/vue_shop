import { request } from "network/request";

export function getRolesList() {
    return request({
        url:'roles',
        method:'get'
    })
}
export function removeRightById(url) {
    return request({
        url,
        method:'delete'
    })
}
export function showSetRightDialog() {
    return request({
        url:'rights/tree',
        method:'get'
    })
}
export function addRoles(data) {
    return request({
        url:'roles',
        data
    })
}
export function removeRoleById(url) {
    return request({
        url,
        method:'delete'
    })
}
export function showEditDialog(url) {
    return request({
        url,
        method:'get'
    })
}
export function allotRights(url, data) {
    return request({
        url,
        method:'post',
        data
    })
}
export function editRoles (url,data) {
    return request({
        url,
        method:'put',
        data
    })
}