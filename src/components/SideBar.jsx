import React, { useEffect, useMemo, useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ genres = [], selectedGenres = [], onToggleGenre, onSelectAll }) => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [isExpanded, setIsExpanded] = useState(() => !window.matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event) => {
      setIsMobile(event.matches);
      setIsExpanded(!event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const compactMode = isMobile && !isExpanded;
  const compactGenres = useMemo(() => genres.slice(0, 3), [genres]);
  const selectedCount = selectedGenres.length;
  const compactSummary = useMemo(() => {
    if (selectedCount === 0) return "No genre filters applied";
    if (selectedCount === 1) return "1 genre filter active";
    return `${selectedCount} genre filters active`;
  }, [selectedCount]);


  return (
    <aside className={`sidebar ${compactMode ? "sidebar--compact" : ""}`}>
      <div className="sidebar-panel">
        <div className="sidebar-head">
          <h2 className="sidebar-title">Sort by</h2>
          {isMobile ? (
            <button
              type="button"
              className="sidebar-expand-toggle"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          ) : null}
        </div>

        {compactMode ? (
          <div className="sidebar-compact-summary" role="status" aria-live="polite">
            <p className="sidebar-compact-text">{compactSummary}</p>
            <div className="sidebar-compact-genres" aria-label="Quick genres">
              {compactGenres.map((genre) => {
                const isActive = selectedGenres.includes(genre);
                return (
                  <button
                    type="button"
                    key={genre}
                    className={`sidebar-compact-genre ${isActive ? "sidebar-compact-genre--active" : ""}`}
                    onClick={() => onToggleGenre?.(genre)}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="sidebar-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <p className="sidebar-label" style={{ margin: 0 }}>Genres</p>
                <button
                  type="button"
                  className="sidebar-select-all modern-btn"
                  style={{
                    padding: '6px 16px',
                    fontSize: 14,
                    borderRadius: 6,
                    border: 'none',
                    background: selectedGenres.length === genres.length ? '#e0e0e0' : 'linear-gradient(90deg, #4f8cff 0%, #38e8ff 100%)',
                    color: selectedGenres.length === genres.length ? '#888' : '#fff',
                    fontWeight: 600,
                    cursor: selectedGenres.length === genres.length ? 'not-allowed' : 'pointer',
                    boxShadow: '0 1px 4px rgba(80,120,255,0.08)',
                    transition: 'background 0.2s',
                  }}
                  onClick={onSelectAll}
                  disabled={selectedGenres.length === genres.length}
                >
                  Select All
                </button>
              </div>
              <div className="sidebar-options">
                {genres.map((genre) => (
                  <label
                    key={genre}
                    className="sidebar-option"
                  >
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => onToggleGenre?.(genre)}
                      className="sidebar-checkbox"
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>

            <div className="sidebar-section sidebar-section--optional">
              <p className="sidebar-label">Popularity</p>
              <select className="sidebar-control">
                <option>Most Played</option>
                <option>Trending</option>
                <option>New</option>
              </select>
            </div>

            <div className="sidebar-section sidebar-section--optional">
              <p className="sidebar-label">Tags</p>
              <input
                type="text"
                placeholder="e.g. multiplayer"
                className="sidebar-control"
              />
            </div>

            <div className="sidebar-section sidebar-section-last sidebar-section--optional">
              <p className="sidebar-label">Themes</p>
              <select className="sidebar-control">
                <option>All</option>
                <option>Dark</option>
                <option>Fantasy</option>
                <option>Sci-fi</option>
              </select>
            </div>
          </>
        )}

      </div>
    </aside>
  );
};

export default Sidebar;
