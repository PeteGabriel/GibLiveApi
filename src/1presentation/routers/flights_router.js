import Router from 'koa-router';
var router = new Router();


router.get('/', (ctx, next) => {
	ctx.body = 'hello'
	ctx.status = 200
	return next()
})





export default router