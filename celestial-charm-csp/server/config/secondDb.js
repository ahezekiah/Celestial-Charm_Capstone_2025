const mongoose = require('mongoose');
require('dotenv').config();

const secondaryConnection = mongoose.createConnection('mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/product-items', {

});

module.exports = secondaryConnection;
