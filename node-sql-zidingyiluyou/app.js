const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors());
const mysql = require('mysql2');
const { log } = require('node:console');
const db = mysql.createPool({
    host:"127.0.0.1",
    port:'13306',
    user:'root',
    password:'123456',
    database:'myjs'
})
//-----------------------------------------------------------------------    
//get()是直传路由的参数
//post是要进行要进行json解析在body传值
//put或者是patch是由路径传id（不用解析的id）在由body传数据进行修改
//delete是由路径传id（不用解析的id）进行删除

//新的vant-gouwu的服务器
app.get('/renjiyanzheng',(req,res)=>{
    console.log("人机验证获取");
    const id = Math.floor(Math.random() * 10)+1
    console.log(id);
    
    db.query('select * from yanzhengma where id = ?',[id],(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            console.log("人机验证获取成功");
            res.send({
                code: 1,
                sesule:sesule
            })
        }
    })
})
app.post('/shoujiyanzheng',(req,res)=>{
    const shoujihao = req.body.shoujihao
    db.query('select * from shouji where shoujihao = ?',[shoujihao],(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            if(sesule.length > 0) {
                res.send({
                    code: 1,
                    sesule: sesule
                })
            }else {
                res.send({
                    code: 0,
                    text:'手机号错误'
                })
            }
        }
    })
})
// vue3的信息服务器
//查找账户则在进行登录---------------------+-----------------------------------------------
app.post('/updata',(req,res)=>{
    const {id,name,password,yanzhengma} =req.body.i
    db.query('update  user set name = ?,password = ?,yanzhengma = ? where id = ?',[name,password,yanzhengma,id],(err,sesule)=>{
        if(err){
            console.log(err);
            
            res.send({
                code:0,
                text:'修改失败'
            })
            return
        }else{
            db.query('select * from user where id = ? and password = ? and yanzhengma = ?',[id,password,yanzhengma],(err,sesule)=>{
                if(err){
                    console.log(err);
                    return
                }else{
                    if(sesule.length > 0){
                        res.send({
                            code:1,
                            sesule:sesule[0]
                        })
                    }else{
                        res.send({
                            code:0,
                            text:'修改失败'
                        })
                    }
                }
            })
        }
    })
    
})
// 登录
app.post('/denglu',(req,res)=>{
    const {id,password,yanzhengma} = req.body.i
    console.log(id,password,yanzhengma);
    // 查找有无这个id用户
    db.query('select (password) from user where id = ?',[id],(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            const password1 = sesule[0].password
            // 判断密码是否正确
            if(password1 == password){
                // 修改验证码
                db.query('update user set yanzhengma = ? where id=? and password=?',[yanzhengma,id,password1],(err,sesule)=>{
                    if(err){
                        console.log(err);
                        return
                    }else{
                        // 查找这个用户
                        db.query('select * from user where id = ? and password = ? and yanzhengma = ? ',[id,password,yanzhengma],(err,sesule)=>{
                            if(err){
                                console.log(err);
                                return
                            }else{
                                if(sesule.length > 0){
                                    res.send({
                                        code:1,
                                        sesule:sesule[0]
                                    })
                                }else{
                                    res.send({
                                        code:0,
                                        text:'手机号或密码错误'
                                    })
                                    return
                                }
                            }
                        })
                    }
                })
            }else{
                res.send({
                    code:0,
                    text:'密码错误'
                })
            }
        }
    })
    
    
    
})
//注册账号
app.post('/zhuce',(req,res)=>{
    const name = req.body
    const res1 = name.name
    db.query('insert into user (id,name,password,yanzhengma) values (?,?,?,?)',[res1.id,res1.name,res1.password,res1.yanzhengma],(err,sesule)=>{
        if(err){
            console.log(err);
            
            res.send({
                code:0,
                text:'注册失败'
            })
            return
        }else{
            res.send({
                code:1,
                text:'注册成功'
            })
        }
    })
})

//首页的数据内容
// 1.标题
//2. 搜索框
//3.轮播图
//获取总体数据
app.get ('/tu', (req,res) => {
    db.query('select * from chanpin',(err,sesule) => {
        if(err){
            console.log(err+'错误');
            return
        }else{
            res.send({
                code: 1,
                sesule: sesule
            })
        }
    })
})
//搜索的内容的搜索
app.post ('/postshaixuan',(req,res) => {
    //综合/产量/价格/名字  进行查找
    const { name } = req.body
    // console.log(name)
    db.query('select * from chanpin where leixing like ?',[`%${name}%`],(err,sesule) => {
        if(err){
            console.log(err+'错误');
            return
        }else if(sesule.length > 0){
            res.send({
                code: 1,
                sesule: sesule
            })
        }else{
            res.send({
                code: 0,
                text:'没有搜索到相关商品'
            })
        }
    })
})
// 获得表里的类型由几种
app.get('/fenlei',(req,res) =>{
    db.query('select leixing from chanpin group by leixing',(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            res.send({
            code: 1,
            sesule: sesule.map(item => item.leixing)
    })
        }
    })
    
})
// 收藏信息---+---添加数组，收藏的时内容id来存储获取时是id渲染  //其他的都要改为由ID进行查询数据和凑做
app.post('/postshoucang',(req,res)=>{
    const { i } = req.body
    const text = JSON.stringify(i.i)
    db.query('update user set shoucang=? where id=?',[text , i.id],(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            res.send({
                code:1,
                text:"收藏成功"
            })
        }
    })
})
//获取收藏数据--------
app.post('/getshoucang',(req,res)=>{
    const  {id,yanzhengma}  = req.body.id

    db.query('select shoucang from user where id=? and yanzhengma=?',[id,yanzhengma],(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            
            db.query('select * from chanpin where id in (?)',[sesule[0].shoucang],(err,sesule)=>{
                if(err){
                    res.send({
                        code:0,
                        text:'没有收藏商品'
                    })
                    return
                }else{
                    res.send({
                        code:1,
                        sesule:sesule
                    })
                }
            })
        }
    })
})
// 删除收藏
app.post('/delshoucang',(req,res)=>{
    const {id,name} = req.body
    console.log(id,name);
    db.query('select (shoucang) from user where id=?',[name],(err,sesule)=>{
        if(err){
            res.send({
                code:0,
                text:'没有内容'
            })
            return
        }else{
            // 用这个数组转换数组在遍历保存
            const i = sesule[0].shoucang
            i.splice(i.indexOf(id),1)
            //更改数据
            const text = JSON.stringify(i)
            db.query('update user set shoucang=? where id=?',[text, name],(err,sesule)=>{
                if(err){
                    console.log(err+'错误');
                    return
                }else{
                    res.send({
                        code:1,
                        text:"删除成功"
                    })
                }
            })
            
        }
    })
})
//获得详细的信息根据id来渲染
app.post('/xiangxi',(req,res)=>{
    const {i} = req.body
    db.query('select * from chanpin where id = ?',[i],(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            
            res.send({
                code:1,
                sesule:sesule[0]
            })
        }
    })
    
})
// 修改购物车--
app.post('/postgouwuche',(req,res)=>{
    const {i,id} = req.body
    const y = JSON.stringify(i)
    db.query('update user set gouwuche=? where id=?',[y,id],(err,sesule)=>{
        if(err){
             res.send({
                code:0,
                text:'没有内容'
            })
            return
        }else{
            res.send({
                code:1,
                text:"修改成功"
            })
        }
    })
})
//删除购物车商品
app.post('/delgouwuche',(req,res)=>{
    const {id,arr} = req.body
    const arr1 = JSON.stringify(arr)
    db.query('update user set gouwuche=? where id=?',[arr1,id],(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            res.send({
                code:0,
                text:'没有内容'
            })
            return
        }else{
            res.send({
                code:1,
                text:"删除成功"
            })
        }
    })
})
//购买--
app.post('/buy',(req,res)=>{
    const {i,id} = req.body
    const y = JSON.stringify(i)
    db.query('update user set buy=? where id=?',[y,id],(err,sesule)=>{
        if(err){
             res.send({
                code:0,
                text:'没有内容'
            })
            return
        }else{
            res.send({
                code:1,
                text:"购买成功"
            })
        }
    })
})
//删除购买
app.put('/delbuy/:id',(req,res)=>{
    const id = req.params.id
    const arr = req.body.arr
    db.query('update user set buy=? where id=?',[arr,id],(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            res.send({
                code:0,
                text:'没有内容'
            })
            return
        }else{
            res.send({
                code:1,
                text:"删除成功"
            })
        }
    })
})
//根据id查商品内容
app.post('/getidarray',(req,res)=>{
    const id = req.body
    // // 就是那逗号隔开
    db.query('select * from chanpin where id in (?)',[id],(err,sesult)=>{
        if(err){
            res.send({
                code:0,
                text:'没有内容'
            })
            return
        }else{
            res.send({
                code:1,
                sesule:sesult
            })
        }
    })
})
//------------------------------------------------------------------------------------------
app.get('/select',(req,res)=>{
    console.log("dd");
    db.query('select * from text ',(err,sesult)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            // res.send({
            //     code:1,
            //     text:sesult
            // })
            res.json(sesult)
        }
    })
})
app.post(`/shu`,(req,res)=>{
    const {id, text,shu} = req.body;
    console.log(id,text);
    
    if(text ==1){
        db.query("update text set shu=? where id=? ",[shu+1,id],(err,sesule) => {
            if(err) {
                console.log(err+'没成功1');
                return
            }else{
                db.query('select * from text where id=?',[id],(err,sesule) => {
                    if(err) {
                        console.log(err+'没成功1');
                        return
                    }else{
                        res.send(sesule)
                    }
                })
            }
        })
    }else if(text ==2 && shu>0) {
        db.query("update text set shu=? where id=? ",[shu-1,id],(err,sesule) => {
            if(err) {
                console.log(err+'没成功2');
                return
            }else{
                db.query('select * from text where id=?',[id],(err,sesule) => {
                    if(err) {
                        console.log(err+'没成功1');
                        return
                    }else{
                        res.send(sesule)
                    }
                })
                
            }
        })
    }
    
})


app.listen(3000,()=>{
    console.log("http://127.0.0.1:3000/select");
    
})