<template>
  <div>
    <div class="app">
        <div class="ul">
          <li><router-link to="/shouye">首页</router-link></li>
          <li><router-link to="/shangpin">商品</router-link></li>
          <li><router-link to="/shoucang">收藏商品</router-link></li>
          <li><router-link to="/user">用户中心</router-link></li>
          <li class="an">
            <el-switch
              v-model="ifColor"
              class="ml-2"
              inline-prompt
              style="--el-switch-on-color: #000; --el-switch-off-color: green"
              @click = 'an'
              active-text="暗色"
              inactive-text="亮色"
            />
          </li>
              
        </div>
        <router-view class="router-view"></router-view>
    </div>
  </div>
</template>

<script setup>
import {  ref } from 'vue'
const emit = defineEmits(['ifColor'])
// localStorage.setItem('ifColor',)

const ifColor = ref(localStorage.getItem('ifColor')?true:false)
    function an(){
//开始时false亮色

      if(ifColor.value){
        // console.log("111");
        
        // this.ifColor = false
        emit('ifColor',1)
        localStorage.setItem('ifColor',1)
      }
      else if( !ifColor.value){
        // console.log("000");
        
        // this.ifColor = true
        emit('ifColor',0)
        localStorage.setItem('ifColor',[])
      }
    }
</script>

<style scoped>
.router-view{
  width: 50%;
  margin: 50px auto;
  padding: 0 20px;
  border-left:1px solid #cccccc9d;
  border-right:1px solid #cccccc9d;
  border-radius:15px;
  box-shadow: 0px 0px 12px #ccc, 0px 0px 12px #ccc;
  box-shadow: inset 0px 0px 12px #ccc, 0px 0px 12px #ccc;
}
.ul{
  height: 50px;
  width: 100%;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: space-around;
  list-style: none;
  background-color:green;
}
.ul li{
  padding: 10px;
  
}
.ul li a{
  text-decoration: none;
  color: white;
}
</style>