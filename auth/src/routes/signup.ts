import express, { Request, Response } from 'express';
import axios from 'axios';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
//import { validateRequest } from '../../../common/src/middlewares/validate-request';
//import { BadRequestError } from '../../../common/src/errors/bad-request-error';
import { validateRequest, BadRequestError } from '@vuelaine-ecommerce/common';

const router = express.Router();   

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters'),
        body('phoneNumber')
            .trim()
            .notEmpty()
            .withMessage('Phone number must be valid'),
        body('role')
            .trim()
            .isLength({ min: 4, max: 20 })
            .notEmpty()
            .withMessage('Role is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
     
        const { email, password, role, phoneNumber, verifiedNumber } = req.body;
 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }
        
        // generate 6 digits random number for auth
        let random = Math.floor(100000 + Math.random() * 900000);

        // create auth code and time stamp for verification purpose
        let authHistory = [{
            authType: "signup",
            authTime: new Date().toISOString(),
            isVerified: false,
            authNumber: random
        }];
    
        // add new user into db
        const user = User.build({ email, password, role, phoneNumber, verifiedNumber, authHistory });
        await user.save();

        // calling sms service to send verification code
        axios.post(`${process.env.SMS_SERVICE_URL}/sms`, 
            {
                appId: process.env.APP_ID,
                appName: process.env.APP_NAME,
                storeId: "sfb465as8ccb54se",
                storeName: "Diamond Nails",
                toNumber: phoneNumber,
                fromNumber: '4074935333',
                smsBody: `Please use verification code ${random} to complete E-commerce registration`,
                senderName: "Vu Nguyen"
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

        // Generate JwT
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                verifiedNumber: user.verifiedNumber,
                completeAuth: false
            }, 
            process.env.JWT_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
});

export { router as signupRouter };