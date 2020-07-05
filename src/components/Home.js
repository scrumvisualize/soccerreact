import React, { useRef, useEffect, useState } from "react";
import AlertDialog from "../modal/Dialog";
import Axios from "axios";


const Home = () => {

  const [phoneTooltip, setPhoneTooltip] = useState({ show: false, position: "absolute" });
  const [playerList, setPlayerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [deleteIcon, setDeleteIcon] = useState({ show: false });
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [playerId, setPlayerId] = useState("");
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);


  const handleChange = event => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);


  useEffect(() => {
    setTimeout ( () => {
    const fetchData = async () => {
      try {
        const res = await Axios.get('http://localhost:8000/service/players');
        if (isMounted.current) {
          setPlayerList(res.data.players);
          setSearchResults(res.data.players);
          const privilege = localStorage.getItem('Privilege');
          console.log("What is getting in Front End:" + privilege);
          showDeleteIcon(privilege);
          setIsLoading(false);
        }
      } catch (e) {
        if (isMounted.current) {
          setIsLoading(false);
        }
        console.log(e);
      }
    }
    fetchData();
    }, 1500);
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
    }, 4000);
  };

  const showDeleteIcon = (privilege) => {
    if (privilege === "ADMIN") {
      setDeleteIcon({ show: true })
    } else {
      setDeleteIcon({ show: false })
    }
  }
  const deletePlayer = (id) => e => {
    setPlayerId(id);
    setDeleteDialog(true);
  }

  const onDelete = id => () => {
    try {
      Axios.delete('http://localhost:8000/service/player', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'id': id
        }
      });
      setDeleteDialog(false);
      const restOfPlayerResults = searchResults.filter((result) => result.id !== id)
      setSearchResults(restOfPlayerResults);
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div className="App">
      <div className="wrapper">
        <div className="bannerImage">
            <img className="bannerTopImage" src="/images/players.png"></img>
        </div>
        <div className="playerList_header">
          <h2>Players</h2>
          <label>
            <div className="playerSearch_Home">
              <div className="playerSearch_Icon">
                <img alt="" src="/images/search-image-player.jpg"></img>
              </div>
              <input type="text" className="playerSearch_Home_Input" placeholder="Search players..." value={searchTerm} onChange={handleChange} />
            </div>
          </label>
        </div>
        <div>
        {!searchResults.length && !isLoading && (<div> <p className="noSearchData"> Does not match any results! </p> </div>)}
        <div className="playerList_home_page">
        {isLoading ? (
        <div className="loader">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      ) : (
          <div className="grid-container">
            {
              searchResults.map(({ id, photo, position, phonenumber, name }) => (
                <div key={id} className="grid-item">
                  {
                    deleteIcon.show && (
                      <span className="deletePlayerButton" onClick={deletePlayer(id)}>
                        <img className="deletePlayerimg" src="/images/delete.png"></img>
                      </span>
                    )}
                  <div>
                    <img alt="" className="playerProfilePic_home_tile" key={photo} src={photo}></img>
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
         )}
        </div>
       </div> 
      </div>
      <AlertDialog
        onDelete={onDelete}
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        playerId={playerId}
      />
    </div>
  );
}

export default Home;