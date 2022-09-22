import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest, BadRequestError } from '@vuelaine-ecommerce/common';


const router = express.Router();

router.post('/api/users/auth-verify', async (req: Request, res: Response) => {

    const { email, authNumber } = req.body;
    const existingUser = await User.findOne({ email });

    // find user from email from db
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }
    
    // get the most recent auth from auth history
    let recentAuth = existingUser.authHistory[existingUser.authHistory.length - 1];
    
    // check if auth time is expired (> 5 minutes)
    if (moment(recentAuth.authTime).diff(moment(), 'minutes') < -5) {
        throw new BadRequestError('Your verification code expired!')
    }

    // check if auth number is match
    if (parseInt(authNumber) !== recentAuth.authNumber) {
        throw new BadRequestError('Your number is incorrect!')
    }

    // update user recent auth status in auth history
    recentAuth.isVerified = true;

    existingUser.authHistory.pop();
    existingUser.authHistory.push(recentAuth);

    existingUser.set({
        authHistory: existingUser.authHistory
    })

    await existingUser.save();

    // create jwt token
    const userJwt = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
            phoneNumber: existingUser.phoneNumber,
            verifiedNumber: true
        }, 
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    };

    res.status(200).send(existingUser);

});

export { router as authVerifyRouter };