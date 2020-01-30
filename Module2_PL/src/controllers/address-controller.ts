import { Request, Response } from 'express';

const handler = (req: Request, res: Response) => {
    res.render('address',{
        name:'Dustin',
        phoneNumber: '123-4567-8975',
        address: '123 Wall Street'
    });
}

export default handler;