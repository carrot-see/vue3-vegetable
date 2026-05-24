import axios from '@/utlis/axios.js'
export const zhuce = (i)=>{
    return axios.post('/zhuce',{name:i})
}
// 修改用户内容
export const updata = (i)=>{
    return axios.post('/updata',{i})
}
// 用户登录
export const denglu = (i)=>{
    return axios.post('/denglu',{i})
}