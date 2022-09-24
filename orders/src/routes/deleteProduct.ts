import express, { Request, Response}  from 'express';
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
// import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher';
// import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
    '/api/orders/products/:id', 
    currentUser,
    requireAuth, 
    async (req: Request, res: Response) => {

    // if (product.orderId) {
    //     throw new BadRequestError('Product is reserved');
    // }

    // Check if user role is admin to update product
    if (req.currentUser!.role !== 'admin') {
        throw new NotAuthorizedError();
    }
    const deleteRes = await Product.findByIdAndDelete(req.params.id);
    console.log('deleteRes ', deleteRes)

    // Product.deleteOne({ id: req.params.id });
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
    res.send({ message: 'success delete in order service'});
});

export { router as deleteProductRouter };