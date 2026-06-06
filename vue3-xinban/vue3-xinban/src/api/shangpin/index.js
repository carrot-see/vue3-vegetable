import axios from '@/utlis/axios.js'
export const shaixuan = (i)=>{
    return axios.post('/postshaixuan',{name:i})
}
export const fenlei = ()=>{
    return axios.get('/fenlei')
}
// 收藏
export const getshoucang = (i)=>{
    return axios.post('/getshoucang',{id:i})
}
//更改收藏
export const postshoucang = (i)=>{
    return axios.post('/postshoucang',{i})
}
// 详细商品
export const xiangxi = (i)=>{
    return axios.post('/xiangxi',{i})
}
//删除收藏
export const delshoucang = (i)=>{
    return axios.post('/delshoucang',i)
}
//添加购物车-------------------------------
export const postgouwuche = (i)=>{
    return axios.post('/postgouwuche',i)
}
//删除购物车商品
export const delgouwuche = (i)=>{
    return axios.post('/delgouwuche',i)
}
//购买-----------------------------------------
export const buy = (i)=>{
    return axios.post('/buy',i)
}
//删除购买记录
export const delbuybuy = (i)=>{
    return axios.put(`/delbuy/${i.id}`,i.arr)
}
//根据多个id获取产品的数据-----------------------------------
export const getidarray = (i)=>{
    return axios.post('/getidarray',i)
}