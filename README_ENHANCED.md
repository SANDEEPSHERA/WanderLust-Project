# Wanderlust — project documentation (aligned with source)

## Stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js |
| Server | Express **5** (`package.json`) |
| DB | MongoDB + Mongoose |
| Views | EJS + ejs-mate layouts |
| Auth | Passport (local) + sessions (`connect-mongo`) |
| Validation | Joi (`schema.js`, listing/review middleware) |
| Images | Cloudinary (multer-storage-cloudinary) |
| Maps | Mapbox GL JS in views; geocoding via Mapbox HTTP API in `controllers/listings.js` |
| Styling | Bootstrap 5, `public/css/style.css` |

## Environment

See **`.env.example`**. Minimum for full functionality:

- `MONGODB_URI` (or use code default for local MongoDB)  
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`  
- `MAPBOX_API_KEY` (token starting with `pk.`)  
- `SESSION_SECRET` (recommended for any shared environment)  

`PORT` defaults to **8080** in `app.js` if unset.

## Run

```bash
npm install
node app.js
```

Then open **http://localhost:8080/listings** (adjust port if `PORT` is set).

## HTTP routes (from `app.js` + routers)

| Method(s) | Path | Purpose |
|-----------|------|---------|
| GET | `/` | Simple root message |
| GET | `/privacy` | Privacy policy page |
| GET | `/terms` | Terms page |
| * | `/listings` | Listing index, new, show, update, delete (`routes/listing.js`) |
| POST, DELETE | `/listings/:id/reviews/...` | Reviews (`routes/review.js`, `mergeParams`) |
| GET, POST | `/users/signup`, `/users/login` | Auth forms + submit |
| GET | `/users/logout` | Logout |

**Reviews:** `POST /listings/:id/reviews`, `DELETE /listings/:id/reviews/:reviewId`

## Listing features

- CRUD with **owner** field and `isOwner` middleware  
- **geometry** (GeoJSON Point) for map markers  
- Index: **search**, **country**, **price range** query params; **includeTaxes** for displayed price with 18% factor  
- Create/update: geocode `location` with Mapbox; optional new image on edit  

## Models (summary)

- **User** — passport-local-mongoose  
- **Listing** — title, description, image `{ url, filename }`, price, location, country, owner, geometry, reviews refs  
- **Review** — rating, comment, author, linked from listing  

## Security notes (actual)

- Session cookie **httpOnly**, max age ~7 days  
- Listing/review validation with **Joi**  
- Multer: images only, size cap in `routes/listing.js`  
- Secrets via **dotenv**  

Packages such as **helmet**, **express-rate-limit**, and **express-mongo-sanitize** appear in `package.json` but are **not** applied in `app.js` unless you add them.

## Docs index

| File | Contents |
|------|----------|
| `QUICKSTART.md` | Short setup and testing |
| `SETUP_GUIDE.md` | Detailed setup, routes, layout |
| `API_KEYS_GUIDE.md` | Cloudinary & Mapbox keys |
| `IMPLEMENTATION_SUMMARY.md` | Feature ↔ file mapping |
| `ADVANCED_QUICKSTART.md` | Testing checklist (current app) |
| `ADVANCED_FEATURES_SUMMARY.md` | Same codebase scope (no extra features) |

## License

Project `package.json`: **ISC**.
