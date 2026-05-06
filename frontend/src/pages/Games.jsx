import React, { useEffect, useMemo, useRef, useState } from 'react'
import SideBar from '../components/SideBar.jsx'
import GameCard from '../components/GameCard.jsx'
import './Games.css'
import viewerGames from '../utils/viewerGames.js'
import { useSearchParams } from 'react-router-dom'

const ITEMS_PER_PAGE = 12

const Games = () => {
  const [searchParams] = useSearchParams()
  const [selectedGenres, setSelectedGenres] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const contentRef = useRef(null)

  const genres = useMemo(
    () => [...new Set(viewerGames.map((game) => game.category))].sort(),
    [],
  )
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

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
    if (selectedGenres.length === 0) return viewerGames

    return viewerGames.filter((game) => selectedGenres.includes(game.category))
  }, [selectedGenres])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredGames.length / ITEMS_PER_PAGE)),
    [filteredGames.length],
  )

  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredGames.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredGames, currentPage])

  useEffect(() => {
    setCurrentPage(1)
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [selectedGenres])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre],
    )
  }

  const handleSelectAllGenres = () => {
    if (selectedGenres.length === genres.length) {
      setSelectedGenres([]);
    } else {
      setSelectedGenres(genres);
    }
  };

  const handlePageChange = (nextPage) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages)
    setCurrentPage(safePage)

    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <section className="homepage-layout games-page-layout">
        <SideBar
          genres={genres}
          selectedGenres={selectedGenres}
          onToggleGenre={toggleGenre}
          onSelectAll={handleSelectAllGenres}
        />

        <div className="homepage-content games-page-content" ref={contentRef}>
          <section className="homepage-section">
            <div className="homepage-section-head">
              <h2 className="homepage-section-title">All Games</h2>
              <p className="homepage-section-subtitle">
                {filteredGames.length} title{filteredGames.length > 1 ? 's' : ''} · Page {currentPage} of {totalPages}
              </p>
            </div>

            <div className="homepage-games-grid">
              {paginatedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        </div>
      </section>

      {totalPages > 1 ? (
        <div className="games-pagination-shell">
          <nav className="games-pagination" aria-label="Games pagination">
            <button
              type="button"
              className="games-pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1
              const isActive = page === currentPage

              return (
                <button
                  key={page}
                  type="button"
                  className={`games-pagination-btn ${isActive ? 'games-pagination-btn--active' : ''}`}
                  onClick={() => handlePageChange(page)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            })}

            <button
              type="button"
              className="games-pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        </div>
      ) : null}
    </>
  )
}

export default Games
