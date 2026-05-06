AUTH:
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
PUT  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password

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

COMMENTS:
GET    /api/games/:gameId/comments
POST   /api/games/:gameId/comments
DELETE /api/comments/:id


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