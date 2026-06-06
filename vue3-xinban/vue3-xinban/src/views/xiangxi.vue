<script setup>
import { ArrowLeft,Star } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { postshoucang, xiangxi,postgouwuche,buy } from '@/api/shangpin/index.js';
import { onMounted,ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const $router = useRouter()

const list = ref([])
onMounted( async ()=>{
    const route = useRoute().params.id
    const res = await xiangxi(route)
    list.value = res
})
// 把这个添加到收藏的内容
 //  点击添加收藏 /获取本地存储收藏数组在进行添加并存入数组库中
 const shoucang = async (i)=>{
    const y = JSON.parse(localStorage.getItem('user'))
    if(!y){
        ElMessage.error('请登录')
        $router.push('/user')
        return
    }else if(i == 1){
        //收藏
        const i = y.shoucang
        if(i.indexOf(list.value.id) == -1){
            i.push(list.value.id)
            localStorage.setItem('user',JSON.stringify(y))
            await postshoucang({i,id:y.id})
        }
        else{
            ElMessage.success('已收藏')
        }
    }else if(i == 2){
        //加入购物车
        //从本地储存获取购物车信息，进行判断有无这个{有：提示有了；没：加入
        const i = y.gouwuche
        if(i.indexOf(list.value.id) == -1){
            //添加购物车，
            i.push(list.value.id)
             const res =await postgouwuche({i,id:y.id})
             if(res!=0){
                localStorage.setItem('user',JSON.stringify(y))
             } 
        }else{
            ElMessage.success('已加入购物车')
            return
        }
        // 
    }else if(i == 3){
        //购买
        const i = y.buy
        if(i.indexOf(list.value.id) == -1){
            i.push(list.value.id)
            const res = await buy({i,id:y.id})
            if(res != 0){
                localStorage.setItem('user',JSON.stringify(y))
            }      
        }
        else{
            ElMessage.success('已购买商品')
        }
    }
 }
// 点击后是加入购物车
// 点击后在购物着里面有
</script>
<template>
    <div class="div" >
    <!--  导航栏-->
        <el-page-header :icon="ArrowLeft" @click="$router.push('/')">
            <template #title >
                <span>返回主页</span>
            </template>
            <template #content>
            <span class="text-large font-600 mr-3"> {{ list.text }}页面 </span>
            </template>
        </el-page-header>
        <hr>
    <!-- 图片轮播 -->
        <div class="lunbo">
            <el-carousel height="300px">
            <el-carousel-item v-for="item in 5" :key="item" >
                <img  :src="list.image" :title="list.title"/>{{ item }}
            </el-carousel-item>
            </el-carousel>
        </div>
        <hr>
    <!-- 详细信息 -->
        <div class="xi">
            <h3>商品介绍</h3>
            <div class="xi-1">
                <p><span >价格：</span> {{ list.qian }}￥</p>
                <div class="xi-1-1">
                    <p><span >类型名：</span> {{ list.text }}</p>
                    <p><span >类型：</span> {{ list.leixing }}</p>
                    <p><span >产品时间：</span> {{ list.pin }}</p>
                    <p><span >内容信息：</span> {{ list.text1 }}</p>
                </div>
            </div>
        </div>
        <hr>
    <!-- 评论 -->
        <div>
            <h3>评论</h3>
            <p>没有评论</p>
        </div>
        
    <!-- 搜藏/加入购物车/购买/收藏 -->
        <div>
            <el-button @click="shoucang(1)"><el-icon><Star /></el-icon>收藏</el-button>
            <el-button @click="shoucang(2)">加入购物车</el-button>
            <el-button @click="shoucang(3)">购买</el-button>
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
.el-page-header{
    margin-bottom: 20px;
}
.lunbo{
    margin: 10px;
}
.div>div{
    margin: 20px;
}
.el-carousel__item{
    background-color: pink;
    width: 100%;
    height: 100%;
}
.xi-1 p{
    margin:20px 10px;
}
.xi-1 p span{
    font-weight: bold;
}
.xi-1>p:nth-child(1){
    margin: 40px 10px;
}
.xi-1-1{
    display: flex;
}
</style>