// index:
const model = require('../model');
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'Welcome',
            API:'用户登录',
            API_description:'用户登录'
        });
    }
};
