# API keys (Cloudinary & Mapbox)

You need valid keys in **`.env`** at the **project root** (same folder as `app.js`), or image upload and maps/geocoding will not work correctly.

## Cloudinary (listing images)

1. Register: https://cloudinary.com/users/register/free  
2. Dashboard → copy **Cloud name**, **API Key**, **API Secret**

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Mapbox (maps + geocoding)

1. Register: https://www.mapbox.com/  
2. Account → copy **Default public token** (starts with `pk.`)

```env
MAPBOX_API_KEY=pk.your_token_here
```

`controllers/listings.js` uses this token for Mapbox Geocoding and the views load Mapbox GL JS for maps.

## After editing `.env`

1. Save the file  
2. Restart the server (`Ctrl+C`, then `node app.js`)  
3. Hard refresh the browser if needed  

## Quick verification

- Visit **http://localhost:8080/listings** (or `http://localhost:<PORT>/listings` if you set `PORT`).  
- Map area should load when the token is valid.  
- Creating a listing with an image should succeed when Cloudinary is configured.

## Optional: MongoDB & session

```env
MONGODB_URI=mongodb://127.0.0.1:27017/wanderlust
SESSION_SECRET=use_a_long_random_string_in_production
```

Both are used in `app.js` (with defaults if unset).

Free tiers are enough for development; no credit card required for normal signup on these services.
