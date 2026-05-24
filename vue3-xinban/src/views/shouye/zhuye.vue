<template>
  <div>
    <div >
      <el-input
      v-model="input1"
      style="width: 100%;margin: 10px auto;"
      placeholder="请输入搜索内容"
      :suffix-icon="Search"
      @click="$router.push('/sousuo')"
    />
    </div>
    <div class="TOP">
      <!-- 头部 -->
      <div class="top">
        <!-- 圆球 -->
        <div>信息水果</div>
        <div></div>
      </div>
    </div>
    <!-- 数据表格 -->
     <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in list" :key="index"><zhuye :item = item></zhuye></el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import {userneirong} from '@/store/neirong.js'
import { Search } from '@element-plus/icons-vue'
// 搜索框的内容
const input1 = ref('')
const list = ref([])
const u = userneirong()
onBeforeMount(async ()=>{  
   list.value = await u.getList()
})



// import { neirong } from '@/api/index.js'
//  onBeforeMount(async ()=>{
//   const res = await neirong()
//   list.value = res
  
// })
// import { useStore } from '@/store/user/index.js'
// const name = useStore()

// console.log(name.chu());

import zhuye from '@/components/shouye/zhuye.vue'

</script>

<style scoped>
.el-input.el-input--suffix{
  padding: 0px 10px;
}
.TOP{
  width: 100%;
  height:250px;
}
.top{
  width: 200px;
  margin: 10px auto;
  position: relative;
  text-align: center;
  line-height: 200px;
  color: green;
  font-size: 20px;
}
.top div:nth-child(1){
width: 200px;
height: 200px;
border: 1px solid green;
border-radius: 41% 50%;
position: absolute;
z-index: 2;
margin: 45px auto;

}
.top div:nth-child(2){
  border: 1px solid green;
  width: 200px;
  height: 200px;
  border-radius: 50% 41%;
  position: absolute;
  margin: 45px auto;
}
.el-row>div{
  border-bottom: 1px solid #ccc;
}
</style>