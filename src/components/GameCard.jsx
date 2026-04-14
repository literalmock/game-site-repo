import React from 'react'
import { Link } from 'react-router-dom'
import './GameCard.css'

const GameCard = ({ game }) => {
  return (
    <Link
      to={`/games/${game.id}`}
      state={{ game }}
      className="game-card"
    >
      <div className="game-card-media">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="game-card-image"
        />
      </div>
      <div className="game-card-content">
        <h3 className="game-card-title">
          {game.title}
        </h3>
        <p className="game-card-description">
          {game.description}
        </p>
        <p className="game-card-category">{game.category}</p>
      </div>
    </Link>
  )
}

export default GameCard
