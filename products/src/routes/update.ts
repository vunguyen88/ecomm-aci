// import express, { Request, Response } from 'express';
// import { body } from 'express-validator';
// import {
//     validateRequest,
//     NotFoundError,
//     requireAuth,
//     NotAuthorizedError,
//     currentUser,
//     BadRequestError,
// } from '@vuelaine-ecommerce/common';
// import { Product } from '../models/product';
// import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';
// import { natsWrapper } from '../nats-wrapper';

// const router = express.Router();

// router.put(
//     '/api/products/:id', 
//     currentUser,
//     requireAuth, 
//     [
//         body('name').not().isEmpty().withMessage('Name is required'),
//         body('price').isFloat({ gt: 0 }).withMessage('Price must be provided and must be greater than 0'),
//         body('details').not().isEmpty().withMessage('Details is required'),
//         body('category').not().isEmpty().withMessage('Category is required'),
//     ],
//     validateRequest, 
//     async (req: Request, res: Response) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         throw new NotFoundError();
//     }
   
//     if (product.orderId) {
//         throw new BadRequestError('Product is reserved');
//     }

//     // Check if user role is admin to update product
//     if (req.currentUser!.role !== 'admin') {
//         throw new NotAuthorizedError();
//     }

//     product.set({
//         name: req.body.name,
//         price: req.body.price,
//         details: req.body.details,
//         size: req.body.size,
//         reviews: req.body.reviews,
//         color: req.body.color,
//         type: req.body.type,
//         category: req.body.category,
//         productUrl: req.body.productUrl,
//     });

//     await product.save();
//     await new ProductUpdatedPublisher(natsWrapper.client).publish({
//         id: product.id,
//         userId: req.currentUser!.id,
//         name: product.name,
//         price: product.price,
//         details: product.details,
//         size: product.size,
//         reviews: product.reviews,
//         color: product.color,
//         type: product.type,
//         category: product.category,
//         productUrl: product.productUrl,
//         version: product.version,
//     })
//     res.send(product);
// });

// export { router as updateProductRouter };