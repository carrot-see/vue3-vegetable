import { defineStore } from "pinia";
export const useStore = defineStore('counter',{
    state:()=>{
        return {
            name:'名字'
        }
    },
    // 数据处理/异步
    actions:{
    }
})