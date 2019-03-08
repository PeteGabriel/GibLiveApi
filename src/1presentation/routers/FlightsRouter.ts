import * as Router  from 'koa-router';
const router = new Router();


router.get('/', (ctx: any, next: Function) => {
  ctx.body = 'hello'
  ctx.status = 200
  return next()
})





export default router