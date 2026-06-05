
import pkg from 'mongoose';
const { disconnect, connect } = pkg;
import KpopProduct from '../models/KpopProduct.js';
import AnimeProduct from '../models/AnimeProduct.js';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toGems = (s) => Math.max(1, Math.round((Number(String(s).replace(/[^0-9.]/g,''))||0) * 10));
dotenv.config({ path: path.join(__dirname, '..', '.env') }); // loads server/.env

// Build the URI from common env names
const URI = process.env.MONGODB_URI || 'mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/';

if (!URI) {
    console.error(
        'MongoDB connection failed: MONGODB_URI is missing.'
    );
    process.exit(1);
}

// priceGems: 450,  // 👈 new
const kpopItems = [
    {
        type: 'fragrance',
        name: 'BTS Jungkook W Dressroom',
        price: '$14.30',
        desc: 'A fresh, clean, and long-lasting scent inspired by the BTS member.',
        url: 'https://oppastore.com/products/w-dressroom-perfume-150ml-bts-jungkooks-pick',
        image: 'https://oppastore.com/cdn/shop/files/6095fd53c4172fe44d9d07b58a5c0e8bfedda27d_original_720x.jpg?v=1736795427'
    },
    {
        type: 'fashion',
        name: 'Blackpink Lisa Flower Embroidered Blouse',
        price: '$23.90',
        desc: 'A delicate blouse inspired by Lisa\'s floral style.',
        url: 'https://www.fashionchingu.com/p/black-flower-embroidered-blouse-lisa-blackpink/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2023/05/Lisa-BlackPink-Black-Flower-Embroidered-Blouse-3.jpg'
    },
    {
        type: 'fashion',
        name: 'Chung Ha Fishbone Girdle',
        price: '$30.40',
        desc: 'A stylish girdle reminiscent of Chung Ha\'s fashion.',
        url: 'https://www.fashionchingu.com/p/black-fishbone-girdle-chung-ha/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2022/02/Black-Fishbone-Girdle-Chung-Ha-8.jpg'
    },
    {
        type: 'fashion',
        name: 'Ni-Ki Enhypen Open-Front Knit Cardigan',
        price: '$52.90',
        desc: 'A cozy knit cardigan popular among K-pop idols.',
        url: 'https://www.fashionchingu.com/p/black-open-front-knit-cardigan-ni-ki-enhypen/?attribute_pa_color=black&attribute_pa_size=one-size',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2024/10/Black-Open-Front-Knit-Cardigan-Ni-Ki-Enhypen_12.jpg'
    },
    {
        type: 'fashion',
        name: 'Blackpink Rose Sequins Bustier Top and Mini Skirt Set',
        price: '$42.90',
        desc: 'A glamorous outfit inspired by Blackpin\'s Rose.',
        url: 'https://www.fashionchingu.com/p/black-sequins-bustier-top-and-mini-skirt-set-rose-blackpink/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2023/03/Rose-BlackPink-Black-Sequins-Bustier-Top-And-Mini-Skirt-Set-2.jpg'
    },
    {
        type: 'fashion',
        name: 'Blackpink Rose Woolen Long Coat',
        price: '$79.90',
        desc: 'A chic woolen coat as seen on Blackpink\'s Rose.',
        url: 'https://www.fashionchingu.com/p/brown-long-woolen-coat-rose-blackpink/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2022/09/Rose-BlackPink-Brown-Long-Woolen-Coat-1.jpg'
    },
    {
        type: 'fashion',
        name: 'Blackpink Jennie Bra Crop Top with Arm Warmer Sleeves',
        price: '$29.90',
        desc: 'A trendy crop top inspired by Blackpink\'s Jennie.',
        url: 'https://www.fashionchingu.com/p/bra-top-with-arm-warmer-sleeves-jennie-blackpink/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2021/01/Jennie-BlackPink-Bra-Top-With-Arm-Warmer-Sleeves-39-e1664440999906.jpg'
    },
    {
        type: 'fashion',
        name: 'Fashion Chingu Kpop Hyuna Crop Top',
        price: '$19.90',
        desc: 'A stylish crop top reminiscent of Hyuna\'s fashion.',
        url: 'https://www.fashionchingu.com/p/crop-top-hyuna/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2019/07/Hyuna-Crop-Top-3-e1643772206189.jpg'
    },
    {
        type: 'fashion',
        name: 'Blackpink Jennie Cherry Dress',
        price: '$29.90',
        desc: 'A cute cherry dress inspired by Blackpink\'s Jennie.',
        url: 'https://www.fashionchingu.com/p/beige-cherry-dress-jennie-blackpink/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2019/04/blackpink-jennie-beige-cherry-dress5.jpg'
    },
    {
        type: 'fashion',
        name: 'Blackpink Jennie Half-Buttoned Collared Bodysuit',
        price: '$39.90',
        desc: 'A sleek bodysuit as seen on Blackpink\'s Jennie.',
        url: 'https://www.fashionchingu.com/p/black-half-buttoned-collared-bodysuit-jennie-blackpink/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2024/10/Black-Half-Buttoned-Collared-Bodysuit-Jennie-BlackPink_head-3-scaled.jpg'
    },
    {
        type: 'fashion',
        name: 'Jeongin (I.N.) Stray Kids Straight Cut Washed Jeans',
        price: '$35.90',
        desc: 'Stylish jeans inspired by Stray Kids\' Jeongin.',
        url: 'https://www.fashionchingu.com/p/black-and-pink-straight-cut-washed-jeans-jeongin-stray-kids/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2025/01/Black-And-Pink-Straight-Cut-Washed-Jeans-Jeongin-Stray-Kids_head-1.jpg'
    },
    {
        type: 'fashion',
        name: 'Hyunjin Stray Kids Hotter Than Your Ex T-Shirt',
        price: '$23.90',
        desc: 'A bold t-shirt popular among K-pop fans.',
        url: 'https://www.fashionchingu.com/p/black-hotter-than-your-ex-t-shirt-hyunjin-stray-kids/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2022/08/O1CN0169A4Qb1kIKQRVCyLQ_1623274660.jpg'
    },
    {
        type: 'jewelry',
        name: 'Stray Kids Lee Know Silver Safety Pin and Cross Chain Earring',
        price: '$12.90',
        desc: 'Inspired by LeeKnow from Stray Kids, this earring features a unique safety pin and cross chain design.',
        url: 'https://www.fashionchingu.com/p/silver-safety-pin-and-cross-chain-earring-leeknow-stray-kids/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2024/07/Silver-Safety-Pin-And-Cross-Chain-Earring-LeeKnow-Stray-Kids_5.jpg'
    },
    {
        type: 'jewelry',
        name: 'BTS Suga\'s Silver Crescent & Spike Hoop Earrings',
        price: '$12.90',
        desc: 'Emulate Suga\'s edgy style with these silver crescent and spike hoop earrings.',
        url: 'https://www.fashionchingu.com/p/silver-crescent-spike-hoop-earrings-suga-bts/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2025/04/Silver-Crescent-Spike-Hoop-Earrings-Suga-BTS_head-3.jpg'
    },
    {
        type: 'jewelry',
        name: 'Hyoyeon Girls Generation White Multi-Layered Pearl Planet Necklace',
        price: '$37.70',
        desc: 'Inspired by Hyoyeon from Girls Generation, this necklace features multi-layered pearls with a planet charm.',
        url: 'https://www.fashionchingu.com/p/multi-layered-pearl-planet-necklace-hyoyeon-girls-generation/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2021/06/Multi-Layered-Pearl-Planet-Necklace-Hyoyeon-Girls-Generation-8.jpg'
    },
    {
        type: 'jewelry',
        name: 'Irene Red Velvet Silver Butterfly Rhinestone Choker',
        price: '$14.90',
        desc: 'Channel Irene\'s elegance with this silver butterfly rhinestone choker.',
        url: 'https://www.fashionchingu.com/p/butterfly-rhinestone-choker-irene-red-velvet/',
        image: 'https://www.fashionchingu.com/wp-content/uploads/2021/09/Irene-Red-Velvet-Butterfly-Rhinestone-Choker-9-e1646834735838.jpg'
    }
];

const animeItems = [
    {
        type: 'fashion',
        name: 'Satoru Gojo\'s Sweatshirt',
        price: '$34.00',
        desc: 'Dark and subtle Gojo sweatshirt.',
        url: 'https://www.amazon.com/Costume-Cosplay-Sweatshirt-Sweater-Pullover/dp/B0F62WVQ3Q/ref=sr_1_1?dib=eyJ2IjoiMSJ9.vA-tFmjZZhoehgI9QpXCrCXCjvGibGtfv9IQYG_oElDBXRpMyH0ThiBzIghlQ732lmaMRdCVS8F3zaZw92c6XFvROEzjZ3bLDpha2fAYkxVFStJZRiXcbHoLM_C8jcbm_ctmBDNP89sJ7JHPtiH59OjAE8hq-MnYIrkA2_m7NaYnIIOjn906rr3oy5Z1gO8i8qDA2MmBaZkBVu4aR5Ei9eSUWzFQWdiZxSpH9AEokg3eNXWB4UeB5RcKEhGMomdG37jI5kXTMR9rccx7Rh-C-9zsRSu1sz6AJSYHmJub3JU.rVC-eAFFXYd45KHMYUtWQTcCsR8dkHtGxw98qOPnqUU&dib_tag=se&keywords=gojo%2Bhoodie%2Bjujutsu%2Bkaisen&qid=1780695352&sr=8-1&th=1&psc=1',
        image: 'https://m.media-amazon.com/images/I/612YFbv8j8L._AC_SX679_.jpg'
    },
    {
        type: 'fragrance',
        name: 'Zenitsu Fragrance',
        price: '$16.00',
        desc: 'Lightning-bright scent from Demon Slayer.',
        url: 'https://scentsuki.com/products/zenitsu-agatsuma-anime-inspired-fragrances?variant=40588726337671&_gsid=7kG7CQqjLMG9',
        image: 'https://scentsuki.com/cdn/shop/files/demon-collection-anime-inspired-fragrances-zenit-535_1024x1024.png?v=1756327701'
    },
    {
        type: 'jewelry',
        name: 'Reaper Ring',
        price: '$115.00',
        desc: 'Bold anime-styled accessory with edge.',
        url: 'https://kaiworksnyc.com/products/reaper-ring-anime-inspired?variant=47190628466998&_gsid=we8c18pcbMHF',
        image: 'https://kaiworksnyc.com/cdn/shop/files/kiddeathring2a.png?v=1715360654&width=990'
    }
];

const normalize = (items) => {
    return items.map(item => ({
        name: item.name,
        type: item.type.toLowerCase(), // normalize
        price: item.price,
        priceGems: toGems(item.price),
        desc: item.desc,
        url: item.url,
        image: item.image.toLowerCase().includes('cdn') ? item.image : item.image.replace(/https?:\/\//, 'https://') // ensure https
        .replace(/www\./, '') // remove www if present
    }));
};


// connect('mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/product-items?retryWrites=true&w=majority', {
await connect(URI, { dbName: 'product-items' }, {
}).then(async () => {
    await KpopProduct.deleteMany({});
    const kItems = [...normalize(kpopItems, 'kpop')];
    await KpopProduct.insertMany(kItems);

    await AnimeProduct.deleteMany({});
    const aItems = [...normalize(animeItems, 'anime')];
    await AnimeProduct.insertMany(aItems);

    console.log('🌸 Seeded Kpop and Anime products into separate collections!');
    disconnect();
}).catch(err => {
    console.error('MongoDB connection failed:', err);
});

