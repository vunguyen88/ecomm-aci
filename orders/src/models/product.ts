import mongoose from 'mongoose';
//import { OrderStatus } from '@vuelaine-ecommerce/common';
import { Order, OrderStatus } from './order';

interface ProductAttrs {
    id: string;
    name: string;
    price: number;
    userId: string;
    details: string;
    size: string[];
    reviews: string[];
    color: string[];
    type: string;
    productUrl: string;
    category: string[];
    //count: number;
}

export interface ProductDoc extends mongoose.Document {
    id: string;
    name: string;
    price: number;
    userId: string;
    details: string;
    size: string[];
    reviews: string[];
    color: string[];
    type: string;
    productUrl: string;
    version: number;
    category: string[];
    //count: number;
    isReserved(): Promise<boolean>;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs:  ProductAttrs): ProductDoc;
    findByEvent(event: { id: string, version: number }): Promise<ProductDoc | null>;
}

const productSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true
    // },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    size: {
        type: [String],
        //required: true
    },
    reviews: {
        type: [String],
        //required: true
    },
    color: {
        type: [String],
        //required: true
    },
    type: {
        type: String,
        //required: true
    },
    category: {
        type: [String],
        required: true
    },
    productUrl: {
        type: String,
        required: true
    },
    // count: {
    //     type: Number,
    //     //require: true
    // }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

productSchema.set('versionKey', 'version');

productSchema.statics.findByEvent = (data:  { id: string, version: number }) => {
    return Product.findOne({
        _id: data.id,
        version: data.version - 1,
    })
}
productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product({
        _id: attrs.id,
        name: attrs.name,
        price: attrs.price,
        userId: attrs.userId,
        details: attrs.details,
        size: attrs.size,
        reviews: attrs.reviews,
        color: attrs.color,
        type: attrs.type,
        productUrl: attrs.productUrl,
        category: attrs.category,
        //count: attrs.count,
    });
};

productSchema.methods.isReserved = async function() {
    // this === the product document that we just called 'isReserved' on 
    const existingOrder = await Order.findOne({
        product: this.id,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });

    return !!existingOrder;
}

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product }