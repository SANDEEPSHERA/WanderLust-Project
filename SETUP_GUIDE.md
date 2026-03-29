# Wanderlust — setup guide (matches current code)

## Overview

Express + MongoDB + EJS app: **listings** with Cloudinary images, Mapbox maps/geocoding, **Passport** local auth, **reviews**, footer **Privacy** / **Terms** pages.

Entry point: **`app.js`**. Default HTTP port: **8080** (`process.env.PORT || 8080`).

## 1. Install

```bash
npm install
```

## 2. Environment variables

Copy **`.env.example`** to **`.env`** and set values.

| Variable | Used for | Notes |
|----------|----------|--------|
| `PORT` | HTTP server | Optional; defaults to **8080** |
| `MONGODB_URI` | Mongoose connection | Default in code: `mongodb://127.0.0.1:27017/wanderlust` |
| `SESSION_SECRET` | Express session | Default fallback exists; override in production |
| `CLOUDINARY_*` | Image upload via multer-storage-cloudinary | Required for uploads |
| `MAPBOX_API_KEY` | Geocoding + Mapbox GL in browser | Public token `pk....` |

## 3. MongoDB

- **Local:** start MongoDB, then use `mongodb://127.0.0.1:27017/wanderlust` or your URI.  
- **Atlas:** put full SRV string in `MONGODB_URI`.

## 4. Run

```bash
node app.js
```

Server listens on the chosen **PORT** (default **8080**). Example: **http://localhost:8080/listings**

## 5. Main routes (actual)

| Area | Base path | Notes |
|------|-----------|--------|
| Root | `GET /` | Plain text: "Hi, I am root" |
| Listings | `/listings` | Index, CRUD, nested under `routes/listing.js` |
| Reviews | `/listings/:id/reviews` | POST create, DELETE by `reviewId` (`routes/review.js`) |
| Users | `/users` | `/users/signup`, `/users/login`, `GET /users/logout` |
| Legal | `/privacy`, `/terms` | Render `views/legal/*.ejs` |

**Important:** Login/signup/logout live under **`/users/...`**, not `/login` or `/signup`.

## 6. Features in this repo

- Listings: create/read/update/delete; owner checks (`utils/middleware.js`)  
- Images: Cloudinary (`routes/listing.js`, `utils/cloudinary.js`)  
- Maps: listing index map + show page map; geocoding in `controllers/listings.js` (axios + Mapbox API)  
- Search / country / price filters + tax **display** toggle on index (`controllers/listings.js`, `views/listings/index.ejs`)  
- Reviews: Joi validation (`schema.js`, `utils/validateReview.js`)  
- Sessions: `connect-mongo` store in `app.js`  
- Static files: `public/`, also `/uploads` static path  

## 7. Not enabled in `app.js` (despite `package.json`)

These packages are installed but **not required/imported** in `app.js` in this project:

- `helmet`  
- `express-rate-limit`  
- `express-mongo-sanitize`  
- `express-validator`  
- `cookie-parser`  

Add and configure them if you want those behaviors.

## 8. Project layout (high level)

```
app.js
routes/listing.js, routes/review.js, routes/user.js
controllers/listings.js, controllers/review.js, controllers/user.js
models/listing.js, models/review.js, models/user.js
utils/cloudinary.js, utils/middleware.js, utils/validateListing.js, utils/validateReview.js, ...
views/listings/, views/users/, views/legal/, views/layouts/
public/css/, public/js/
```

## 9. Troubleshooting

- **Maps / geocoding:** check `MAPBOX_API_KEY`, restart server.  
- **Uploads:** Cloudinary env vars; image only; size limit in `routes/listing.js`.  
- **Database:** `MONGODB_URI` and network (Atlas IP allowlist).  
- **404 on auth links:** use `/users/login` and `/users/signup`.

## 10. Dependencies (see `package.json` for exact versions)

Core: `express`, `mongoose`, `ejs`, `ejs-mate`, `passport`, `passport-local`, `passport-local-mongoose`, `express-session`, `connect-flash`, `connect-mongo`, `method-override`, `multer`, `multer-storage-cloudinary`, `cloudinary`, `axios`, `joi`, `dotenv`, `mapbox-gl` (client maps).

Do not copy version numbers from old docs; always use **`package.json`** as source of truth.
