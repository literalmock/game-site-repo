# Gameverse Backend

Express + MongoDB API for Gameverse auth, seeded games, comments, wishlist, and playtime-based leaderboards.

## Setup

Create `backend/.env`:

```env
JWT_SECRET=your-secret
MONGO_URI=mongodb://localhost:27017/gameverse
PORT=3000
CLIENT_URL=http://localhost:5173
```

Install and run:

```bash
npm install
npm run dev
```

Seed demo data:

```bash
npm run seed:games
npm run seed:demo
```

- `seed:games` imports the existing frontend catalog from `frontend/src/utils/viewerGames.js` into Mongo, including `thumbnail` and `iframeUrl`.
- `seed:demo` creates demo users, comments, and leaderboard scores.
- Demo user password: `demoPassword123`

## Auth

Routes:

```txt
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
PUT  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

Login sets an HTTP-only `token` cookie. Authenticated routes require that cookie.

Signup body:

```json
{
  "fullname": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Login body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Games

Routes:

```txt
GET    /api/games
GET    /api/games/:gameId
POST   /api/games
PUT    /api/games/:gameId
DELETE /api/games/:gameId
```

The frontend now reads games from `/api/games`. Game ids are the seeded public ids from `viewerGames.js`, such as `7`, not only Mongo `_id` values.

Example:

```bash
curl "http://localhost:3000/api/games?limit=100&sort=source_asc"
```

Game response shape:

```json
{
  "_id": "mongo-id",
  "id": 7,
  "publicId": "7",
  "sourceId": 7,
  "title": "Noob vs Zombie",
  "category": "Casual",
  "genre": "Casual",
  "tags": ["Casual"],
  "rating": "4.0",
  "views": "338K",
  "thumbnail": "https://img.gamemonetize.com/...",
  "iframeUrl": "https://html5.gamemonetize.co/...",
  "description": "Play Noob vs Zombie - Casual game"
}
```

## Leaderboard And Playtime Points

Because third-party iframe games do not expose reliable high scores to this app, leaderboard points are based on authenticated playtime.

Routes:

```txt
GET  /api/leaderboard
GET  /api/leaderboard/:gameId
GET  /api/games/:gameId/leaderboard
POST /api/games/:gameId/playtime
POST /api/games/:gameId/score
```

How playtime scoring works:

- The frontend sends a heartbeat while a logged-in user is playing.
- Heartbeats only count while the game iframe is loaded and the tab is visible.
- `1 second = 1 point`.
- Global leaderboard ranks by total points across games.
- Game leaderboard ranks by points for that game.

Record playtime:

```bash
curl -X POST http://localhost:3000/api/games/7/playtime \
  -H "Content-Type: application/json" \
  --cookie "token=YOUR_COOKIE" \
  -d '{"seconds":30}'
```

Sample response:

```json
{
  "message": "Playtime recorded",
  "addedSeconds": 30,
  "earnedPoints": 30,
  "score": 360,
  "durationSeconds": 360
}
```

Legacy/manual score submission is still available:

```bash
curl -X POST http://localhost:3000/api/games/7/score \
  -H "Content-Type: application/json" \
  -d '{"username":"NovaStriker","score":1200}'
```

## Comments

Routes:

```txt
GET    /api/games/:gameId/comments
POST   /api/games/:gameId/comments
DELETE /api/games/comment/:id
```

Comments use the same public game ids as the frontend catalog.

Get comments:

```bash
curl http://localhost:3000/api/games/7/comments
```

Post a comment:

```bash
curl -X POST http://localhost:3000/api/games/7/comments \
  -H "Content-Type: application/json" \
  --cookie "token=YOUR_COOKIE" \
  -d '{"content":"Great game!","rating":5}'
```

## Wishlist And Genres

Wishlist:

```txt
GET    /api/user/wishlist
POST   /api/user/wishlist/:gameId
DELETE /api/user/wishlist/:gameId
```

Genres:

```txt
GET    /api/genres
POST   /api/genres
PUT    /api/genres/:id
DELETE /api/genres/:id
```

## Models

User:

```txt
fullname
username
email
password
avatar
role
wishlist
resetPasswordToken
resetPasswordExpires
createdAt
```

Game:

```txt
publicId
sourceId
title
description
genre
category
tags
thumbnail
rating
views
iframeUrl
source
createdAt
```

Score:

```txt
userId
gameId
score
durationSeconds
source: manual | playtime
createdAt
```

Comment:

```txt
avatar
userId
gameId
content
rating
likes
createdAt
```
