import * as Router  from 'koa-router';
const router = new Router();


router.get('/live', (ctx: any, next: Function) => {
  ctx.body = 'hello'
  ctx.status = 200
  return next()
})

router.get('/live/departures', (ctx: any, next: Function) => {
  ctx.body = 'departures'
  ctx.status = 200
  return next()
})

router.get('/live/arrivals', (ctx: any, next: Function) => {
  ctx.body = 'arrivals'
  ctx.status = 200
  return next()
})

export default router