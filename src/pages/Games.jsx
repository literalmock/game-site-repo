import React, { useEffect, useMemo, useState } from 'react'
import SideBar from '../components/SideBar.jsx'
import GameCard from '../components/GameCard.jsx'
import './Games.css'
import { games } from '../utils/game.js'
import { useSearchParams } from 'react-router-dom'

const Games = () => {
  const [searchParams] = useSearchParams()
  const [selectedGenres, setSelectedGenres] = useState([])

  const genres = useMemo(
    () => [...new Set(games.map((game) => game.category))].sort(),
    [],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    const requestedGenre = (searchParams.get('genre') || '').trim()

    if (!requestedGenre) {
      return
    }

    const matchedGenre = genres.find(
      (genre) => genre.toLowerCase() === requestedGenre.toLowerCase(),
    )

    if (matchedGenre) {
      setSelectedGenres([matchedGenre])
    }
  }, [searchParams, genres])

  const filteredGames = useMemo(() => {
    if (selectedGenres.length === 0) return games

    return games.filter((game) => selectedGenres.includes(game.category))
  }, [selectedGenres])

  const featuredGames = useMemo(() => filteredGames.slice(0, 4), [filteredGames])

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre],
    )
  }

  return (
    <section className="homepage-layout">
      <SideBar
        genres={genres}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
      />

      <div className="homepage-content">
        <section className="homepage-section">
          <div className="homepage-section-head">
            <h2 className="homepage-section-title">Featured Games</h2>
            <p className="homepage-section-subtitle">based on current filters</p>
          </div>

          <div className="homepage-featured-grid">
            {featuredGames.map((game) => (
              <GameCard key={`featured-${game.id}`} game={game} />
            ))}
          </div>
        </section>

        <section className="homepage-section">
          <div className="homepage-section-head">
            <h2 className="homepage-section-title">All Games</h2>
            <p className="homepage-section-subtitle">{filteredGames.length} titles</p>
          </div>

        <div className="homepage-games-grid">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        </section>
      </div>
    </section>
    
    // <section className="space-y-4">
    //   <div className="flex items-center justify-between">
    //     <h2 className="text-2xl font-bold">All Games</h2>
    //     <p className="text-sm opacity-70">{games.length} titles</p>
    //   </div>

    //   <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    //     {games.map((game) => (
    //       <a
    //         key={game.id}
    //         href={game.url}
    //         target="_blank"
    //         rel="noreferrer"
    //         className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    //       >
    //         <figure className="aspect-[3/4] w-full bg-base-200">
    //           <img src={game.thumbnail} alt={game.title} className="h-full w-full object-cover" />
    //         </figure>
    //         <div className="p-3">
    //           <h3 className="line-clamp-2 text-sm font-semibold">{game.title}</h3>
    //           <p className="mt-1 text-xs opacity-70">{game.category}</p>
    //         </div>
    //       </a>
    //     ))}
    //   </div>
    // </section>
  )
}

export default Games
