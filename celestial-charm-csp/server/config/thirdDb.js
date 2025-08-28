import { createConnection } from 'mongoose';
require('dotenv').config();

const thirdConnection = createConnection('mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/products', {

});

thirdConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
thirdConnection.once('open', () => {
    console.log('Third MongoDB connection successful!');
});

export default thirdConnection;

