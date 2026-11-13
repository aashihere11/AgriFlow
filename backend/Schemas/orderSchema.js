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

                farmer: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                unit: { type: String, required: true },
                image: { type: String, required: true },


                status: {
                    type: String,
                    required: true,
                    default: 'Pending',
                    enum: ['Pending', 'Packed', 'On The Way', 'Delivered']
                }
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


        overallStatus: {
            type: String,
            required: true,
            default: 'Placed',
            enum: ['Placed', 'Packed', 'Processing', 'On The Way', 'Delivered']
        },


        isPartialDelivery: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = orderSchema;