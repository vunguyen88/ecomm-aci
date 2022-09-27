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

router.put(
    '/api/products/:id', 
    currentUser,
    requireAuth, 
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be provided and must be greater than 0'),
        body('details').not().isEmpty().withMessage('Details is required'),
        body('category').not().isEmpty().withMessage('Category is required'),
    ],
    validateRequest, 
    async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new NotFoundError();
    }
   
    if (product.orderId) {
        throw new BadRequestError('Product is reserved');
    }

    if (!req.headers.cookie) {
        throw new NotAuthorizedError();
    }

    // Check if user role is admin to update product
    if (req.currentUser!.role !== 'admin') {
        throw new NotAuthorizedError();
    }

    product.set({
        name: req.body.name,
        price: req.body.price,
        details: req.body.details,
        size: req.body.size,
        reviews: req.body.reviews,
        color: req.body.color,
        type: req.body.type,
        category: req.body.category,
        productUrl: req.body.productUrl,
    });

    await product.save();
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
    // axios.put(`https://order-acd3hddtua-uc.a.run.app/api/orders/products/${req.params.id}`, product, {
    axios.put(`http://host.docker.internal:3002/api/orders/products/${req.params.id}`, product, {

            headers: {'cookie': req.headers.cookie}
        })
            .then(orderRes => {
                console.log('Success update product in order service');
                return res.status(201).send(product);
            })
            .catch(err => console.log('ERROR', err))
});

export { router as updateProductRouter };