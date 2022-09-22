import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import axios from 'axios';

import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
// import { validateRequest } from '../../../common/src/middlewares/validate-request';
// import { BadRequestError } from '../../../common/src/errors/bad-request-error';
import { validateRequest, BadRequestError } from '@vuelaine-ecommerce/common';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordMatch = await Password.compare(existingUser.password, password);

        if (!passwordMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        // generate 6 digits random number for auth
        let random = Math.floor(100000 + Math.random() * 900000);

        // create auth code and time stamp for verification purpose
        let newAuth = {
            authType: "signin",
            authTime: new Date().toISOString(),
            isVerified: false,
            authNumber: random
        };
        existingUser.authHistory.push(newAuth)

        // add new auth into auth history
        existingUser.set({
            authHistory: existingUser.authHistory
        })
        
        await existingUser.save();

        // calling sms service to send verification code
        axios.post(`${process.env.SMS_SERVICE_URL}/sms`, 
            {
                appId: process.env.APP_ID,
                appName: process.env.APP_NAME,
                storeId: "sfb465as8ccb54se",
                storeName: "Diamond Nails",
                toNumber: existingUser.phoneNumber,
                fromNumber: '4074935333',
                smsBody: `Please use verification code ${random} to E-commerce authentication`,
                senderName: "Vu Nguyen"
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        // Generate JwT
        // const userJwt = jwt.sign(
        //     {
        //         id: existingUser.id,
        //         email: existingUser.email,
        //         role: existingUser.role,
        //     }, 
        //     process.env.JWT_KEY!
        // );

        // // Store it on session object
        // req.session = {
        //     jwt: userJwt
        // };

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter }; 