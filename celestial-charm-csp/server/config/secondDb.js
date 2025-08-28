import { createConnection } from 'mongoose';
require('dotenv').config();

const secondaryConnection = createConnection('mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/product-items', {

});

export default secondaryConnection;
