import { useEffect, useMemo, useState } from 'react'
import './Leaderboard.css'

const SAMPLE_ENTRIES = [
  { id: 'gv-1', name: 'NovaStriker', country: 'IN', games: 142, wins: 91, score: 24850, streak: 7 },
  { id: 'gv-2', name: 'PixelViper', country: 'US', games: 128, wins: 78, score: 23110, streak: 4 },
  { id: 'gv-3', name: 'ArcadeWarden', country: 'DE', games: 156, wins: 86, score: 21940, streak: 3 },
  { id: 'gv-4', name: 'NeonKite', country: 'BR', games: 111, wins: 60, score: 19870, streak: 2 },
  { id: 'gv-5', name: 'ZenRunner', country: 'JP', games: 97, wins: 58, score: 18730, streak: 5 },
  { id: 'gv-6', name: 'FrostByte', country: 'CA', games: 120, wins: 62, score: 17620, streak: 1 },
  { id: 'gv-7', name: 'HyperMango', country: 'GB', games: 88, wins: 44, score: 16590, streak: 2 },
  { id: 'gv-8', name: 'RiftSage', country: 'FR', games: 104, wins: 51, score: 15840, streak: 0 },
  { id: 'gv-9', name: 'EchoNexus', country: 'AU', games: 76, wins: 35, score: 14910, streak: 1 },
  { id: 'gv-10', name: 'SableSpark', country: 'SE', games: 69, wins: 31, score: 14180, streak: 0 },
]

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('weekly')
  const [query, setQuery] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const entries = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    const filtered = normalized
      ? SAMPLE_ENTRIES.filter((entry) => entry.name.toLowerCase().includes(normalized))
      : SAMPLE_ENTRIES

    const scored = filtered.map((entry) => {
      const multiplier = timeframe === 'daily' ? 0.65 : timeframe === 'monthly' ? 1.15 : 1
      return {
        ...entry,
        effectiveScore: Math.round(entry.score * multiplier),
      }
    })

    scored.sort((a, b) => b.effectiveScore - a.effectiveScore)

    return scored.map((entry, index) => ({
      ...entry,
      rank: index + 1,
      winRate: entry.games > 0 ? Math.round((entry.wins / entry.games) * 100) : 0,
    }))
  }, [query, timeframe])

  const topThree = entries.slice(0, 3)
  const rest = entries.slice(3)
  const maxScore = entries.reduce((max, entry) => Math.max(max, entry.effectiveScore), 0) || 1

  return (
    <section className="leaderboard-shell">
      <header className="leaderboard-head">
        <div className="leaderboard-head-copy">
          <p className="label-xs">Competitive</p>
          <h1 className="heading-lg leaderboard-title">Leaderboard</h1>
          <p className="text-body leaderboard-subtitle heading-paragraph-gap">
            Climb the ranks with wins, streaks, and high scores across the Gameverse.
          </p>
        </div>

        <div className="leaderboard-controls" aria-label="Leaderboard filters">
          <div className="leaderboard-segment" role="group" aria-label="Timeframe">
            <button
              type="button"
              className={`leaderboard-segment-btn ${timeframe === 'daily' ? 'is-active' : ''}`}
              onClick={() => setTimeframe('daily')}
            >
              Daily
            </button>
            <button
              type="button"
              className={`leaderboard-segment-btn ${timeframe === 'weekly' ? 'is-active' : ''}`}
              onClick={() => setTimeframe('weekly')}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`leaderboard-segment-btn ${timeframe === 'monthly' ? 'is-active' : ''}`}
              onClick={() => setTimeframe('monthly')}
            >
              Monthly
            </button>
          </div>

          <label className="leaderboard-search">
            <span className="leaderboard-search-label">Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Player name"
              className="leaderboard-search-input"
              type="search"
            />
          </label>
        </div>
      </header>

      <section className="leaderboard-podium" aria-label="Top players">
        {topThree.map((entry) => {
          const intensity = clamp(entry.effectiveScore / maxScore, 0.15, 1)
          return (
            <article
              key={entry.id}
              className={`leaderboard-podium-card leaderboard-podium-card--rank-${entry.rank}`}
              style={{ ['--lb-intensity']: intensity }}
            >
              <div className="leaderboard-podium-badge" aria-label={`Rank ${entry.rank}`}>
                #{entry.rank}
              </div>
              <div className="leaderboard-podium-main">
                <div className="leaderboard-avatar" aria-hidden="true">
                  {entry.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="leaderboard-podium-meta">
                  <p className="leaderboard-player">{entry.name}</p>
                  <p className="leaderboard-player-sub">
                    <span className="leaderboard-pill">{entry.country}</span>
                    <span className="leaderboard-pill">{entry.winRate}% win</span>
                    <span className="leaderboard-pill">{entry.streak} streak</span>
                  </p>
                </div>
              </div>
              <div className="leaderboard-score-row">
                <p className="leaderboard-score">
                  {entry.effectiveScore.toLocaleString()}
                  <span className="leaderboard-score-unit">pts</span>
                </p>
                <div className="leaderboard-bar" aria-hidden="true">
                  <span className="leaderboard-bar-fill" style={{ width: `${(entry.effectiveScore / maxScore) * 100}%` }} />
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="leaderboard-table-wrap" aria-label="Leaderboard table">
        <div className="leaderboard-table-head">
          <p className="heading-md">All Ranks</p>
          <p className="text-muted leaderboard-table-note">{entries.length} players</p>
        </div>

        <div className="leaderboard-table" role="table" aria-label="Leaderboard">
          <div className="leaderboard-row leaderboard-row--header" role="row">
            <div className="leaderboard-cell leaderboard-cell--rank" role="columnheader">Rank</div>
            <div className="leaderboard-cell leaderboard-cell--player" role="columnheader">Player</div>
            <div className="leaderboard-cell leaderboard-cell--wins" role="columnheader">Wins</div>
            <div className="leaderboard-cell leaderboard-cell--rate" role="columnheader">Win rate</div>
            <div className="leaderboard-cell leaderboard-cell--score" role="columnheader">Score</div>
          </div>

          {rest.length === 0 ? (
            <div className="leaderboard-empty" role="row">
              No players match your search.
            </div>
          ) : (
            rest.map((entry) => (
              <div key={entry.id} className="leaderboard-row" role="row">
                <div className="leaderboard-cell leaderboard-cell--rank" role="cell">
                  <span className="leaderboard-rank">#{entry.rank}</span>
                </div>
                <div className="leaderboard-cell leaderboard-cell--player" role="cell">
                  <span className="leaderboard-player-inline">{entry.name}</span>
                  <span className="leaderboard-player-inline-sub">{entry.country} • {entry.games} games</span>
                </div>
                <div className="leaderboard-cell leaderboard-cell--wins" role="cell">{entry.wins}</div>
                <div className="leaderboard-cell leaderboard-cell--rate" role="cell">{entry.winRate}%</div>
                <div className="leaderboard-cell leaderboard-cell--score" role="cell">
                  <div className="leaderboard-score-stack">
                    <span className="leaderboard-score-mini">{entry.effectiveScore.toLocaleString()}</span>
                    <span className="leaderboard-mini-bar" aria-hidden="true">
                      <span
                        className="leaderboard-mini-bar-fill"
                        style={{ width: `${(entry.effectiveScore / maxScore) * 100}%` }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  )
}

export default Leaderboard

