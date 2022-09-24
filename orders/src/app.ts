import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';
import { createProductRouter } from './routes/newProduct';
import { updateProductRouter } from './routes/updateProduct';
import { deleteProductRouter } from './routes/deleteProduct';
// import { errorHandler } from '../../common/src/middlewares/error-handler';
// import { NotFoundError } from '../../common/src/errors/not-found-error';
import { errorHandler, NotFoundError, currentUser } from '@vuelaine-ecommerce/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        //secure: true
        //secure: process.env.NODE_ENV !== 'test'
        secure: false,
    })
);
app.use(currentUser);

app.use(deleteOrderRouter);
app.use(newOrderRouter);
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(createProductRouter);
app.use(updateProductRouter);
app.use(deleteProductRouter);
app.all('*', async (req, res, next) => {
    next(new NotFoundError());
});

app.use(errorHandler);

export { app };