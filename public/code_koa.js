
var Koa = require('koa');
var router = require('koa-router')();

var mysql = require('mysql');
const http = require('http');
var app = new Koa();
var array = [];

app.use(router.routes());
app.use(router.allowedMethods());


//连接数据库
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
	// 填入数据库密码
    password : '123456',
    port : '3306',
    database : 'test_database'
});
// 执行连接
connection.connect();

//增
router.get('/add',async (ctx)=>{
	//let a = {'number':'11','name':'kkk','id':201804};
	let data = ctx.query;
	connection.query("INSERT INTO `student_info` set ?", data ,function(err,results){
		if (err) throw err;
	    
	});

	connection.query('SELECT *from `student_info`', function(err, rows) {
	  	if (err) throw err;
		console.log(rows);
		ctx.body=(rows);

	});
});

//删
router.get('/delete',async(ctx)=>{
	let code = ctx.req.query.number;
	console.log(code);
	connection.query('delete from student_info where number=' + code , code , function(err,results){
		if (err) throw err;
	});

	connection.query('SELECT *from student_info', function(err, rows) {
	  	if (err) throw err;
	    	ctx.body(rows);
	});
});

//改
router.get('/change',(ctx)=>{
	let code = ctx.req.query.number;
	let name = ctx.req.query.name;
	let id = ctx.req.query.ID;
	connection.query("update student_info set name='" + name + "'where number=" + code ,function(err,results){
		if (err) throw err;
	});
	connection.query("update student_info set id='" + id + "'where number=" + code ,function(err,results){
		if (err) throw err;
	});

	connection.query('SELECT *from student_info', function(err, rows) {
	  	if (err) throw err;
	    	ctx.body(rows);
	});

});

//查
router.get("/query",async (ctx)=>{

	connection.query('SELECT *from student_info', function(err, rows) {
	  	if (err) throw err;
	    	ctx.body(rows);

	});
});

app.listen(3114,function(){
console.log('connect right in localhost:3114');
});















