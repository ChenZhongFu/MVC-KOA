// sign in:
const model=require('../model');
let
    User=model.User;
module.exports = {
    'POST /signin': async (ctx, next) => {
        var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
        if (email ==='admin@example.com' && password === '123456') {
            var u_lock=0;
            //检查是否有此用户，没有则新建该用户
            var now=Date.now();
            var users=await User.findAll({
                where:{
                    email:email
                }
            });
            if(users.length===0){
                console.log('没有该用户，新建一个');
                var new_user=await User.create({
                    email:email ,
                    passwd: password,
                    name: "fufu",
                    gender: true,
                    login_time:now,
                    login_count:1,
                    createdAt: now,
                    updatedAt: now,
                    version: 0,
                    last_login_time:now,
                    login_continue_count:0,
                    lock:0,
                    level:0
                });
                console.log('created:'+JSON.stringify(new_user));
            }else{
                console.log('有用户，更新');
                for(let u of users){
                    console.log('update user');
                    console.log('user:'+u.email+'  last login time is '+new Date(u.login_time));
                    timediff=Date.now()-u.last_login_time;
                    console.log('timediff:'+timediff);
                    if(timediff>=1000){
                        u.login_continue_count++;
                    }else{
                        u.login_continue_count=0;
                    }
                    if(u.login_continue_count>=3){
                        u.lock=1;
                    }
                    u.login_time=Date.now();
                    u.login_count++;
                    u.updatedAt=Date.now();
                    await u.save();
                    console.log('user:'+u.email+'  login counts is '+u.login_count);
                    console.log('user:'+u.email+'  now login time is '+new Date(u.login_time));
                    var lg_count_limited=0
                    if(u.level===0){
                        lg_count_limited=5
                    }else{
                        lg_count_limited=10
                    }
                    if(u.login_count>=lg_count_limited){
                        console.log('warning!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        u_lock=1;
                    }
                    if(u.lock===1){
                        u_lock=1;
                    }
                }
            }

            if(u_lock===1){
                console.log('fang wen shou xian!');
                ctx.render('signin-limited.html', {
                    title: 'Sign limited',
                    name: 'Mr Node',
                    API:'由于过于频繁访问API或一天内访问次数过多，您今天不能再访问'
                });
            }else{
                console.log('signin ok!');
                ctx.render('signin-ok.html', {
                    title: 'Sign In OK',
                    name: 'Mr Node',
                    API:'使用API1'
                });
            }
        } else {
            console.log('signin failed!');
            ctx.render('signin-failed.html', {
                title: 'Sign In Failed',
                API:'使用api2'
            });
        }
    }
};
