<template>
  <div class="div"> 
    <div>
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="shaixuanerr(item)">{{item}}</li>
      </ul>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in LIST" :key="index"><zhuye :item = item></zhuye></el-col>
    </el-row>  
  </div>
</template>

<script setup>
import { ref,onBeforeMount } from 'vue'
import zhuye from '@/components/shouye/zhuye.vue'
import { userneirong } from '@/store/neirong';
import { shaixuan,fenlei } from '@/api/shangpin/index.js'
// 所有的数据
const list = ref([])
// 右面的数据筛选
const LIST = ref([])
// 页面加载完后获取数据库的所有数据
onBeforeMount(async ()=>{
  LIST.value =  await userneirong().getList()
  list.value =  await fenlei()
  
})
async function shaixuanerr(i){
  // console.log(i);
  // 筛选数据给数据库让他筛选后返回数据在存入分类数据-------------
  LIST.value = await shaixuan(i)
}
</script>

<style scoped>
.div div:nth-child(1) ul{
  display: flex;
  border-bottom: 1px solid rgb(130, 138, 130);
  border-radius: 10px;
}
.div div:nth-child(1) ul li{
  padding: 0px 20px;
  border-right: 1px solid rgb(130, 138, 130);
  list-style: none;

  margin: 10px 10px;
  cursor: pointer;
}
.el-row{
  margin-top: 50px;
}
</style>