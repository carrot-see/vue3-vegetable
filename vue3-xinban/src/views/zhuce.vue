<template>
    <div 
    class="inline-flex from"
        h="40"
        w="30"
        m="2"
        :style="{
          boxShadow: `var(--el-box-shadow)`,
        }"
    >
        <p class="top">
            <span @click="this.$router.push('/')">＜返回主页面</span>
            <span @click="iFlogin(0)">用户注册</span>
            <span @click="iFlogin(1)">用户登录</span>
        </p>
        <div v-if="IFlogin==0">
            <el-input v-model="user.name" style="width: 240px" placeholder="用户名" />
            <el-input v-model="user.id" style="width: 240px" placeholder="请输入手机号" />
            <el-input v-model="user.password" style="width: 240px" placeholder="密码要求大小写3个数字以上" type="password"/>
            <div>
                <el-input v-model="tuxingma" style="width: 240px" placeholder="请输入图形码" />
                <img src="" :alt="txnumber" @click="txyanzheng">
            </div>
            <div>
                <el-input v-model="number" style="width: 240px" placeholder="请输入验证码" />
                <button @click="yanzheng" :disabled="!IFtime">{{IFtime ? '获取验证码' : time+'秒后重新获取'}}</button>
            </div>
                
            <div class="button">
                <button @click="tijiao(0)">注册</button>
            </div>
        </div>
        <div v-else-if="IFlogin==1">
            <el-input v-model="user.id" style="width: 240px" placeholder="请输入手机号" />
            <el-input v-model="user.password" style="width: 240px" placeholder="请输入密码" type="password"/>
            <div>
                <el-input v-model="tuxingma" style="width: 240px" placeholder="请输入图形码" />
                <img src="" :alt="txnumber" @click="txyanzheng">
            </div>
            <div>
                <el-input v-model="number" style="width: 240px" placeholder="请输入验证码" />
                <button @click="yanzheng" :disabled="!IFtime">{{IFtime ? '获取验证码' : time+'秒后重新获取'}}</button>
            </div>
                <div class="button">
                    <button @click="tijiao(1)">登录</button>
                </div>
        </div>
  </div>
</template>

<script >
// 获取标签
import { zhuce,updata,denglu } from '@/api/user/index.js'
import { ElMessage } from 'element-plus'
export default {
    data(){
        return{
            IFlogin: 0,
            tuxingma: '',
            IFtime: true,
            time: 60,
            timer: null,
            user: {
                id:'',
                name: '',
                password: '',
                yanzhengma: '',
                shoucang:''
            },
            number:'',
            txnumber:'获取图证码',
        }
    },
    created(){
        if(localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user'))
        }
    },
    methods: {
        iFlogin(i){
            this.IFlogin = i
        },
        yanzheng(){
            this.number = Math.floor(Math.random()*9999)
            this.user.yanzhengma = this.number
            alert('验证码是'+this.number)
            this.IFtime = false
            clearInterval(this.timer)
                this.timer = setInterval(()=>{
                    console.log('1')
                    this.time--
                    if(this.time <= 0){
                        this.IFtime = true
                        this.time = 60
                        clearInterval(this.timer)
                    }
                },1000) 
        },
        txyanzheng(){
            let txNumber = Math.floor(Math.random()*10000)
            console.log(this.txnumber);
            this.txnumber = txNumber
        },
        async tijiao(i){
            
        // 检测用户名
        // ^ 开头
        // $ 结尾
        // . 任意字符
        // * 0 次或多次
        // + 至少 1 次
        // ? 0 或 1 次
        // {3} 3 次
        // {3,} 至少 3 次
        // \d 数字
        // [a-z] 小写字母
        // [A-Z] 大写字母
        // (?=.*xx) 必须包含 xx

            if(!this.user.id.match(/^1[3-9]\d{9}$/)){
                alert("请输入正确的手机号")
                return
            }
            if(!this.user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/)){
                alert("请输入正确的密码,")
                return
            }
            // 检测图形码
            if(this.tuxingma!= this.txnumber){
                alert("图形码错误")
                return
            }
            if(this.user.yanzhengma!= this.number||this.IFtime){
                alert("验证码错误")
                return
            }
            // 点的是注册 0
            if(i == 0){
                if(localStorage.getItem('user')){
                    const res = await updata(this.user)
                    localStorage.setItem('user',JSON.stringify(res))
                    this.$router.push('/user')
                }else{
                    const res = await zhuce(this.user)
                    if(res!=0){
                        localStorage.setItem('user',JSON.stringify(this.user))
                        this.$router.push('/user')
                    }else if(res==0){
                        ElMessage.error('手机号已存在')
                        return
                    }
                }
                
            }
            // 点登录是 1
            if(i == 1){
                const res = await denglu(this.user)
                if(res!=0){
                    localStorage.setItem('user',JSON.stringify(res))
                    this.$router.push('/user')
                }
            }

        },
    },
    unmounted(){
        clearInterval(this.timer)
        this.timer = null

        
    }
    
}
// 检测标签进行处理-----------
// 获取数据库数据   验证码
</script>

<style scoped>
.from {
    width: 400px;
    margin: 50px auto;
    padding: 20px 50px;
    border-radius: 20px;
    background-color: #e2e0e07a;
}
.el-input{
    margin: 10px 20px;
    height: 20px;
}
.button{
    padding: 10px 20px;
}
.button button{
    padding: 0px 20px;
}
.top{
    padding: 0px 20px;
    display: flex;
    justify-content: space-evenly;
}

</style>