import React, { useEffect, useState } from "react";
import Axios from "axios";


const Home = () => {

  const [phoneTooltip, setPhoneTooltip] = useState({ show: false, position: "absolute" });
  const [playerList, setPlayerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get('http://localhost:8000/service/players');
        setPlayerList(res.data.players);
        setSearchResults(res.data.players);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    const results = playerList.filter(player =>
      player.name.toLowerCase().includes(searchTerm) || player.name.toUpperCase().includes(searchTerm) || player.position.toLowerCase().includes(searchTerm)
      || player.position.toUpperCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, playerList]);
  

  const displayPhoneToolTip = (userId) => e => {
    e.preventDefault();
    setPhoneTooltip(userId); // show tooltip
    setTimeout(() => {
      setPhoneTooltip(false); // remove/hide tooltip
    }, 3000);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="playerList_header">
          <h1>Players</h1>
          <label>
            <div className="playerSearch_Home">
              <div className="playerSearch_Icon">
                <img alt="" src="/images/search-image-player.jpg"></img>
              </div>
              <input type="text" className="playerSearch_Home_Input" placeholder="Search players..." value={searchTerm} onChange={handleChange} />
            </div>
          </label>
        </div>
        {!searchResults.length && (<div> <p className="noSearchData"> No results available..! </p> </div>)}
        <div className="playerList_home_page">
          <div className="grid-container">
            {
              searchResults.map(({ id, image, position, phonenumber, name }) => (
                <div key={id} className="grid-item">
                  <div>
                    <img alt="" className="playerProfilePic_home_tile" key={image} src={image}></img>
                  </div>
                  <div className="playerProfile_grid_border">
                    <span className="rec_name_position_data">
                      <h3 key={name}>{name}</h3>
                      <span className="playerPosition_home_tile" key={position}>{position}</span>
                    </span>
                  </div>
                  <span className="phoneNumber_home">
                    <img src="/images/phone.png" alt={"phoneTooltip.show"} key={id} name="phoneNumberhomeicon" onClick={displayPhoneToolTip(id)} />
                  </span>
                  {phoneTooltip === id && (
                    <div className="tooltip_PhoneNumber_home" key={phonenumber}>{phonenumber}</div>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;