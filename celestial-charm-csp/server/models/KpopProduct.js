const mongoose = require('mongoose');
const secondaryConnection = require('../config/secondDb');

const kpopProductSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = secondaryConnection.model('KpopProduct', kpopProductSchema, 'kpop');
