const Koa = require('koa');
const app = new Koa();

//Routers
const flightRouter = require('./1presentation/routers/flights_router')

//Middleware registration
app.use(flightRouter.routes());



app.listen(3000);