var Koa = require('koa');

var router = require('koa-router')();

var http= require('http');

var app = new Koa();

var views = require('koa-views');

var parser = require('koa-parser');

var bodyParser = require('koa-bodyparser');

app.use(views('views',{extension:'ejs'}));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

//修改ejs文档的读取路径
//app.set('views','./Tasks/004_weatherForecast/views');


router.get('/',async (ctx)=>{
    await ctx.render('query')
});



router.post('/query',async (ctx)=>{
    console.log('area:',ctx.request.body.area);
    var options={
        host:"apis.juhe.cn",
        path:encodeURI("/simpleWeather/query?city="+ctx.request.body.area+"&key=2c49bdc27909a7cc98e0ba7e1dea9ce5"),
        method:'get'
    };
    console.log('options',options);
    var sendmsg='';
    var request=http.request(options,function(response){
        response.on("data",function(chunk){
            sendmsg+=chunk;
            console.log(sendmsg);
        });

        response.on("end",function(d){
            var list=JSON.parse(sendmsg);
            console.log('list:',list);
            console.log(list.result.city);

            ctx.render('weather',{
                city:list.result.city,
                temperature:list.result.realtime.temperature,
                info:list.result.realtime.info,
                direct:list.result.realtime.direct,
                future:list.result.future,
            })
        });
    });
    request.end();

});

app.listen('3113',()=>{
    console.log('OK');
});