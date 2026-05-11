
AUTH:
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
PUT  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password

### Example Usage (Postman/curl)

#### Signup
POST /api/auth/signup
Body (JSON):
```
{
  "fullname": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```
curl:
```
curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d '{"fullname":"John Doe","username":"johndoe","email":"john@example.com","password":"password123","confirmPassword":"password123"}'
```

#### Login
POST /api/auth/login
Body (JSON):
```
{
  "email": "john@example.com",
  "password": "password123"
}
```
curl:
```
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
```

GAMES:
GET    /api/games
GET    /api/games/:id
POST   /api/games
PUT    /api/games/:id
DELETE /api/games/:id

GENRES:
GET    /api/genres
POST   /api/genres
PUT    /api/genres/:id
DELETE /api/genres/:id

WISHLIST:
GET    /api/user/wishlist
POST   /api/user/wishlist/:gameId
DELETE /api/user/wishlist/:gameId


LEADERBOARD:
GET    /api/games/:gameId/leaderboard
POST   /api/games/:gameId/score

### Example Usage (Postman/curl)

#### Get Leaderboard for a Game

**Endpoint:**
```
GET /api/games/663f1b2c1234567890abcdef/leaderboard
```

**Postman:**
- Set method to GET
- URL: `http://localhost:5000/api/games/663f1b2c1234567890abcdef/leaderboard`

**curl:**
```
curl http://localhost:5000/api/games/663f1b2c1234567890abcdef/leaderboard
```

**Sample Response:**
```
{
  "gameId": "663f1b2c1234567890abcdef",
  "leaderboard": [
    {
      "username": "Player1",
      "avatar": "https://...",
      "maxScore": 1200,
      "games": 5
    },
    ...
  ]
}
```

#### Post a Score for a Game

**Endpoint:**
```
POST /api/games/663f1b2c1234567890abcdef/score
```

**Postman:**
- Set method to POST
- URL: `http://localhost:5000/api/games/663f1b2c1234567890abcdef/score`
- Body (JSON):
```
{
  "username": "Player1",
  "score": 1200
}
```

**curl:**
```
curl -X POST http://localhost:5000/api/games/663f1b2c1234567890abcdef/score \
  -H "Content-Type: application/json" \
  -d '{"username": "Player1", "score": 1200}'
```

**Sample Response:**
```
{
  "message": "Score submitted"
}
```


COMMENTS:
GET    /api/games/:gameId/comments
POST   /api/games/:gameId/comments
DELETE /api/comment/:id

### Example Usage (Postman/curl)

#### Get Comments for a Game
GET /api/games/663f1b2c1234567890abcdef/comments
curl:
```
curl http://localhost:5000/api/games/663f1b2c1234567890abcdef/comments
```

#### Post a Comment
POST /api/games/663f1b2c1234567890abcdef/comments
Body (JSON):
```
{
  "username": "johndoe",
  "content": "Great game!",
  "rating": 5
}
```
curl:
```
curl -X POST http://localhost:5000/api/games/663f1b2c1234567890abcdef/comments -H "Content-Type: application/json" -d '{"username":"johndoe","content":"Great game!","rating":5}'
```

#### Delete a Comment
DELETE /api/comment/6640a1b2c1234567890fedcb
curl:
```
curl -X DELETE http://localhost:5000/api/comment/6640a1b2c1234567890fedcb
```


## User Model

```
User {
  _id,
  email,
  password,
  name,
  avatar,
  role:"user"|"admin",
  
  wishlist: [ObjectId], // gameIds

  createdAt
}
```

👉 Why merge

- Avoid duplicate logic
- One source of truth
- Easier queries

---

## 🎮 2. Game Model

```
Game{
_id,
title,
category,
tags,
views,
iframeUrl,
thumbnail,
genreIds: [ObjectId],
description,

plays,
likes,

createdBy,// admin/user
createdAt
}

<!-- "id": 4,
    "thumbnail": "https://img.gamemonetize.com/etp56l9axninm4hfoue23ndqkvbpkho2/512x384.jpg",
    "title": "Squid Game Green Light Red Light Hints",
    "category": "Arcade",
    "tags": ["Arcade", "Casual"],
    "rating": "4.3",
    "views": "248K",
    "iframeUrl": "https://html5.gamemonetize.co/etp56l9axninm4hfoue23ndqkvbpkho2/",
    "description": "Play Squid Game Green Light Red Light Hints - Arcade game" -->
```

---

## 🏷️ 3. Genre Model

```
Genre{
_id,
name,
slug
}
```

---

## 🏆 4. Score (Leaderboard)

```
Score{
_id,
userId,
gameId,
score,
createdAt
}
```

👉 Optional optimization later:

- Add `maxScore` per user per game

---

## 💬 5. Comment Model

```
Comment{
_id,
userId,
gameId,
content,
createdAt
}
```

---

##