# Implementation summary (current repository)

This document matches **this** codebase only. For dependency versions, always read **`package.json`**.

## Features implemented

1. **Listings** — Full CRUD; images to **Cloudinary**; **Mapbox** geocoding for `geometry`; search + country + price filters; tax display toggle on index.  
2. **Reviews** — POST and DELETE with author check (`isReviewAuthor`).  
3. **Users** — Signup, login, logout under **`/users`** (Passport local).  
4. **Sessions** — `express-session` + **`connect-mongo`** using same `MONGODB_URI` as Mongoose.  
5. **Legal pages** — `GET /privacy`, `GET /terms` (EJS templates in `views/legal/`).  
6. **Static assets** — `public/`; `/uploads` route exists for legacy/local paths.

## Key files

| Area | Files |
|------|--------|
| App bootstrap | `app.js` |
| Listings | `routes/listing.js`, `controllers/listings.js`, `models/listing.js` |
| Reviews | `routes/review.js`, `controllers/review.js`, `models/review.js` |
| Users | `routes/user.js`, `controllers/user.js`, `models/user.js` |
| Validation | `schema.js`, `utils/validateListing.js`, `utils/validateReview.js` |
| Cloudinary | `utils/cloudinary.js`, multer in `routes/listing.js` |
| Middleware | `utils/middleware.js` (`isLoggedIn`, `isOwner`, `isReviewAuthor`) |
| Views | `views/listings/*`, `views/users/*`, `views/legal/*`, `views/layouts/boilerplate.ejs` |

## Data flow (short)

- **Create listing:** `POST /listings` with multipart field `listing[image]` → multer/Cloudinary → `Listing` saved with `owner`, optional `geometry` from geocode.  
- **Update listing:** `PUT /listings/:id` — body listing fields; new image optional; `image` from body stripped in controller so only upload sets image.  
- **Reviews:** `POST /listings/:id/reviews` with `review[rating]`, `review[comment]`.

## Environment

- **`MONGODB_URI`** — Mongo connection string.  
- **`SESSION_SECRET`** — session signing.  
- **`CLOUDINARY_*`** — three variables for image pipeline.  
- **`MAPBOX_API_KEY`** — geocoding + map token in client.  
- **`PORT`** — server port (default **8080**).

## Not part of this repo

The following are **not** implemented in the current code (no routes/models/views): wishlist, bookings/reservations, user profile page, pagination UI, category dropdown, Helmet/rate-limit/mongo-sanitize middleware in `app.js`.

## Verification checklist

- [ ] MongoDB reachable  
- [ ] `.env` has Cloudinary + Mapbox for full UX  
- [ ] `node app.js` starts without throw  
- [ ] `/listings` loads  
- [ ] `/users/signup` and `/users/login` work  
- [ ] `/users/logout` works  
- [ ] `/privacy` and `/terms` render  
