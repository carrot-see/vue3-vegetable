const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors());
const mysql = require('mysql2');
//只能查看
const db = mysql.createPool({
    host:"127.0.0.1",
    port:'13306',
    user:'vue1',
    password:'123456',
    database:'myvue'
})
// 不能删除
const db2 = mysql.createPool({
    host:"127.0.0.1",
    port:'13306',
    user:'vue2',
    password:'123456',
    database:'myvue2'
})
// 都能操作
const db3= mysql.createPool({
    host:"127.0.0.1",
    port:'13306',
    user:'vue3',
    password:'123456',
    database:'myvue3'
})
// --------------------------------------------------------------------------
app.get('/user',(req,res)=>{
    db.query('select * from myuser',(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            res.send({
                code:1,
                sesule:sesule
            })
        }
    })
})
app.post('/user/1',(req,res)=>{
const {name,password} = req.body
console.log(name,password);

    db.query('insert into myuser (name,password) values (?,?)',[name,password],(err,sesule)=>{
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
app.post('/user/2',(req,res)=>{
const {id,name,password} = req.body
    db.query('update myuser set password=? , name=? where id=?',[password,name,id],(err,sesule)=>{
        if(err){
            console.log(err);
             res.send({
                code:0,
                text:'更新失败'
            })
             return
        }else{
            res.send({
                code:1,
                text:'更新成功'
            })
        }
    })
})
app.post('/user/3',(req,res)=>{
const {id} = req.body
    db.query('delete from myuser where id=?',[id],(err,sesule)=>{
        if(err){
            console.log(err);
             res.send({
                code:0,
                text:'删除失败'
            })
             return
        }else{
            res.send({
                code:1,
                text:'删除成功'
            })
        }
    })
})
// --------------------------------------------------------------------------
app.get('/user2',(req,res)=>{
    db2.query('select * from myuser',(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            res.send({
                code:1,
                sesule:sesule
            })
        }
    })
})
app.post('/user2/1',(req,res)=>{
const {name,password} = req.body
console.log(name,password);
    db2.query('insert into myuser (name,password) values (?,?)',[name,password],(err,sesule)=>{
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
app.post('/user2/2',(req,res)=>{
const {id,name,password} = req.body
console.log(id,name,password);

    db2.query('update myuser set password=? , name=? where id=?',[password,name,id],(err,sesule)=>{
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
app.post('/user2/3',(req,res)=>{
const {id} = req.body
    db2.query('delete from myuser where id=?',[id],(err,sesule)=>{
        if(err){
            console.log(err);
             res.send({
                code:0,
                text:'删除失败'
            })
             return
        }else{
            res.send({
                code:1,
                text:'删除成功'
            })
        }
    })
})
 
// -----------------------------------------------------------------------
app.get('/user3',(req,res)=>{
    db3.query('select * from myuser',(err,sesule)=>{
        if(err){
            console.log(err+'错误');
            return
        }else{
            res.send({
                code:1,
                sesule:sesule
            })
        }
    })
})
app.post('/user3/1',(req,res)=>{
const {name,password} = req.body

    db3.query('insert into myuser (name,password) values (?,?)',[name,password],(err,sesule)=>{
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
app.post('/user3/2',(req,res)=>{
const {id,name,password} = req.body
console.log(id,name,password);
    db3.query('update myuser set password=? , name=? where id=?',[password,name,id],(err,sesule)=>{
        if(err){
            console.log(err);
             res.send({
                code:0,
                text:'更新失败'
            })
             return
        }else{
            res.send({
                code:1,
                text:'更新成功'
            })
        }
    })
})
app.post('/user3/3',(req,res)=>{
const {id} = req.body
    db3.query('delete from myuser where id=?',[id],(err,sesule)=>{
        if(err){
            console.log(err);
             res.send({
                code:0,
                text:'删除失败'
            })
             return
        }else{
            res.send({
                code:1,
                text:'删除成功'
            })
        }
    })
})
// 
app.listen(3000,()=>{
    console.log('服务器启动成功');
})

