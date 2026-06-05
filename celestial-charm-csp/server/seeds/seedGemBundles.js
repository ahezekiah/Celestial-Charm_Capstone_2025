import "dotenv/config.js";
import pkg from 'mongoose';
const { disconnect, connect } = pkg;
import GemBundle from "../models/GemBundle.js";

const URI = process.env.MONGODB_URI || 'mongodb+srv://ahezekiah:RedLights@celestial-charm.jmhlund.mongodb.net/';

if (!URI) {
    console.error(
        'MongoDB connection failed: MONGODB_URI is missing.'
    );
    process.exit(1);
}

const BUNDLES = [
    { id:'boost-10',   title:'Spark Pack',    emoji:'✨', costGems:10,   giveGems:11,   blurb:'+1 bonus',   sortOrder: 10 },
    { id:'boost-20',   title:'Glow Pack',     emoji:'🌟', costGems:20,   giveGems:22,   blurb:'+2 bonus',   sortOrder: 20 },
    { id:'boost-50',   title:'Nova Pack',     emoji:'🌠', costGems:50,   giveGems:60,   blurb:'+10 bonus',  sortOrder: 50 },
    { id:'boost-100',  title:'Galaxy Pack',   emoji:'🌌', costGems:100,  giveGems:125,  blurb:'+25 bonus',  sortOrder: 100 },

    { id:'boost-150',  title:'Cosmos Pack',   emoji:'🪐', costGems:150,  giveGems:190,  blurb:'+40 bonus',  sortOrder: 150 },
    { id:'boost-200',  title:'Nebula Pack',   emoji:'☄️', costGems:200,  giveGems:260,  blurb:'+60 bonus',  sortOrder: 200 },
    { id:'boost-300',  title:'Starlight Pack',emoji:'🌃', costGems:300,  giveGems:400,  blurb:'+100 bonus', sortOrder: 300 },
    { id:'boost-400',  title:'Comet Pack',    emoji:'🌠', costGems:400,  giveGems:540,  blurb:'+140 bonus', sortOrder: 400 },

    { id:'boost-500',  title:'Supernova Pack',emoji:'💥', costGems:500,  giveGems:700,  blurb:'+200 bonus', sortOrder: 500 },
    { id:'boost-600',  title:'Eclipse Pack',  emoji:'🌑', costGems:600,  giveGems:850,  blurb:'+250 bonus', sortOrder: 600 },
    { id:'boost-750',  title:'Aurora Pack',   emoji:'🌈', costGems:750,  giveGems:1100, blurb:'+350 bonus', sortOrder: 750 },
    { id:'boost-900',  title:'Idol Pack',     emoji:'🎤', costGems:900,  giveGems:1350, blurb:'+450 bonus', sortOrder: 900 },

    { id:'boost-1000', title:'Celestial Pack',emoji:'🌙', costGems:1000, giveGems:1600, blurb:'+600 bonus', sortOrder: 1000 },
    { id:'boost-1250', title:'Dreamer Pack',  emoji:'💭', costGems:1250, giveGems:2100, blurb:'+850 bonus', sortOrder: 1250 },
    { id:'boost-1500', title:'Legend Pack',   emoji:'👑', costGems:1500, giveGems:2700, blurb:'+1200 bonus',sortOrder: 1500 },
    { id:'boost-2000', title:'Eternal Pack',  emoji:'♾️', costGems:2000, giveGems:3800, blurb:'+1800 bonus',sortOrder: 2000 },
];

await connect(URI, { dbName: 'bundles' }, {
}).then(async () => {
    for (const b of BUNDLES) {
        await GemBundle.updateOne({ id: b.id }, b, { upsert: true });
    }
    console.log(`Seeded ${BUNDLES.length} gem bundles.`);
    await disconnect();
}).catch(e => { console.error(e); process.exit(1);  });

