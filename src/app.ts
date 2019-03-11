const Koa = require('koa');
const app = new Koa();

// Routers
import flightRouter from './1presentation/routers/FlightsRouter';

// Middleware registration

app.use(flightRouter.routes());



app.listen(3000);