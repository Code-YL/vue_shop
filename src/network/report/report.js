import {request} from 'network/request'

export function getReport(){
    return request({
        url:'reports/type/1',
        method:'get'
    })
}