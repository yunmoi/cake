//引入上一级目录下的MySQL连接池对象
const pool=require('../pool.js');
const express=require('express');
//创建空路由
var router=express.Router();
//添加路由
//1.用户注册
router.post('/register',(req,res)=>{
	//获取post请求的数据
	var obj=req.body;
	//判断用户名是否为空
	var $uname=obj.uname;
	//判断密码是否为空
	var $upwd=obj.upwd;
	//判断手机是否为空
	var $phone=obj.phone;
	//判断生日是否为空
	var $birthday=obj.birthday;
	if(!$uname){
		res.send({code:401,msg:'用户名不能为空'});
		//阻止程序往后执行
		return;
	}
	if(!$upwd){
		res.send({code:402,msg:'密码不能为空'});
		return;
	}
	if(!$phone){
		res.send({code:404,msg:'电话不能为空'});
		return;
	}
	if(!$birthday){
		res.send({code:404,msg:'生日不能为空'});
		return;
	}
	//console.log($uname,$upwd,$phone,$birthday)
	//执行SQL语句，将注册的数据插入到cake_user数据表中，成功响应{code:200,msg:'register success'}
	pool.query('INSERT INTO cake_user SET ?',[obj],(err,result)=>{
		console.log(result);
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'注册成功'});
		}else{
			res.send({code:301,msg:'注册失败'});
		}
	});
});
//2.登录路由
router.post('/login',(req,res)=>{
	var obj=req.body;
	//验证数据是否为空
	var $uname=obj.uname;
	if(!$uname){
		res.send({code:401,msg:'用户名不能为空'});
	}
	//验证密码是否为空
	var $upwd=obj.upwd;
	if(!$upwd){
		res.send({code:402,msg:'密码不能为空'});
	};
	//执行那个SQL语句，查看是否登录成功（使用用户名和密码两个条件能查询到数据）
	pool.query('SELECT * FROM cake_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		//判断查询的结果（数组）长度是否大于0，大于0，说明查询到数据，有这个用户，登录成功
		if(result.length>0){
			res.send({code:200,msg:'登录成功'});
		}else{
			res.send({code:301,msg:'登录失败'});
		}
	});
});
//导出路由器
module.exports=router;