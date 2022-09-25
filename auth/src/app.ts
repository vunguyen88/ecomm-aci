import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { authVerifyRouter } from './routes/auth-verify';
// import { errorHandler } from '../../common/src/middlewares/error-handler';
// import { NotFoundError } from '../../common/src/errors/not-found-error';
import { errorHandler, NotFoundError } from '@vuelaine-ecommerce/common';

const app = express();

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        //secure: true
        // secure: process.env.NODE_ENV !== 'test'
        secure: false,
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(authVerifyRouter);

app.all('*', async (req, res, next) => {
    next(new NotFoundError());
});

app.use(errorHandler);

export { app };