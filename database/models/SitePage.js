const mongoose = require('mongoose');

const sitePageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        heroTitle: {
            type: String,
            required: true,
            trim: true
        },
        summary: {
            type: String,
            trim: true,
            default: ''
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        showInNavbar: {
            type: Boolean,
            default: false
        },
        isSystem: {
            type: Boolean,
            default: false
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

module.exports = mongoose.model('SitePage', sitePageSchema);
