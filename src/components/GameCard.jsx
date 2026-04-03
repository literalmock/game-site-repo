import React from 'react'
import './GameCard.css'

const GameCard = ({ game }) => {
  return (
    <a
      href={game.url}
      target="_blank"
      rel="noreferrer"
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
        <p className="game-card-category">{game.category}</p>
      </div>
    </a>
  )
}

export default GameCard
