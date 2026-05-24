<script setup>
import zhuye from '@/components/shouye/zhuye.vue'
import { getshoucang,delshoucang } from '@/api/shangpin/index.js';
import { onMounted, ref } from 'vue';
const user = ref(JSON.parse(localStorage.getItem('user')) )
const shoucangList = ref([])
 onMounted(async ()=>{
  
  if(user.value){
    shoucangList.value=  await getshoucang(user.value)
  }else{

    shoucangList.value=[]
    return
  }
})
const del = async (i)=>{
  //删除本地在删除数据库
   user.value.shoucang.splice(user.value.shoucang.indexOf(i),1)
  localStorage.setItem('user',JSON.stringify(user.value))
  await delshoucang({id:i,name:user.value.id})
  shoucangList.value=  await getshoucang(user.value)
}

</script>
<template>
    <div>
      <!-- 数据表格 -->
        <el-row v-if="shoucangList.length" :gutter="20">
          <el-col :span="6" v-for="(item,index) in shoucangList" :key="index">
            <zhuye :item = item> 
              
            </zhuye>
            <el-button @click="del(item.id)">取消收藏</el-button>
          </el-col>
        </el-row>
      <!-- 空内容 -->
      <div v-else>
        <el-empty description="暂无收藏" />
      </div>
    </div>
</template>
<style scoped>
.el-row>div{
  border-bottom: 1px solid #ccc;
}
</style>