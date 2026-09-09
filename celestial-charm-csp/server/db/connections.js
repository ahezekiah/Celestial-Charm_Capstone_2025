import pkg from 'mongoose';
const { createConnection, connection, } = pkg;
import 'dotenv/config';


const URI = process.env.MONGODB_URI;

if (!URI) {
    console.error('[mongo] Missing MONGODB_URI');
    process.exit(1);
}
export const authConn = connection?.client
    ? connection  
    : await createConnection(URI, { dbName: 'authentication' })
    .asPromise();
authConn.once('open', () => console.log('First Mongo connected'));


export const productItemsConn = connection?.client
    ? connection  
    : await createConnection(URI, { dbName: 'product-items' }).asPromise();
productItemsConn.once('open', () => console.log('Second Mongo connected'));


export const productsConn = connection?.client
    ? connection  
    : await createConnection(URI, { dbName: 'products' }).asPromise();
productsConn.once('open', () => console.log('Third Mongo connected'));

export const gemBundlesConn = connection?.client
    ? connection  
    : await createConnection(URI, { dbName: 'bundles' }).asPromise();
gemBundlesConn.once('open', () => console.log('Fourth Mongo connected'));

// Optional: visibility in logs (kept tiny)
for (const c of [authConn, productItemsConn, productsConn, gemBundlesConn]) {
    c.on('connected', () => console.log(`[mongo] connected -> ${c.name}`));
    c.on('error', (e) => console.error(`[mongo] error -> ${c.name}`, e));
}


