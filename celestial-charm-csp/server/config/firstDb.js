import { createConnection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const firstConnection = createConnection('mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/authentication?retryWrites=true&w=majority', {

});

export default firstConnection;