import { request } from './request';

export function login_in(data){
    return request({
        url:'login',
        method: 'post',
        data
    })
}