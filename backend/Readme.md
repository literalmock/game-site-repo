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