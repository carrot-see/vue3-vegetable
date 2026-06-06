import {defineStore } from 'pinia'
import { neirong } from '@/api/index.js'
export const userneirong = defineStore('userneirong',()=>{
    const getList = async ()=>{
        const res = await neirong()
        return res
    }
    return{
        getList
    }
})