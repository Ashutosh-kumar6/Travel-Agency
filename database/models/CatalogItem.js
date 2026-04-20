const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema(
    {
        section: {
            type: String,
            enum: ['food', 'service', 'rental'],
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            trim: true,
            default: ''
        },
        priceLabel: {
            type: String,
            trim: true,
            default: ''
        },
        isPublished: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('CatalogItem', catalogItemSchema);
