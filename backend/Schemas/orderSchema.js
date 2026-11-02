const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                unit: { type: String, require: true },
                image: { type: String, required: true },
            },
        ],

        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            pinCode: { type: String, required: true },
            state: { type: String, required: true },
        },
        slot: {
            type: String,
            required: true,
        },

        paymentInfo: {
            razorpay_order_id: { type: String },
            razorpay_payment_id: { type: String },
            razorpay_signature: { type: String },
        },


        totalAmount: {
            type: Number,
            required: true,
        },

        paymentStatus: {
            type: String,
            required: true,
            default: 'Pending',
        },

        orderStatus: {
            type: String,
            required: true,
            default: 'Placed',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = orderSchema;