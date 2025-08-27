// K-pop + Anime inspired MBTI personality mapping
const MBTI = {
    INFJ: { 
        name: "K-Drama Dreamer", 
        emoji: "🌙", 
        blurb: "The soft-spoken visionary. You feel every plot twist like it's written just for you." 
    },
    INFP: { 
        name: "Ballad Soul", 
        emoji: "🎶", 
        blurb: "Tender-hearted and poetic — your world is a fanfic soundtrack waiting to happen." 
    },
    INTJ: { 
        name: "Anime Strategist", 
        emoji: "🔮", 
        blurb: "The mastermind behind the arc. You see the ending long before episode one drops." 
    },
    INTP: { 
        name: "Lore Coder", 
        emoji: "📜", 
        blurb: "Forever theory-crafting comebacks and anime arcs. Nothing escapes your breakdown threads." 
    },
    ISFJ: { 
        name: "Lightstick Guardian", 
        emoji: "🛡️", 
        blurb: "Reliable and caring — you're the fandom mom making sure everyone's safe at the concert." 
    },
    ISFP: { 
        name: "Cosmic Aesthetician", 
        emoji: "🎨", 
        blurb: "Dreamy and creative — your edits, fancams, and outfits are pure main-character energy." 
    },
    ISTJ: { 
        name: "Stage Manager", 
        emoji: "🎭", 
        blurb: "You keep the tour, anime season, and fandom spreadsheets perfectly on track." 
    },
    ISTP: { 
        name: "Dungeon Raider", 
        emoji: "🎮", 
        blurb: "Cool and tactical — like the anime fighter who never sweats even mid-battle." 
    },
    ENFJ: { 
        name: "Fandom Leader", 
        emoji: "🌟", 
        blurb: "Charismatic and glowing — you rally fans like a K-pop MC hyping the encore." 
    },
    ENFP: { 
        name: "K-Pop Firecracker", 
        emoji: "⚡", 
        blurb: "Pure energy — you start dance trends, fancam storms, and chaotic fun everywhere you go." 
    },
    ENTJ: { 
        name: "Comeback Commander", 
        emoji: "🎯", 
        blurb: "Bold and decisive — you'd choreograph an anime finale or lead a K-pop concept drop." 
    },
    ENTP: { 
        name: "Fandom Disruptor", 
        emoji: "🚀", 
        blurb: "Hot-take king/queen — challenging norms, reinventing lore, and sparking spicy debates." 
    },
    ESFJ: { 
        name: "Drama Healer", 
        emoji: "🌸", 
        blurb: "Warm and empathetic — like the K-Drama character who holds the group together." 
    },
    ESFP: { 
        name: "Encore Star", 
        emoji: "🎤", 
        blurb: "You *ARE* the party. Every moment feels like the encore stage of a sold-out concert." 
    },
    ESTJ: { 
        name: "Comeback Director", 
        emoji: "📣", 
        blurb: "Organized and commanding — the one who ensures every drop, teaser, and trailer lands flawlessly." 
    },
    ESTP: {
        name: "K-pop Demon Hunter",
        emoji: "🔥",
        blurb: "Fearless and fierce — you dive into chaos head-first like the main dancer on a hard-hitting comeback stage."
    },
};

// Aliases for quizzes that return words instead of MBTI codes
const ALIASES = {
    advocate: "INFJ",
    mediator: "INFP",
    architect: "INTJ",
    logician: "INTP",
    defender: "ISFJ",
    adventurer: "ISFP",
    logistician: "ISTJ",
    virtuoso: "ISTP",
    protagonist: "ENFJ",
    campaigner: "ENFP",
    commander: "ENTJ",
    debater: "ENTP",
    consul: "ESFJ",
    entertainer: "ESFP",
    executive: "ESTJ",
    entrepreneur: "ESTP",
};

export function getPersonalityMeta(input) {
    if (!input) return null;
    const raw = String(input).trim();

    // Try MBTI code
    const mbti = raw.replace(/[^A-Za-z]/g, "").toUpperCase();
    if (MBTI[mbti]) return { code: mbti, ...MBTI[mbti] };

    // Try alias word
    const key = raw.toLowerCase().replace(/[^a-z]/g, "");
    const aliasMbti = ALIASES[key];
    if (aliasMbti && MBTI[aliasMbti]) return { code: aliasMbti, ...MBTI[aliasMbti] };

    // fallback
    return { code: raw, name: "Celestial Soul", emoji: "🧭", blurb: "Your vibe is too unique for labels — a new archetype waiting to debut." };
}
