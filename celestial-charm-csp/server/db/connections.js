// ESM
import mongoose from 'mongoose';

const { MONGO_URI } = process.env;
// IMPORTANT: MONGO_URI must be the cluster URI with NO db name suffix.
//   Example: mongodb+srv://user:pass@cluster0.xxxx.mongodb.net

// One lightweight connection per logical database.
// This prevents cross-contamination of collections across DBs.
export const authConn = mongoose.createConnection(MONGO_URI, { dbName: 'authentication' });
authConn.once('open', () => console.log('First Mongo connected'));
// export const quizConn = mongoose.createConnection(MONGO_URI, { dbName: 'celestial-charm-quizzes' });
// quizConn.once('open', () => console.log('Second Mongo connected'));
export const productItemsConn = mongoose.createConnection(MONGO_URI, { dbName: 'product-items' });
productItemsConn.once('open', () => console.log('Second Mongo connected'));
export const productsConn = mongoose.createConnection(MONGO_URI, { dbName: 'products' });
productsConn.once('open', () => console.log('Third Mongo connected'));


// Optional: visibility in logs (kept tiny)
for (const c of [authConn,  /* quizConn, */ productItemsConn, productsConn]) {
    c.on('connected', () => console.log(`[mongo] connected -> ${c.name}`));
    c.on('error', (e) => console.error(`[mongo] error -> ${c.name}`, e));
}
