<script setup>
// 组件
import zhuye from '@/components/shouye/zhuye.vue'
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
// 调用数据

import { shaixuan } from '@/api/shangpin/index.js'



//所搜名称
const input1 = ref('')
// 查找后的数据
const list = ref([])
// 搜索后的记录
const jilu = ref(JSON.parse(localStorage.getItem('jilu')) || [])
//提交信息给这个页面数据，清空搜索框数据惊醒搜索
// 函数-----------------------
const search = async(i)=>{
        // 判断历史记录的判断是否存在
    const Blist = JSON.parse(localStorage.getItem('jilu'))
    if(Blist){
        const B = Blist.indexOf(i)
        if(B !=-1){
            // 删除这条
            jilu.value.splice(B,1)
        }
    }
    
    input1.value = ''
    // 是否为空
    if(i == ''){
        return ElMessage.error('请输入搜索内容')
    }
   

    list.value =  await shaixuan(i)
    jilu.value.unshift(i)
    // 储存到本地位置
    localStorage.setItem('jilu',JSON.stringify(jilu.value)) 

}
// 搜索历史记录也是可以提交
</script>
<template>
    <div class="sousuo">
<!-- 标题/可返回上一页和题目 -->
        <el-page-header @back="$router.go(-1)">
            <template #title>
                <span>返回</span>
            </template>
            <template #content>
            <span > 搜索页 </span>
            </template>
        </el-page-header>
<!-- 搜索框 -->
        <div class="mt-1">
            <el-input
            v-model="input1"
            style="max-width: 600px"
            placeholder="请输入搜索内容"
            class="input-with-select"
            @keyup.enter="search(input1)"
            >
            <template #append>
                <el-button :icon="Search" @click="search(input1)" />
            </template>
            </el-input>
        </div>
<!-- 历史记录 -->

        <div class="mt-2">
            <h4>历史记录</h4>
            <ul> <li v-for="(item,index) in jilu" :key="index" @click="search(item)">{{ item }}</li></ul>
        </div>
<!-- 所搜结果 -->
        <hr>
        <div class="mt-3">
            <ul v-if="list.length > 0">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(item,index) in list" :key="index"><zhuye :item = item></zhuye></el-col>
                </el-row> 
            </ul>
            <div v-else>
                <el-empty description="暂无数据" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.sousuo{
    width: 50%;
    margin: 0 auto;
}
.el-page-header{
    padding: 10px 0px;
    margin-left:20px ;
}
.mt-1{
    margin: 10px 0px;
    padding: 10px 20px;
}
.mt-2{
    margin: 10px auto;
    padding-left: 10px;
}
.mt-2 ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
.mt-2 ul li{
    border: 1px solid black;
    border-radius: 20%;
    margin: 10px 10px;
    padding: 5px 10px;
    cursor: pointer;
}
.mt-3 ul{
    list-style: none;
}
</style>