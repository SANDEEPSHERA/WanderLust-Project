# Quick Start (Wanderlust / majorproject)

## 1. Prerequisites

- Node.js (LTS recommended)
- MongoDB running locally **or** a MongoDB Atlas connection string

## 2. API keys (free tiers)

| Service    | Purpose              | Sign up |
|-----------|----------------------|--------|
| Cloudinary | Image uploads (listings) | https://cloudinary.com/users/register/free |
| Mapbox     | Maps + geocoding       | https://www.mapbox.com/ |

Copy **Cloud name**, **API key**, **API secret** (Cloudinary) and **Default public token** starting with `pk.` (Mapbox).

## 3. Environment

Create `.env` in the project root (see `.env.example`):

```env
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/wanderlust
SESSION_SECRET=change_this_to_a_long_random_string
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAPBOX_API_KEY=
```

- **`PORT`**: optional; if omitted, `app.js` defaults to **8080**.
- **`MONGODB_URI`**: optional; if omitted, default is local `mongodb://127.0.0.1:27017/wanderlust`.

## 4. Install and run

```bash
npm install
node app.js
```

Open **http://localhost:8080/listings** (use your `PORT` if set).

## 5. What to try

1. **Auth**: **Sign up / Log in / Log out** — routes are under **`/users`** (e.g. `/users/login`, `/users/signup`, `/users/logout`), not `/login` or `/signup`.
2. **Listings**: create (`/listings/new`), view, edit, delete (owner only).
3. **Index page**: search, country/price filters, tax toggle (display), Mapbox map with markers (needs `MAPBOX_API_KEY`).
4. **Reviews**: on a listing page, add a review when logged in; delete your own review.
5. **Legal**: footer links **Privacy** (`/privacy`) and **Terms** (`/terms`).

## 6. Troubleshooting

| Issue | Check |
|--------|--------|
| Maps blank / geocoding fails | `MAPBOX_API_KEY` in `.env`, restart server |
| Image upload fails | Cloudinary vars; file must be image; max 5MB (see `routes/listing.js`) |
| DB errors | MongoDB running or `MONGODB_URI` correct |
| 404 on logout/login | Use **`/users/...`** URLs (navbar should match) |

## 7. Other docs

- **SETUP_GUIDE.md** — longer setup and file overview  
- **README_ENHANCED.md** — stack, routes, schema  
- **API_KEYS_GUIDE.md** — key setup detail  

**Note:** `helmet`, `express-rate-limit`, `express-mongo-sanitize`, and `express-validator` are listed in `package.json` but **not wired in `app.js`** in this repo. Do not assume they are active middleware unless you add them.
