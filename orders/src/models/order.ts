import mongoose from 'mongoose';
// import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@vuelaine-ecommerce/common';
import { ProductDoc } from './product';

export { OrderStatus };

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    products: ProductDoc[];
    shipTo: string;
    email: string;
    quantity: {productId: string, amount: number}[];
    total: number;
    createdOn: string;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    products: ProductDoc[];
    version: number;
    shipTo: string;
    email: string;
    quantity: {productId: string, amount: number}[];
    total: number;
    createdOn: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date,
        //required: true
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product'
    },
    shipTo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    createdOn: {
        type: String,
        required: true
    },
    quantity: [{
        productId: String,
        amount: Number,
        //required: true
    }]
}, {
    toJSON: { 
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
        }
    }
});

orderSchema.set('versionKey', 'version');
// orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export { Order }