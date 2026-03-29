# Testing checklist (current app)

Use this after `npm install` and `node app.js`. Default URL base: **http://localhost:8080** (change if `PORT` is set).

## Auth (routes under `/users`)

1. Open **/users/signup** — create an account.  
2. Log out via **/users/logout** (or navbar).  
3. Open **/users/login** — log back in.  

## Listings

1. **/listings** — list, map (needs Mapbox key), search, country filter, price filter, tax toggle.  
2. **/listings/new** — create listing with image (needs Cloudinary).  
3. Open a listing — show page, map if coordinates exist, reviews section.  
4. As owner — **Edit**, **Delete**; optional new image on edit.  

## Reviews

1. While logged in, on a listing page submit a review.  
2. Delete review (as author) if your route shows delete control.  

## Legal

1. **/privacy** and **/terms** — footer links should work.  

## If something fails

- Restart server after changing `.env`.  
- See **QUICKSTART.md** and **API_KEYS_GUIDE.md**.  

**Note:** Older copies of this file described wishlist, bookings, profile, Helmet, etc. Those are **not** in the current repository; see **IMPLEMENTATION_SUMMARY.md** for what exists.
