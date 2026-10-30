const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true 
    },
    items: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true, 
                min: 1, 
                default: 1 
            },
            price: { 
                type: Number, 
                required: true 
            },
            farmerId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User', 
                required: true 
            } 
        }
    ]
}, { timestamps: true });

module.exports = cartSchema;