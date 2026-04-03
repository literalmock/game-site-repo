import React from 'react'

const GameCard = ({ game }) => {
  return (
    <a
      href={game.url}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1"
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-slate-700">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {game.title}
        </h3>
        <p className="mt-2 text-xs text-gray-400">{game.category}</p>
      </div>
    </a>
  )
}

export default GameCard
