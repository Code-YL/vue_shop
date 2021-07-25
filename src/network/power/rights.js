import { request } from "network/request";

export function getRightList(){
    return request({
        url:'rights/list',
        method:'get'
    })
}