import React from 'react'
import SideBar from '../components/SideBar'
import GameCard from '../components/GameCard'
import './Homepage.css'

const Homepage = () => {
  const games = [
    {
      id: 1,
      title: "Cronos: The New Dawn",
      thumbnail: "/games/Cronos the new dawn.webp",
      category: "Action",
      url: "https://example.com/game1"
    },
    {
      id: 2,
      title: "Doom Eternal",
      thumbnail: "/games/Doom Eternal.webp",
      category: "Shooter",
      url: "https://example.com/game2"
    },
    {
      id: 3,
      title: "Doom: The Dark Ages",
      thumbnail: "/games/Doom the dark ages.webp",
      category: "Shooter",
      url: "https://example.com/game3"
    },
    {
      id: 4,
      title: "Dying Light",
      thumbnail: "/games/Dying light.webp",
      category: "Action",
      url: "https://example.com/game4"
    },
    {
      id: 5,
      title: "Genshin Impact",
      thumbnail: "/games/Genshin Impact.webp",
      category: "RPG",
      url: "https://example.com/game5"
    },
    {
      id: 6,
      title: "Hell is Us",
      thumbnail: "/games/HellisUS.webp",
      category: "Adventure",
      url: "https://example.com/game6"
    },
    {
      id: 7,
      title: "Hollow Knight",
      thumbnail: "/games/Hollow Knight.webp",
      category: "Platformer",
      url: "https://example.com/game7"
    },
    {
      id: 8,
      title: "Reanimal",
      thumbnail: "/games/Reanimal.webp",
      category: "Horror",
      url: "https://example.com/game8"
    },
    {
      id: 9,
      title: "Slay the Spire",
      thumbnail: "/games/Slay the Ispire.webp",
      category: "Strategy",
      url: "https://example.com/game9"
    },
    {
      id: 10,
      title: "Team Fortress",
      thumbnail: "/games/Team Fortress.webp",
      category: "Shooter",
      url: "https://example.com/game10"
    },
    {
      id: 11,
      title: "Zelda",
      thumbnail: "/games/Zelda.webp",
      category: "Adventure",
      url: "https://example.com/game11"
    },
    {
      id: 12,
      title: "Zelda 2",
      thumbnail: "/games/Zelda2.webp",
      category: "Adventure",
      url: "https://example.com/game12"
    }
  ]

  return (
    <section className="homepage-layout">
      <SideBar />

      <div className="homepage-content">
        <div className="homepage-games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
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

export default Homepage
