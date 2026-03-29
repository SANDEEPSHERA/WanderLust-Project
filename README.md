# Wanderlust (majorproject)

Express + MongoDB + EJS listing app with Cloudinary images, Mapbox maps/geocoding, Passport auth, and reviews.

## Quick start

```bash
npm install
# copy .env.example to .env and add keys
node app.js
```

Default URL: **http://localhost:8080/listings** (override with `PORT` in `.env`).

## Documentation

| Doc | Description |
|-----|-------------|
| [QUICKSTART.md](./QUICKSTART.md) | Short setup and testing |
| [README_ENHANCED.md](./README_ENHANCED.md) | Stack, routes, overview |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Detailed setup |
| [API_KEYS_GUIDE.md](./API_KEYS_GUIDE.md) | Cloudinary & Mapbox |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Files and features |

Auth routes use the **`/users`** prefix: `/users/login`, `/users/signup`, `/users/logout`.

## License

ISC (see `package.json`).
