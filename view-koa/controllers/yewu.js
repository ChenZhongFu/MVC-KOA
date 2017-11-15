const model = require('../model');
let
    Business=model.Business;
module.exports = {
    'POST /yewu': async (ctx, next) => {
        yw=ctx.request.body.yewu || '';
        phone=ctx.request.body.phone||'';
        if(yw==="call"){
            //这里查询数据库，寻找业务对应的url
            var businesses=await Business.findAll({
                where:{
                    yewu:yw
                }
            });
            for(let b of businesses){
                console.log('call ok!');
                url=b.url;
                ctx.render(url+'.html', {
                    title: 'Welcome',
                    API:'您成功调用了打电话API',
                    API_description:'这是API的功能描述'
                });
            }
        }else if(yw=="buy_plane"){
            //这里查询数据库，寻找业务对应的url
            var businesses=await Business.findAll({
                where:{
                    yewu:yw
                }
            });
            for(let b of businesses){
                console.log('buy_plane ok!');
                url=b.url;
                ctx.render(url+'.html', {
                    title: 'Welcome',
                    API:'您成功调用了购买机票的API',
                    API_description:'这是API的功能描述'
                });
            }
        }else if(yw=="呼叫控制类API"){
            //这里查询数据库，寻找业务对应的url
            var businesses=await Business.findAll({
                where:{
                    yewu:yw
                }
            });
            for(let b of businesses){
                console.log('呼叫控制类API分发 ok!');
                url=b.url;
                fenfa='';
                if(phone.substring(0,3)==="188"){
                    fenfa='总部';
                }else{
                    fenfa='分部';
                }
                ctx.render(url+'.html', {
                    title: 'Welcome',
                    API:'您成功调用了呼叫控制类的API',
                    API_description:'您的号码被分发到'+fenfa+"处"
                });
            }
        }else{
            console.log('wrong');
            ctx.render('index1.html', {
                title: 'Welcome',
                API:'没有此业务，请重新输入',
                API_description:''
            });
        }
    }
};
