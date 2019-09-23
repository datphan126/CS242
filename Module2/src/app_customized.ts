import express, { Request, Response } from 'express';

import orderController from './controllers/order-controller';
import logger from './middlewares/logging';
import { runInNewContext } from 'vm';

const app = express();

var mw2 = (req: Request, res: Response, next: Function) => {
    console.log('Test 1');
    next();
};

var mw3 = function (req: Request, res: Response, next: Function) {
    console.log('End');
    next();
};

app.use('', logger, mw2);

// The router
app.get('/', (req, res, next) => { res.end('This is your express server.'); next(); });
app.get('/order', orderController);

app.use(mw3);

app.listen(3000, () => console.log('The server is running on  http://localhost:3000'));