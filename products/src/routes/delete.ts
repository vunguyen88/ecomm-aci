import express, { Request, Response } from 'express';
import axios from 'axios';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError,
    currentUser,
    BadRequestError,
} from '@vuelaine-ecommerce/common';
import { Product } from '../models/product';
// import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';
// import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
    '/api/products/:id', 
    currentUser,
    requireAuth, 
    async (req: Request, res: Response) => {

    if (!req.headers.cookie) {
        throw new NotAuthorizedError();
    }

    // Check if user role is admin to update product
    if (req.currentUser!.role !== 'admin') {
        throw new NotAuthorizedError();
    }

    const deleteRes = await Product.findByIdAndDelete(req.params.id);
    console.log('deleteRes ', deleteRes)
    // await product.save();
    // remove pub-sub due to new design solution
    // await new ProductUpdatedPublisher(natsWrapper.client).publish({
    //     id: product.id,
    //     userId: req.currentUser!.id,
    //     name: product.name,
    //     price: product.price,
    //     details: product.details,
    //     size: product.size,
    //     reviews: product.reviews,
    //     color: product.color,
    //     type: product.type,
    //     category: product.category,
    //     productUrl: product.productUrl,
    //     version: product.version,
    // })

    // axios call to update same product in order service
    axios.delete(`http://host.docker.internal:8002/api/orders/products/${req.params.id}`, {
            headers: {'cookie': req.headers.cookie}
        })
            .then(orderRes => {
                console.log('Success delete product in order service');
                return res.status(201).send('success delete product in both Product and Order service');
            })
            .catch(err => console.log('ERROR', err))
});

export { router as deleteProductRouter };
