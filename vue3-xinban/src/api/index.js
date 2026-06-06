import axios from '@/utlis/axios'
export const neirong = ()=>{
    return axios.get('/tu')
}
// 添加商品的信息
export const addchanpin = (i)=>{
    return axios.post('/tu/add',i)
}