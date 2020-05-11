import React from 'react';
import {Link} from 'react-router-dom';
 
class Home extends React.Component {
    render() {
        var playerList = [
            { image: '/images/person.png', name: 'Player 1', position: "Forward" },
            { image: '/images/person.png', name: 'Player 2', position: "Defense" },
            { image: '/images/person.png', name: 'Player 3', position: "Mid Fielder" },
            { image: '/images/person.png', name: 'Player 4', position: "Forward" }
          ];
      return (
        <div className="App">
        <div className="wrapper">
          <div className="playerList_header">
            <h1>Players</h1>
          </div>
          <div className="playerList_home_page">
            <div className="grid-container">
              {
                playerList.map(player => {
                  return (
                    <div className="grid-item">
                      <div>
                        <img className="playerProfilePic_home_tile" key={player.image} src={player.image}></img>
                      </div>
                      <h3 key={player.name}>{player.name}</h3>
                      <span className="playerPosition_home_tile" key={player.position}>{player.position}</span>
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
  }
  export default Home;