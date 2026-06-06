<script setup>
//从数据库调用过来没有则为空有则渲染，可以修改
import {ref,reactive,onMounted} from 'vue'
import {addchanpin} from '@/api/index'
import { getidarray } from '@/api/shangpin/index'
import zhuye from '@/components/shouye/zhuye.vue'
const user = JSON.parse(localStorage.getItem('user'))
const btn = ref(false)
const from = reactive({
  img:'',
  text:'',
  qian:'',
  pin:'',
  text1:''
})

// 提交表单
const submitfrom = async()=>{
  await addchanpin({list:from,user:user.id})
  btn.value = false
  this.$router.push('/user')
}
//页面执行前渲染有的商品
const list = ref([])
onMounted( async()=>{

  if(user){
    const res = await getidarray(user.creatchanpin)
    list.value = res
  }else{
    list.value = []
  }
  
})
</script>
<template>
<div class="div">
  <el-page-header @click="$router.push('/')">
    <template #title>
      <span class="text-large font-600 mr-3"> 返回 </span>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3"> 个人创建商品 </span>
    </template>
  </el-page-header>
  <div v-if="list" class = 'create-list'>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in list" :key="item.id">
        <zhuye :item="item"/>
      </el-col>
    </el-row>
    <div @click="btn = !btn" class="create-btn">
      ~点击创建商品创建~
    </div>

  </div>
  <template v-else>
    <el-empty description="暂无商品创建" >
      <el-button @click="btn = !btn" type="primary">商品创建</el-button>
    </el-empty>
  </template>
  <div class='createtext' v-show="btn">
    <div @click="btn = !btn" class="createtext-btn">x</div>
    <h2>商品创建</h2>
    <el-form class="input-group" >
      <el-input v-model="from.img" placeholder="图片网址信息地址" />
      <el-input v-model="from.text" placeholder="商品标题" />
      <el-input v-model="from.qian" placeholder="商品价格" />
      <el-input v-model="from.pin" placeholder="商品时间" />
      <el-input v-model="from.leixing" placeholder="商品类型" />
      <el-input
        clearable
        placeholder="内容详细描述"
        type="textarea"
        v-model="from.text1"
      />
      <el-button type="primary" @click="submitfrom">提交</el-button>
    </el-form>
  </div>
</div>
</template>
<style scoped>
.div{
    width: 50%;
    margin: 10px auto;
    padding:20px 10px ;
    box-shadow: 0px 0px 20px 0px rgb(0 0 0 / 45%);
}
.createtext{
    width: 49%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    color: #333;
    position:fixed;
    z-index:100;
    top:10%;
    border-radius: 10px;
    margin:10px 0;
    padding:20px 10px; 
}
.createtext-btn{
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  font-size: 30px;
  color: #333;
}
.createtext-btn:hover{
  color: #f00;
}
.input-group {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  width:80%;
  margin-top:20px;
}
.input-group .el-input {
  width: 80%;
}
.create-list .el-col{
    margin: 10px 20px;
    padding: 10px 20px;
    border-bottom:1px solid #ccc;
    border-radius:20px;
}
.create-list .create-btn{
  color:#8f8e8e;
  text-align: center;
  margin: 20px 0;
  padding:10px 20px;
  cursor: pointer;
}
</style>
