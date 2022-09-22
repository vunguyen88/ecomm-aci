import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

// import { createProductRouter } from './routes/new';
// import { showProductRouter } from './routes/show';
// import { indexProductRouter } from './routes/index';
// import { updateProductRouter } from './routes/update';
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

// app.use(createProductRouter);
// app.use(showProductRouter);
// app.use(indexProductRouter);
// app.use(updateProductRouter);
app.all('*', async (req, res, next) => {
    next(new NotFoundError());
});

app.use(errorHandler);

export { app };