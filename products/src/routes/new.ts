import express, { Request, Response}  from 'express';
import { body } from 'express-validator';
import { currentUser, requireAuth, validateRequest, NotAuthorizedError } from '@vuelaine-ecommerce/common';
import { Product } from '../models/product';
// import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher';
// import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
    '/api/products', 
    currentUser,
    requireAuth, 
    [
        body('name').not().isEmpty().withMessage('Title is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
        body('details').not().isEmpty().withMessage('Details is required'),
        body('productUrl').not().isEmpty().withMessage('ProductUrl is required'),
        body('category').not().isEmpty().withMessage('Category is required'),

    ], 
    validateRequest,
    
    async (req: Request, res: Response) => {
        if (req.currentUser!.role !== 'admin') {
            throw new NotAuthorizedError();
        }

        const { name, price, size, details, reviews, color, type, productUrl, category } = req.body;

        const product = Product.build({
            name,
            price,
            userId: req.currentUser!.id,
            size,
            details,
            reviews,
            color,
            type,
            productUrl,
            category,
        });
        await product.save();
        // await new ProductCreatedPublisher(natsWrapper.client).publish({
        //     id: product.id,
        //     name: product.name,
        //     price: product.price,
        //     userId: req.currentUser!.id,
        //     size: product.size,
        //     details: product.details,
        //     reviews: product.reviews,
        //     type: product.type,
        //     color: product.color,
        //     productUrl: product.productUrl,
        //     version: product.version,
        //     category: product.category
        // });
        res.status(201).send(product);
    }
);

export{ router as createProductRouter }