# Celestial Charm

Celestial Charm is a full-stack e-commerce and personalization platform inspired by **K-pop, anime, fashion, beauty, books, and fandom culture**.

The application combines a public storefront with authenticated user features including:

* Account registration and login
* Personalized dashboard
* K-pop products
* Anime products
* Fashion
* Fragrances
* Jewelry
* Book recommendations
* Knowledge quizzes
* Personality quizzes
* Virtual gems
* Shopping cart
* Wishlist
* Inventory
* Account management
* Quiz history
* Product purchasing
* Reviews infrastructure

The project uses a **React + Vite frontend**, an **Express REST API**, and multiple **MongoDB databases and collections**.

---

# Project Overview

Celestial Charm is designed as both a shopping platform and a personalized fandom experience.

The general user flow is:

```text
Visit Celestial Charm
        ↓
Browse Public Store
        ↓
Explore K-pop / Anime Products
        ↓
Register or Log In
        ↓
Access Personal Dashboard
        ↓
Take Quizzes
        ↓
Earn Gems
        ↓
Shop Personalized Collections
        ↓
Add Items to Cart / Wishlist
        ↓
Purchase Items With Gems
        ↓
View Purchased Inventory
```

---

# Technology Stack

## Frontend

```text
React 19
Vite 6
JavaScript
React Router DOM 7
CSS
Tailwind CSS
Bootstrap
Bootstrap Icons
Framer Motion
Axios
Vercel Analytics
```

## Backend

```text
Node.js
Express
JavaScript ES Modules
Mongoose
MongoDB
CORS
dotenv
Morgan
cookie-parser
```

## Authentication

```text
bcryptjs
JSON Web Tokens
HTTP-only Cookies
Protected Express Routes
```

## Database

```text
MongoDB
MongoDB Atlas
Mongoose
MongoDB Node Driver
```

## Deployment Configuration

The repository includes configuration targeting:

```text
Vercel
Render
```

---

# Application Architecture

```text
┌─────────────────────────────────────────┐
│          React + Vite Frontend          │
│                                         │
│ Public Store                            │
│ Authentication                          │
│ Dashboard                               │
│ Products                                │
│ Quizzes                                 │
│ Cart / Wishlist                         │
│ Inventory                               │
└───────────────────┬─────────────────────┘
                    │
                    │ /api/*
                    ▼
┌─────────────────────────────────────────┐
│             Express Backend             │
│                                         │
│ Authentication                          │
│ Users                                   │
│ Products                                │
│ Quizzes                                 │
│ Store                                   │
│ Reviews                                 │
└───────────────────┬─────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│                MongoDB                  │
│                                         │
│ authentication                          │
│ product-items                           │
│ products                                │
│ bundles                                 │
│ celestial-charm-quizzes                 │
└─────────────────────────────────────────┘
```

---

# Main Features

The current codebase includes:

* Public home page
* Public K-pop catalog
* Public anime catalog
* Public store
* Public reviews page
* User registration
* User login
* Password hashing
* JWT authentication
* Cookie-based sessions
* Protected routes
* Account management
* Password changing
* Account deletion
* Forgot username flow
* Forgot password flow
* User profile pictures
* User birthdays
* User phone numbers
* K-pop products
* Anime products
* Fashion products
* Fragrance products
* Jewelry products
* Paginated product APIs
* Product filtering
* Personalized dashboard
* Shopping cart
* Wishlist
* Cart checkout
* Purchased inventory
* Virtual gem balance
* Gem bundles
* Custom gem transactions
* Knowledge quizzes
* Personality quizzes
* Quiz result history
* Gems earned through knowledge quizzes
* Google Books recommendations
* Book links to Amazon
* Vercel web analytics
* Privacy policy
* Terms of service
* About page
* Contact page
* 404 page

---

# Project Structure

The main application is located inside:

```text
Celestial-Charm_Capstone_2025-main/
└── celestial-charm-csp/
```

The main structure is:

```text
celestial-charm-csp/
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── BooksCarousel/
│   │   │   ├── Cart/
│   │   │   ├── FAQ/
│   │   │   ├── Footer/
│   │   │   ├── NavBars/
│   │   │   └── Products/
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartWishlistContext.jsx
│   │   │   └── UserAnswersContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── About/
│   │   │   ├── Contact/
│   │   │   ├── Dashboard/
│   │   │   ├── Forgot/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── NotFound/
│   │   │   ├── Policies/
│   │   │   └── Register/
│   │   │
│   │   ├── utils/
│   │   │   ├── fetchWithRefresh.js
│   │   │   ├── personalityMeta.js
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vercel.json
│
├── server/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── productsController.js
│   │   └── storeController.js
│   │
│   ├── db/
│   │   └── connections.js
│   │
│   ├── middleware/
│   │   └── requireAuth.js
│   │
│   ├── models/
│   │   ├── AnimeProduct.js
│   │   ├── ContactMessage.js
│   │   ├── GemBundle.js
│   │   ├── KpopProduct.js
│   │   ├── Products.js
│   │   ├── Reviews.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── forgot-password.js
│   │   ├── forgot-username.js
│   │   ├── productItemsRoutes.js
│   │   ├── productsRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── storeRoutes.js
│   │   └── users.js
│   │
│   ├── seeds/
│   │   ├── seedGemBundles.js
│   │   ├── seedKnowledgeQuestions.js
│   │   ├── seedSplitProducts.js
│   │   └── unifiedSeed.js
│   │
│   ├── package.json
│   └── server.js
│
├── package.json
└── README.md
```

---

# Frontend Routes

The frontend uses:

```text
react-router-dom
```

with route definitions inside:

```text
client/src/App.jsx
```

---

# Public Routes

Current public routes include:

```text
/
├── /store
├── /kpop
├── /anime
├── /reviews
├── /register
├── /login
├── /forgot-username
├── /forgot-password
├── /policies
├── /privacy-policy
├── /terms-of-service
├── /about
└── /contact
```

---

# Protected Routes

Authenticated sections include:

```text
/account
/cart
/fashion
/fragrances
/jewelry
/dashboard
/shop
/kpop2
/anime2
/personalization
/quiz
/knowledge
/personality
/results
/wishlist
/books
/gem-shop
/inventory
/music
/blog
```

These routes are wrapped with:

```jsx
<ProtectedRoute>
    ...
</ProtectedRoute>
```

---

# Home Page

The public home page is implemented in:

```text
client/src/pages/Home/Home.jsx
```

The home page introduces:

```text
Celestial Charm
```

with the description:

```text
Browse for the perfect piece of jewelry,
a signature fragrance,
a stylish item of clothing,
or a book recommendation —
with K-pop and anime-inspired influences.
```

The page contains:

* Animated hero
* Main shopping CTA
* K-pop category
* Anime category
* FAQ
* Registration CTA
* Login CTA
* Footer

Framer Motion is used for hero animation.

---

# Public Store

The application contains public shopping pages for:

```text
K-pop
Anime
General Store
```

The public product APIs are:

```http
GET /api/kpop
GET /api/anime
```

The authenticated versions use:

```http
GET /api/kpop2
GET /api/anime2
```

---

# Authenticated Dashboard

The main authenticated dashboard is:

```text
/dashboard
```

The dashboard links users to:

```text
K-pop
Anime
Fashion
Fragrances
Books
Music
Knowledge Quiz
Personality Quiz
```

---

# Authentication

Authentication is handled by:

```text
server/controllers/authController.js
```

and:

```text
server/routes/auth.js
```

The main authentication API is:

```text
/api/auth
```

---

# Authentication Routes

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

---

# Registration

Registration collects:

```text
Name
Username
Email
Password
Phone Number
Birthday
Profile Picture
```

The frontend requires passwords to contain at least:

```text
8 characters
```

The profile picture may be converted into a:

```text
Base64 data URL
```

before being saved.

---

# Password Hashing

The backend hashes passwords using:

```js
bcrypt.hash(password, 10)
```

Passwords are stored in the MongoDB user document with:

```js
select: false
```

to avoid returning them in ordinary user queries.

---

# User Login

Users can log in using either:

```text
Email
or
Username
```

The backend performs:

```text
Find user
    ↓
Compare bcrypt password
    ↓
Create JWT
    ↓
Send JWT as cookie
```

---

# JWT Sessions

The session token contains the user's ID:

```js
{
    sub: userId
}
```

and expires after:

```text
7 days
```

---

# Session Cookie

The backend creates an:

```text
HTTP-only
Secure
SameSite=None
```

cookie.

The default cookie name is:

```text
cc_session
```

This cookie is used by protected endpoints.

---

# Authentication Middleware

Protected endpoints use:

```text
server/middleware/requireAuth.js
```

The middleware accepts authentication from:

```text
HTTP cookie
```

or:

```http
Authorization: Bearer <token>
```

The resulting authenticated user is stored as:

```js
req.user = {
    id: payload.sub
};
```

---

# User Model

Users are stored in MongoDB.

Important fields include:

```text
name
username
email
password
phoneNumber
birthday
profilePicture
gems
personalityType
inventory
cart
wishlist
gemTransactions
createdAt
updatedAt
```

---

# User Account

The account page is:

```text
/account
```

and allows users to manage profile data.

The project includes infrastructure for:

* Name changes
* Username changes
* Email changes
* Phone number changes
* Birthday changes
* Password changes
* Profile pictures
* Logout
* Account deletion

---

# Forgot Username

The route:

```text
/forgot-username
```

uses:

```http
POST /api/forgot-username/lookup
```

The user can be located by:

```text
Phone Number
or
Birthday
```

The API can return:

```text
Username
Email
```

---

# Forgot Password

The password reset flow uses:

```http
POST /api/forgot-password/verify
POST /api/forgot-password
```

The user may be identified using:

```text
Email
Username
Phone Number
```

---

# MongoDB Architecture

The project uses multiple MongoDB databases for logical separation.

Database connections are configured in:

```text
server/db/connections.js
```

---

# Authentication Database

```text
authentication
```

Contains the:

```text
users
```

collection.

---

# Product Items Database

```text
product-items
```

contains separate collections for:

```text
kpop
anime
```

---

# General Products Database

```text
products
```

contains:

```text
collection_products
```

for products such as:

```text
Fashion
Fragrance
Jewelry
```

---

# Gem Bundle Database

```text
bundles
```

contains:

```text
gem_bundles
```

---

# Quiz Database

The quiz routes directly access:

```text
celestial-charm-quizzes
```

Collections include:

```text
knowledgeQuestions
knowledgeResults
personalityResults
```

---

# K-pop Products

K-pop products use:

```text
server/models/KpopProduct.js
```

Product fields include:

```text
type
name
price
description
URL
image
```

The MongoDB collection is:

```text
kpop
```

---

# Anime Products

Anime products use:

```text
server/models/AnimeProduct.js
```

and the:

```text
anime
```

collection.

---

# Product Filtering

Product APIs support:

```text
Type filtering
Theme filtering
Pagination
```

For example:

```http
GET /api/kpop?type=album&page=1
```

and:

```http
GET /api/fashion?theme=dark&page=1
```

depending on the available seeded data.

---

# Fashion Products

Fashion products are exposed through:

```http
GET /api/fashion
```

---

# Fragrance Products

Fragrances use:

```http
GET /api/fragrances
```

---

# Jewelry Products

Jewelry uses:

```http
GET /api/jewelry
```

---

# Shopping System

Authenticated store routes begin with:

```text
/api/store
```

---

# Store API

Important endpoints include:

```http
GET  /api/store/items
GET  /api/store/inventory

GET  /api/store/cart
POST /api/store/cart/add
POST /api/store/cart/remove
POST /api/store/cart/sync
POST /api/store/cart/checkout

GET  /api/store/wishlist
POST /api/store/wishlist/add
POST /api/store/wishlist/remove

POST /api/store/move-to-cart
POST /api/store/move-to-wishlist

GET  /api/store/gem-bundles
POST /api/store/gem-bundles/purchase
POST /api/store/gem-bundles/purchase-custom
```

---

# Cart

User cart data is stored inside the MongoDB user document.

Example structure:

```js
cart: [
    {
        itemId: "...",
        qty: 1
    }
]
```

---

# Client Cart

The frontend also uses:

```text
sessionStorage
```

for its local cart.

The context is:

```text
client/src/context/CartWishlistContext.jsx
```

Changes to the cart are stored using:

```js
sessionStorage.setItem(
    'cart',
    JSON.stringify(cart)
);
```

---

# Wishlist

Wishlist state is also maintained in:

```text
sessionStorage
```

and the user document contains a persistent wishlist field.

Example:

```js
wishlist: [
    {
        itemId: "..."
    }
]
```

---

# Move Between Cart and Wishlist

The backend provides:

```http
POST /api/store/move-to-cart
POST /api/store/move-to-wishlist
```

This allows products to move between both collections.

---

# Checkout

Checkout uses:

```http
POST /api/store/cart/checkout
```

The backend:

```text
Loads User
    ↓
Loads Products
    ↓
Calculates Gem Price
    ↓
Checks Gem Balance
    ↓
Deducts Gems
    ↓
Moves Products Into Inventory
    ↓
Clears Cart
```

---

# Inventory

Purchased products are stored inside:

```text
user.inventory
```

Each inventory entry may contain:

```text
itemId
name
image
priceGems
quantity
purchasedAt
```

Users can view their inventory at:

```text
/inventory
```

---

# Gem Currency

Celestial Charm uses a virtual currency called:

```text
Gems
```

represented by:

```text
💎
```

Users have a:

```js
gems
```

field on their account.

---

# Product Gem Prices

Where needed, regular dollar prices are converted using approximately:

```text
$1 = 10 Gems
```

The helper is:

```js
Math.round(price * 10)
```

---

# Gem Bundles

The project includes gem bundles through:

```text
server/models/GemBundle.js
```

Fields include:

```text
id
title
emoji
costGems
giveGems
blurb
active
sortOrder
```

---

# Gem Bundle Purchasing

A user can spend existing gems to purchase a bundle that returns more gems.

The backend includes daily purchase limits.

Current limits include approximately:

```text
3 purchases of one bundle per day
5 total bundle purchases per day
```

---

# Custom Gem Purchase

The custom gem endpoint is:

```http
POST /api/store/gem-bundles/purchase-custom
```

The current implementation:

```text
Spend N Gems
    ↓
Receive 2N Gems
```

resulting in a net gain of:

```text
N Gems
```

---

# Knowledge Quiz

The knowledge quiz is available at:

```text
/knowledge
```

Questions are loaded using:

```http
GET /api/quiz/knowledge/questions
```

---

# Difficulty Levels

The API supports:

```text
easy
medium
hard
```

For example:

```http
GET /api/quiz/knowledge/questions?difficulty=easy&limit=10
```

---

# Knowledge Quiz Security

The backend removes the:

```text
correct
```

answer before sending quiz questions to the client.

This prevents the correct answer from being directly exposed in the quiz response.

---

# Knowledge Quiz Submission

Answers are submitted to:

```http
POST /api/quiz/knowledge/submit
```

The server retrieves the original questions from MongoDB and calculates the score.

---

# Knowledge Quiz Gem Rewards

The quiz rewards gems based on difficulty.

Current maximum rewards are approximately:

```text
Easy   → 10 Gems
Medium → 20 Gems
Hard   → 30 Gems
```

The reward depends on:

```text
score / total questions
```

---

# Quiz Results

Knowledge results are written to:

```text
knowledgeResults
```

and contain:

```text
userId
difficulty
score
total
earnedGems
createdAt
```

---

# Personality Quiz

The personality quiz is available at:

```text
/personality
```

The quiz uses K-pop and anime-themed questions to create an:

```text
MBTI-style result
```

Examples include:

```text
E / I
S / N
T / F
J / P
```

---

# Personality Calculation

The frontend calculates the resulting four-letter code using answer totals.

Example:

```text
ENFP
ISTJ
INTP
```

---

# Personality Results

The result is submitted to:

```http
POST /api/quiz/personality/submit
```

The backend stores:

```text
userId
personalityType
details
createdAt
```

inside:

```text
personalityResults
```

---

# User Personality Profile

When a personality quiz is submitted, the backend also updates:

```text
authentication.users.personalityType
```

so the personality result becomes part of the user's account.

---

# Quiz History

The application supports retrieving previous results through:

```http
GET /api/quiz/knowledge/results
GET /api/quiz/personality/results
```

---

# Books

The books page is:

```text
/books
```

and uses:

```text
Google Books API
```

to recommend young-adult books.

---

# Book Categories

Current book genres include:

```text
Fantasy
Romance
Mystery
Thriller
Horror
Dystopian
Comedy
```

---

# Book Information

Cards display:

```text
Book Cover
Title
Author
Publication Date
Page Count
```

---

# Amazon Links

Selecting a book generates an Amazon Books search using:

```text
Title + Author
```

and opens it in a new tab.

---

# Music

The route:

```text
/music
```

currently displays:

```text
Music Recommendations
```

but states that the feature is:

```text
Coming Soon
```

No Spotify or music API integration is implemented in the current ZIP.

---

# Blog

The route:

```text
/blog
```

currently displays a:

```text
Coming Soon
```

message.

The blog system is not currently implemented.

---

# Reviews

The public route:

```text
/reviews
```

currently displays static testimonial cards.

These reviews are hard-coded in the frontend.

---

# Backend Review Infrastructure

There is also a Mongoose model and API for future dynamic reviews.

The review model supports:

```text
User
Target Type
Target ID
Rating
Title
Review Body
Helpful Count
Moderation Status
```

Target types include:

```text
product
blog
site
```

Review moderation states include:

```text
pending
approved
rejected
```

---

# Review API

```http
GET  /api/reviews
POST /api/reviews
```

Review creation requires authentication.

---

# Review Pagination

The GET endpoint supports:

```text
page
limit
productId
blogId
```

and only retrieves:

```text
approved
```

reviews.

---

# Contact Page

The project includes a public:

```text
/contact
```

page.

The form contains:

```text
Name
Email
Message
```

A `ContactMessage` Mongoose model also exists.

However, the current frontend contact form does not submit to a backend route.

It is currently presentation-only.

---

# Policies

The project includes:

```text
/policies
/privacy-policy
/terms-of-service
```

---

# Deployment

The client contains:

```text
vercel.json
```

with Vercel rewrites.

API calls under:

```text
/api/*
```

are forwarded to a deployed Render backend.

The configured production backend is intended to live separately from the Vite frontend.

---

# Vercel Analytics

The app includes:

```jsx
<Analytics />
```

from:

```text
@vercel/analytics/react
```

---

# Local Development

## Requirements

Install:

```text
Node.js
npm
MongoDB Atlas account
Git
```

A recent Node.js LTS release is recommended.

---

# Clone Repository

```bash
git clone <YOUR-REPOSITORY-URL>
```

Then enter:

```bash
cd Celestial-Charm_Capstone_2025-main/celestial-charm-csp
```

---

# Install Client Dependencies

```bash
cd client
npm install
```

---

# Install Server Dependencies

Open another terminal:

```bash
cd server
npm install
```

---

# Environment Variables

Create:

```text
server/.env
```

with values similar to:

```env
MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=replace_with_a_long_random_secret

COOKIE_NAME=cc_session

PORT=5000
```

For local development, cookie configuration also needs to be adjusted as explained below.

---

# MongoDB URI

The application expects:

```text
MONGODB_URI
```

to point to a MongoDB cluster URI without forcing one specific database name.

The code then creates separate logical database connections.

---

# Local Development Port

The Vite configuration proxies:

```text
/api
```

to:

```text
http://localhost:5000
```

Therefore, for local development, set:

```env
PORT=5000
```

in:

```text
server/.env
```

---

# Start Backend

```bash
cd server
npm run dev
```

---

# Start Frontend

In another terminal:

```bash
cd client
npm run dev
```

Vite normally starts at:

```text
http://localhost:5173
```

---

# Local Development Architecture

```text
Browser
  ↓
localhost:5173
  ↓
Vite proxy /api
  ↓
localhost:5000
  ↓
Express
  ↓
MongoDB Atlas
```

---

# Frontend Scripts

Inside:

```text
client/
```

run:

```bash
npm run dev
```

to start Vite.

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Preview production build:

```bash
npm run preview
```

---

# Backend Scripts

Inside:

```text
server/
```

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# Seed Scripts

The backend includes seed utilities such as:

```text
seedGemBundles.js
seedKnowledgeQuestions.js
seedSplitProducts.js
unifiedSeed.js
```

These are intended to populate collections such as:

```text
Products
K-pop
Anime
Quiz Questions
Gem Bundles
```

Review each seed script before running it against a production database.

---

# Current Critical Issues

The current ZIP contains several issues that should be fixed before it can be considered deployment-ready.

---

# 1. Backend Syntax Error

File:

```text
server/server.js
```

The CORS origins array currently contains:

```js
"https://www.celestial-charm.shop",,
```

There are two commas.

This is invalid JavaScript and prevents the server from starting.

Change it to:

```js
"https://www.celestial-charm.shop",
```

---

# 2. Hard-Coded MongoDB Credentials

Multiple server files contain a fallback MongoDB connection string with embedded credentials.

Affected files include:

```text
server/server.js
server/db/connections.js
server/routes/quizRoutes.js
server/seeds/*
```

These credentials should not be committed to source control.

Use:

```js
process.env.MONGODB_URI
```

only.

If the repository has ever been public, rotate the exposed database credentials.

---

# 3. Hard-Coded JWT Secret

Several files use a fallback JWT secret.

For example:

```js
process.env.JWT_SECRET || '...'
```

The fallback should be removed.

Use:

```js
const JWT_SECRET =
    process.env.JWT_SECRET;
```

and fail at startup if it is missing.

---

# 4. Protected Routes Are Not Actually Protected Correctly

File:

```text
client/src/utils/ProtectedRoute.jsx
```

currently checks:

```js
if (status === "guest")
```

However, `AuthContext` uses:

```text
authenticated
unauthenticated
loading
```

and never sets:

```text
guest
```

That means an unauthenticated user may pass through the route guard.

Change:

```js
if (status === "guest")
```

to:

```js
if (status === "unauthenticated") {
    return (
        <Navigate
            to="/login"
            replace
        />
    );
}
```

---

# 5. AuthContext Performs Authentication Twice

`AuthContext.jsx` contains two authentication checks during startup.

One `useEffect()` directly calls:

```text
/api/auth/me
```

and another calls:

```text
refresh()
```

This creates duplicate requests and potential race conditions.

Only one startup authentication check is necessary.

---

# 6. First AuthContext Request Does Not Validate HTTP Status

The first authentication effect does:

```js
const data =
    await fetch("/api/auth/me");

setUser(data.user);
setStatus("authenticated");
```

`fetch()` does not throw automatically on HTTP 401.

The returned value is also a `Response`, not parsed JSON.

That means:

```js
data.user
```

will be undefined.

This entire effect should be removed in favor of the existing:

```js
refresh()
```

function.

---

# 7. Registration Does Not Properly Read `/api/auth/me`

File:

```text
client/src/pages/Register/Register.jsx
```

currently does:

```js
const me =
    await fetch("/api/auth/me");

setUser(me.user);
```

Again, `me` is a `Response`.

It should first parse JSON:

```js
const meRes =
    await fetch(
        "/api/auth/me",
        {
            credentials: "include"
        }
    );

const data =
    await meRes.json();

setUser(data.user);
```

Better yet, registration should use the existing `AuthContext.register()` method.

---

# 8. Registration Ignores Failed Register Responses

The registration page sends:

```js
await fetch("/api/auth/register", ...)
```

but does not verify:

```js
response.ok
```

A failed registration may therefore still continue into the "successful" flow.

The response should be checked before navigating.

---

# 9. Production Cookie Settings Break Local Authentication

The auth controller sets:

```text
SameSite=None
Secure=true
Domain=.celestial-charm.shop
```

for every environment.

That configuration is intended for production HTTPS.

A cookie for:

```text
.celestial-charm.shop
```

cannot be used normally on:

```text
localhost
```

For local development, use something closer to:

```js
res.cookie(
    COOKIE_NAME,
    token,
    {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/"
    }
);
```

Do not set a production domain on localhost.

---

# 10. Frontend and Backend Ports Do Not Match by Default

Vite proxies to:

```text
localhost:5000
```

but the server defaults to:

```text
10000
```

This means API requests will fail locally unless:

```env
PORT=5000
```

is explicitly set.

It would be better to use the same default in both places.

---

# 11. Forgot Password Route Sends Two Responses

File:

```text
server/routes/forgot-password.js
```

contains:

```js
res.json({
    message: 'It works!'
});
```

before the actual password-reset logic.

After sending that response, the code later attempts to send another response.

This can produce:

```text
ERR_HTTP_HEADERS_SENT
```

Remove the test response entirely.

---

# 12. Forgot Password Cannot Reliably Read Existing Password

The user model defines:

```js
password: {
    select: false
}
```

but the forgot-password query does not explicitly request the password.

It later calls:

```js
compare(
    newPassword,
    user.password
);
```

`user.password` may therefore be unavailable.

Use:

```js
User.findOne(...).select("+password")
```

if comparing the old stored hash is required.

---

# 13. Forgot Password Security Is Weak

The current reset flow can identify a user by:

```text
Email
Username
Phone Number
```

and immediately allow a new password to be supplied.

There is no:

```text
Email reset token
OTP
Verification code
Expiring reset link
```

This is not secure enough for a production password-reset system.

---

# 14. User Route Order Makes `/api/users/me` Unreachable

In:

```text
server/routes/users.js
```

the route:

```js
router.get('/:id', ...)
```

appears before:

```js
router.get('/me', ...)
```

Express will interpret:

```text
/api/users/me
```

as:

```text
id = "me"
```

Move:

```js
router.get('/me', ...)
```

above:

```js
router.get('/:id', ...)
```

---

# 15. User Routes Have an Authorization Vulnerability

The current routes allow an authenticated user to request:

```http
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
```

but do not verify that:

```text
:id === req.user.id
```

An authenticated user could potentially attempt to read, edit, or delete another user's account if they know the MongoDB ID.

These routes should enforce ownership.

For example:

```js
if (
    req.params.id !== req.user.id
) {
    return res.status(403).json({
        message: "Forbidden"
    });
}
```

---

# 16. Reviews Cannot Currently Be Created Successfully

The review schema requires:

```text
userName
```

but the POST route creates a review without setting it.

The schema requires:

```js
userName: {
    required: true
}
```

while the POST route only sends:

```text
userId
targetType
targetId
rating
title
body
```

This will cause Mongoose validation to fail.

---

# 17. Review Route Uses Wrong Authenticated User Property

Authentication middleware creates:

```js
req.user = {
    id: payload.sub
}
```

but the review route uses:

```js
req.user._id
```

That value is undefined.

It should use:

```js
req.user.id
```

---

# 18. Reviews Response Has an Unusual Shape

The GET reviews route returns:

```js
res.json([
    {
        items,
        total,
        page,
        pages
    }
]);
```

This produces an array containing one metadata object.

A more conventional response would be:

```js
res.json({
    items,
    total,
    page,
    pages
});
```

---

# 19. Public Reviews Are Not Connected to Review API

The page:

```text
/reviews
```

uses hard-coded testimonial cards.

It does not call:

```text
/api/reviews
```

Therefore, the existing review model and routes are not currently represented in the public reviews UI.

---

# 20. Contact Form Does Not Submit

The Contact page has a form, and a:

```text
ContactMessage
```

Mongoose model exists.

However, there is no corresponding API route connected to the form.

Pressing:

```text
Send Message
```

does not currently persist a contact message.

---

# 21. Google Books API Key Is Hard-Coded

File:

```text
client/src/components/BooksCarousel/BooksCarousel.jsx
```

contains a client-side Google API key directly in the source.

Do not commit sensitive credentials.

For Vite configuration, use an environment variable such as:

```env
VITE_GOOGLE_BOOKS_API_KEY=...
```

and access it with:

```js
import.meta.env
    .VITE_GOOGLE_BOOKS_API_KEY
```

Be aware that Vite frontend variables are still visible to users once shipped, so API restrictions should also be configured in Google Cloud.

If the current key has been publicly committed, rotate or restrict it.

---

# 22. Cart Authentication Is Inconsistent

Several cart and wishlist components read:

```js
localStorage.getItem("token")
```

However, the current authentication system primarily stores JWTs in:

```text
HTTP-only cookies
```

No current login flow stores a JWT in localStorage.

As a result, helpers such as:

```text
Wishlist authedPost()
Cart authedPost()
```

may return without making an API call when no localStorage token exists.

These components should use:

```js
credentials: "include"
```

and rely on the session cookie consistently.

---

# 23. Inventory Also Reads a Local Token

`Inventory.jsx` sends:

```http
Authorization: Bearer null
```

when localStorage has no token.

The request does include:

```js
credentials: "include"
```

so cookie authentication may still work, but the Bearer header is unnecessary and inconsistent.

---

# 24. Error Middleware Is Registered Too Early

In:

```text
server/server.js
```

the Express error-handling middleware appears before most application routes.

Express error middleware should generally be registered after the routes it is intended to catch.

Recommended order:

```text
Middleware
   ↓
Routes
   ↓
404 Handler
   ↓
Error Handler
```

---

# 25. Quiz Route Contains Another Hard-Coded MongoDB URI

`server/routes/quizRoutes.js` creates its own MongoClient using a hard-coded URI.

It should use:

```js
process.env.MONGODB_URI
```

just like the rest of the backend.

---

# 26. Server Startup Creates Redundant Mongo Connections

`server/server.js` calls:

```js
mongoose.connect(...)
```

while:

```text
server/db/connections.js
```

also creates separate connections.

This produces multiple MongoDB connection strategies inside the same backend.

The architecture should be standardized.

---

# 27. Root Package Structure Is Inconsistent

The repository has:

```text
package.json
client/package.json
server/package.json
```

but the root package currently contains only a small dependency set and no useful development scripts.

A root script setup could simplify startup.

For example:

```json
{
  "scripts": {
    "client": "npm --prefix client run dev",
    "server": "npm --prefix server run dev"
  }
}
```

A concurrency package could also run both together.

---

# 28. Backend Build Script Is Recursive

`server/package.json` currently contains:

```json
"build": "npm run build"
```

This command calls itself indefinitely.

For a plain Express JavaScript server, a build step may not be needed.

Remove the build script or replace it with an appropriate deployment step.

---

# Features That Are Still Incomplete

The following areas exist in the UI or codebase but are not fully implemented:

```text
Music recommendations
Blog
Dynamic customer reviews UI
Contact form persistence
Secure password reset
Consistent cart/wishlist persistence
Production-ready authentication flow
```

---

# Security Recommendations

Before publishing or deploying this repository:

1. Remove every hard-coded MongoDB credential.
2. Rotate exposed MongoDB credentials.
3. Remove hard-coded JWT secret fallbacks.
4. Rotate the Google Books API key if exposed publicly.
5. Add `.env` to `.gitignore`.
6. Create an `.env.example`.
7. Restrict Google API keys by domain/API.
8. Fix user-route ownership checks.
9. Replace password reset with token-based verification.
10. Use one consistent authentication method.
11. Do not store authentication tokens in both cookies and localStorage.
12. Validate all user-controlled update fields.

---

# Recommended `.env.example`

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/

JWT_SECRET=replace_with_a_long_random_secret

COOKIE_NAME=cc_session

PORT=5000

COOKIE_DOMAIN=
```

Do not place real credentials in this file.

---

# Recommended Local Cookie Setup

Production and development cookies should be configured separately.

For development:

```js
const isProduction =
    process.env.NODE_ENV ===
    "production";

res.cookie(
    COOKIE_NAME,
    token,
    {
        httpOnly: true,
        secure: isProduction,
        sameSite:
            isProduction
                ? "none"
                : "lax",
        domain:
            isProduction
                ? COOKIE_DOMAIN
                : undefined,
        path: "/"
    }
);
```

---

# Recommended ProtectedRoute Fix

Current logic should be changed to:

```jsx
export default function ProtectedRoute({
    children
}) {
    const { status } = useAuth();

    if (status === "loading") {
        return null;
    }

    if (
        status ===
        "unauthenticated"
    ) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}
```

---

# Recommended Auth Startup

Instead of two startup authentication effects, keep one:

```js
useEffect(() => {
    refresh();
}, []);
```

with:

```js
async function refresh() {
    try {
        const response =
            await fetch(
                "/api/auth/me",
                {
                    credentials:
                        "include"
                }
            );

        if (!response.ok) {
            throw new Error(
                "Unauthorized"
            );
        }

        const data =
            await response.json();

        setUser(data.user);

        setStatus(
            "authenticated"
        );
    } catch {
        setUser(emptyUser);

        setStatus(
            "unauthenticated"
        );
    }
}
```

---

# Recommended User Ownership Check

Protected user routes should validate ownership.

For example:

```js
router.put(
    '/:id',
    requireAuth,
    async (req, res) => {

        if (
            req.params.id !==
            req.user.id
        ) {
            return res
                .status(403)
                .json({
                    message:
                        'Forbidden'
                });
        }

        // update user
    }
);
```

---

# Recommended Review Creation Fix

The backend should retrieve the authenticated user's name and use the correct ID field.

For example:

```js
const user =
    await User.findById(
        req.user.id
    );

const review =
    await Reviews.create({
        userId: req.user.id,
        userName:
            user.username,
        targetType,
        targetId,
        rating,
        title,
        body
    });
```

---

# Recommended Development Workflow

Start MongoDB configuration first.

Then use two terminals.

## Terminal 1

```bash
cd celestial-charm-csp/server
npm install
npm run dev
```

## Terminal 2

```bash
cd celestial-charm-csp/client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Production Build

Build the frontend with:

```bash
cd client
npm run build
```

Vite creates:

```text
client/dist/
```

---

# Educational Concepts Demonstrated

Celestial Charm demonstrates:

```text
React
React Hooks
React Context
React Router
Protected Routes
Vite
Express
REST APIs
MongoDB
MongoDB Atlas
Mongoose
Multiple Databases
Schema Modeling
Authentication
bcrypt
JWT
HTTP-only Cookies
Authorization
CRUD
Shopping Cart Logic
Wishlist Logic
Inventory Management
Virtual Currency
Quizzes
Score Calculation
Third-Party APIs
Google Books API
Pagination
Filtering
Responsive Design
Framer Motion
Tailwind CSS
Bootstrap Icons
Vercel Deployment
Render Deployment
Environment Variables
```

---

# Data Flow

## Authentication

```text
Login Form
   ↓
POST /api/auth/login
   ↓
MongoDB User Lookup
   ↓
bcrypt.compare()
   ↓
JWT
   ↓
HTTP-only Cookie
   ↓
Protected API Requests
```

---

# Shopping

```text
Product Page
    ↓
Add to Cart
    ↓
User Cart
    ↓
Checkout
    ↓
Calculate Gems
    ↓
Deduct Gems
    ↓
Move Product
to Inventory
```

---

# Knowledge Quiz

```text
Select Difficulty
      ↓
Load Questions
      ↓
Submit Answers
      ↓
Server Calculates Score
      ↓
Award Gems
      ↓
Save Result
      ↓
Update User Gem Balance
```

---

# Personality Quiz

```text
Answer Questions
      ↓
Calculate MBTI-style Code
      ↓
Display Personality
      ↓
POST Result
      ↓
Save History
      ↓
Update User Profile
```

---

# Books

```text
Books Page
    ↓
Google Books API
    ↓
Genre Results
    ↓
Book Carousel
    ↓
Amazon Search Link
```

---

# Current Development Status

The project contains a significant amount of implemented functionality, including:

```text
Authentication
MongoDB persistence
Product APIs
Virtual currency
Shopping
Inventory
Quizzes
Book recommendations
User profiles
Deployment configuration
```

However, several important bugs and security issues should be corrected before treating the current ZIP as production-ready.

The highest-priority fixes are:

```text
server/server.js CORS syntax error
Hard-coded database credentials
ProtectedRoute authentication bug
Local cookie configuration
Frontend/backend port mismatch
Forgot-password double response
User ownership vulnerability
Review creation errors
Cart auth inconsistency
Hard-coded Google Books API key
```

---

# Quick Start

After fixing the backend syntax error and configuring environment variables:

```bash
git clone <YOUR-REPOSITORY-URL>

cd Celestial-Charm_Capstone_2025-main/celestial-charm-csp
```

Install backend:

```bash
cd server
npm install
```

Create:

```text
server/.env
```

with:

```env
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret
PORT=5000
```

Start backend:

```bash
npm run dev
```

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Then visit:

```text
http://localhost:5173
```

---

# Summary

**Celestial Charm** is a full-stack personalized shopping and fandom platform built around K-pop, anime, fashion, beauty, books, quizzes, and virtual rewards.

The core stack is:

```text
React 19
Vite
React Router
Express
MongoDB
Mongoose
bcrypt
JWT
```

The core architecture is:

```text
React Frontend
      ↓
Express REST API
      ↓
MongoDB
```

Public visitors can browse:

```text
Store
K-pop
Anime
Reviews
Policies
About
Contact
```

Authenticated users can access:

```text
Dashboard
Account
Cart
Wishlist
Inventory
Fashion
Fragrances
Jewelry
K-pop
Anime
Books
Quizzes
Gem Shop
Personalization
```

The project demonstrates a broad range of full-stack development concepts and serves as a large capstone-style application rather than a simple storefront.
