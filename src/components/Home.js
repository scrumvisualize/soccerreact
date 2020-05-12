import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const playerList = [
  { image: '/images/person.png', name: 'Player 1', position: "Forward" },
  { image: '/images/person.png', name: 'Player 2', position: "Defense" },
  { image: '/images/person.png', name: 'Player 3', position: "Mid Fielder" },
  { image: '/images/person.png', name: 'Player 4', position: "Forward" }
];


const Home = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = playerList.filter(player =>
      player.name.toLowerCase().includes(searchTerm) || player.position.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="playerList_header">
          <h1>Players</h1>
          <label>
            <div className="playerSearch_Home">
              <div className="playerSearch_Icon">
                <img src="/images/search-image-player.jpg"></img>
              </div>
              <input type="text" className="playerSearch_Home_Input" placeholder="Search players..." value={searchTerm} onChange={handleChange} />
            </div>
          </label>
        </div>
        <div className="playerList_home_page">
          <div className="grid-container">
            {
              searchResults.map(player => {
                return (
                  <div className="grid-item">
                    <div>
                      <img className="playerProfilePic_home_tile" key={player.image} src={player.image}></img>
                    </div>
                    <div className="playerProfile_grid_border">
                      <h3 key={player.name}>{player.name}</h3>
                      <span className="playerPosition_home_tile" key={player.position}>{player.position}</span>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;