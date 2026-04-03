import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = ["Action", "Shooter", "RPG", "Adventure", "Strategy"];

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-panel">

        <h2 className="sidebar-title">
          Sort by
        </h2>

        <div className="sidebar-section">
          <p className="sidebar-label">Genres</p>

          <div className="sidebar-options">
            {genres.map((genre) => (
              <label
                key={genre}
                className="sidebar-option"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                  className="sidebar-checkbox"
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Popularity</p>
          <select className="sidebar-control">
            <option>Most Played</option>
            <option>Trending</option>
            <option>New</option>
          </select>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Tags</p>
          <input
            type="text"
            placeholder="e.g. multiplayer"
            className="sidebar-control"
          />
        </div>

        <div className="sidebar-section sidebar-section-last">
          <p className="sidebar-label">Themes</p>
          <select className="sidebar-control">
            <option>All</option>
            <option>Dark</option>
            <option>Fantasy</option>
            <option>Sci-fi</option>
          </select>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
