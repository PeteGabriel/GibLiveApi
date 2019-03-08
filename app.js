const Koa = require('koa');
const app = new Koa();

const flightRouter = require('./1presentation/routers/flights_router')

app.use(flightRouter.routes());

app.listen(3000);