<template>
  
<div class="app">
    <!-- 用户注册或登陆网址后出现用户信息 -->
    <div v-if="this.user.name" class="user">
        <div class="user-info1">
            <p>用户ID：{{ this.user.id }}</p>
            <p>用户名：{{ this.user.name }}</p>
            <button @click="this.$router.push('/zhuce')">修改用户信息</button>
        </div>
         <!-- 用户的需要信息 -->
         <div class = 'user-info2'>
            <div>
                <p>购物车</p>
                <el-row :gutter="20">
                    <el-col :span="6" v-for="item in gouwuche" :key="item.id">
                        <zhuye :item="item"></zhuye>
                        <el-button @click="del(1,item.id)">删除这条购物车商品</el-button>
                    </el-col>
                </el-row>
            </div>
            <div>
                <p>购买记录</p>
                <el-row :gutter="20">
                    <el-col :span="6" v-for="item in buy" :key="item.id">
                        <zhuye :key="item.id" :item="item"></zhuye>
                        <el-button @click="del(2,item.id)">删除这条购买记录</el-button>
                    </el-col>
                </el-row>
            </div>

         </div>
    </div>
    <button v-else @click="this.$router.push('/zhuce')">创建账户</button>
</div>
</template>

<script>
import { getidarray,delgouwuche,delbuybuy } from '@/api/shangpin/index.js';
import zhuye from '@/components/shouye/zhuye.vue';
export default {
    name: 'userIndex',
    components:{
        zhuye
    },
    data(){
        return{
            user:{},
            gouwuche:[],
            buy:[]
        }
    },
    methods:{
        async del(i,id){
            if(i == 1){
                // 删除购物车商品
                //查找这个内容进行渲染
                const arr = this.user.gouwuche.filter(item=>item != id)
                await delgouwuche({id:this.user.id,arr:arr})
                // 刷新购物车
                this.user.gouwuche = arr
                localStorage.setItem('user',JSON.stringify(this.user))
                this.arr()
            }else if(i ==2){
                // 删除购买记录
                const arr = this.user.buy.filter(item=>item != id)
                await delbuybuy({id:this.user.id,arr:arr})
                // 刷新购买记录
                this.user.buy = arr
                localStorage.setItem('user',JSON.stringify(this.user))
                this.arr()
            }
        },
        //重新在进行渲染
        async arr(){
            if(localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user'))
            }
            //获取数据库的信息根据id

            const res1 =  await getidarray(this.user.gouwuche)
            const res2 =  await getidarray(this.user.buy)
            this.gouwuche = res1
            this.buy = res2
        }
    },
    mounted(){
        // console.log("ss");
        this.arr()
    }
}
</script>

<style  scoped>
.user{
    display:flex;
}
.user-info1>p{
    padding:10px 0;
    margin: 10px 0;
    border-bottom:1px solid #ccc;
}
.user-info2{
    width:100%;
    border-left:1px solid #cccccc91;
    padding-left: 20px;
    margin-left: 20px;
}
.user-info2>div{
    margin-top: 40px;
    padding-top: 20px;
    /* border-top: 1px solid #ccc; */
    border-radius:20px;
}
.user-info2>div>p{
    border-bottom:1px solid #ccc;
    text-align: center;
    width:80%;
    padding-bottom:10px;
    margin: 0 auto;
}
.user-info2 .el-col{
    margin: 10px 20px;
    padding: 10px 20px;
    border-bottom:1px solid #ccc;
    border-radius:20px;
}
.user-info2 p{
    text-align: center;
}
</style>