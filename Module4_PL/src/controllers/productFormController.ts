import { Request, Response } from 'express';

import { createProduct } from '../models/product';

const handler = (req: Request, res: Response) => {
    const { title, weight, price, amount, providers } = req.body;
    try {
        createProduct(title, weight, price, amount, JSON.parse(providers));
        res.end(`The product ${title} has been created.`);
    } catch (err) {
        console.error(err);
        res.end(`The product ${title} was not created due to invalid inputs.`);
    }
}

export default handler;