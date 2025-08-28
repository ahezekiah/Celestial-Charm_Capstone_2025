import { createConnection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const secondaryConnection = createConnection('mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/product-items', {

});

// secondaryConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// secondaryConnection.once('open', () => {
//     console.log('Second MongoDB connection successful!');
// });
export default secondaryConnection;
