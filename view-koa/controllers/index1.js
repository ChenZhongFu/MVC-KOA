// index:
const model = require('../model');
module.exports = {
    'GET /index1': async (ctx, next) => {
        ctx.render('index1.html', {
            title: 'Welcome',
            API:'业务路由',
            API_description:'业务路由'
        });
    }
};
