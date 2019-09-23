import { Request, Response } from 'express';

const handler = (req: Request, res: Response, next: Function) => {
    console.log('The order controller is called.');
    res.end('This is the order page');
    console.log('The order controller is finished.');
    next();
}

export default handler;