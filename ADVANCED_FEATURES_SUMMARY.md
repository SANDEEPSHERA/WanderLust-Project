# Feature summary (current codebase only)

This file is aligned with **`app.js`**, **`routes/`**, **`controllers/`**, and **`models/`** in this project. It replaces older text that described features not present in the repo.

## Application structure

- **Single Express app** in `app.js`: static files, sessions, Passport, flash, route mounting, error handler.  
- **Listing router** at `/listings` — index, new, create, show, edit, update, delete; Cloudinary upload on create/update.  
- **Review router** mounted at `/listings/:id/reviews` — nested `reviewId` for delete.  
- **User router** at `/users` — signup, login, logout only.  
- **Legal** — two `app.get` routes for `/privacy` and `/terms`.

## Listing behavior

- **Image:** single `{ url, filename }` per listing from Cloudinary.  
- **Location:** string fields `location`, `country`; **geometry** from Mapbox Geocoding API in `controllers/listings.js`.  
- **Index query:** `search` regex on title/location/country; `country`; `priceRange` buckets; `includeTaxes` for display math.  
- **Ownership:** `isOwner` on edit/delete listing.

## Review behavior

- Joi-validated body (`reviewSchema` in `schema.js`).  
- **isReviewAuthor** on delete.  
- Listing stores references to reviews; cascade delete reviews when listing deleted (`models/listing.js` post hook).

## Authentication

- **passport-local-mongoose** on `User`.  
- **isLoggedIn** saves `redirectUrl` and sends to **`/users/login`**.  
- After login/signup, redirect to `redirectUrl` or `/listings`.

## Client-side maps

- **mapbox-gl** from CDN in `views/listings/index.ejs` and `show.ejs`.  
- Token read from `process.env.MAPBOX_API_KEY` in templates / server-rendered scripts.

## Packages in `package.json` not used in `app.js`

The following are installed but **not** imported in `app.js` (as of this snapshot): `helmet`, `express-rate-limit`, `express-mongo-sanitize`, `express-validator`, `cookie-parser`. You may wire them in later.

## Documentation set

| File | Role |
|------|------|
| `README_ENHANCED.md` | Main overview + route table |
| `SETUP_GUIDE.md` | Setup steps |
| `QUICKSTART.md` | Fast path |
| `API_KEYS_GUIDE.md` | Keys |
| `IMPLEMENTATION_SUMMARY.md` | File/feature mapping |
| `ADVANCED_QUICKSTART.md` | Test checklist |

For dependency versions and scripts, use **`package.json`** only.
