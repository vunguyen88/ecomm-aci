import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties required to create a new User
interface UserAttrs {
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    verifiedNumber: boolean;
    authHistory: {authType: string, authTime: string, isVerified: boolean, authNumber: number}[];
}

// An interface that describes the properties a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the property that User Document has
interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    verifiedNumber: boolean;
    authHistory: {authType: string, authTime: string, isVerified: boolean, authNumber: number}[];
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    verifiedNumber: {
        type: Boolean,
        require: true
    },
    authHistory: [{
        authType: {
            type: String,
            require: true
        },
        authTime: {
            type: String,
            require: true
        },
        isVerified: {
            type: Boolean,
            require: true
        },
        authNumber: {
            type: Number,
            require: true
        }
    }]
    
}, {
    // Transform the return for id instead of _id and take out password and __v.
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
})

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User }