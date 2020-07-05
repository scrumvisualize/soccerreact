import React, { useRef, useEffect, useState } from "react";
import axios from 'axios'
import DailyStatusDialog from "../modal/DailyStatus";
import Button from "@material-ui/core/Button";
import * as moment from 'moment';



const Availability = () =>{
  
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [playerId, setPlayerId] = useState("");
    const [helperText, setHelperText] = useState('');
    const loginUserEmail = localStorage.getItem('loginEmail');
    const [dailyStatusPlayers, setDailyStatusPlayers] = useState([]);
    const [teamData, setTeamData] = useState([]);
    //const [dailyinput, setDailyInput] = useState('');
    const [inCount, setInCount] = useState([]);
    const isMounted = useRef(false);
    const c_day = moment().format('dddd');
    const c_date = moment().format('DD-MM-YYYY');

    useEffect(() => {
      isMounted.current = true;
      return () => isMounted.current = false;
    }, []);

    const displayAvailabilityStatus = () =>{
       setDeleteDialog(true);
    }
     
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get('http://localhost:8000/service/availability');
            if (isMounted.current) {
               const dailyStatus = res.data.dailyStatus[0];
               console.log(dailyStatus);
              // Only use the first index of the duplicate arrays
              setDailyStatusPlayers(dailyStatus);
              console.log(dailyStatus);
              setTeamData(dailyStatus);
              setTeams(dailyStatus);
              setCount(dailyStatus);
            }
          } catch (e) {
            console.log(e);
          }
        }
        fetchData();
      }, []);

  const setTeams = data => {
    let lastTeamSelected = 1;
    const tempTeam1 = [];
    const tempTeam2 = [];
    let copyOfTeamData = [...data];

    while (copyOfTeamData.length) {

      const random = Math.floor(Math.random() * copyOfTeamData.length);

      lastTeamSelected === 1
        ? tempTeam1.push(copyOfTeamData[random])
        : tempTeam2.push(copyOfTeamData[random]);

      copyOfTeamData = [
        ...copyOfTeamData.slice(0, random),
        ...copyOfTeamData.slice(random + 1)
      ];
      lastTeamSelected = (lastTeamSelected + 1) % 2;
     
    }
    //setTeam1(tempTeam1);
    //setTeam2(tempTeam2);
    setTeam1(tempTeam1.filter(status => status.dailystatus === "in"));
    setTeam2(tempTeam2.filter(status => status.dailystatus === "in"));
  };

  const setCount = data =>{
    setInCount(data.filter(e => e.dailystatus === "in").length);
  }
   
    const onSubmit = (dailyinput) =>{
        console.log("Here Daily:"+ dailyinput);
        const dailyStatus = async () => {
            try {
                const params = {
                    email: loginUserEmail,
                };
              const res = await axios.post('http://localhost:8000/service/availability', { dailystatus: dailyinput }, {params} );
              console.log("Dailystatus Insert:" + res.data.success);
              if (res.data.success) {
                setDeleteDialog(false);
              }
              else {
                console.log(res.data.message);
                setHelperText(res.data.message);
              }
            } catch (e) {
              setHelperText(e.response.data.message);
            }
          }
          dailyStatus();
    }

    const onUpdate = (dailyinput) =>{
      console.log("Here Daily:"+ dailyinput);
      const dailyStatus = async () => {
          try {
              const params = {
                  email: loginUserEmail,
              };
            const res = await axios.put('http://localhost:8000/service/availability', { dailystatus: dailyinput }, {params} );
            console.log("Dailystatus update:" + res.data.success);
            if (res.data.success) {
              setDeleteDialog(false);
              window.location.reload(true) 
            }
            else {
              console.log(res.data.message);
              setHelperText(res.data.message);
            }
          } catch (e) {
            setHelperText(e.response.data.message);
          }
        }
        dailyStatus();
  }

    return (
        <div className="availability_wrapper">
          <div className="displayCurrentDate">
            <b>{c_day}</b>, {c_date}
          </div>
    <h4><span className="displayInCount">{inCount}</span></h4>
            <div className="wrap">
                <div className="container">
                    <div className="dailystatus_section">
                        <span className="playerdailyrecord">
                             <h4>Player Daily Status</h4>
                            <div className="row">
                                {
                                dailyStatusPlayers.map(({id, photo, position, dailystatus}) =>(
                                <div key={id} className="playerdailyrecord_main">
                                <span className="dailstatus_playerphoto"><img className="dailstatus_playerImage" key={photo} src={photo}></img></span>
                                <span className="dailstatus" key={dailystatus}>{dailystatus}</span>
                                <span className="dailstatus_playerposition" key={position}>{position}</span>
                                </div>
                                ))        
                                }
                            </div>
                            <button className="OverlayDailyStatus" onClick={displayAvailabilityStatus}>Enter</button>
                        </span>
                    </div>
                    <label>
                      <span className="availabilityErrorText">{helperText}</span>
                    </label>
                </div>
                <div>
                    <div className="container">
                        <div className="playerdistribution_section">
                            <h4>Team Selection</h4>
                            <div className="wrap">
                                    <div className="left_col">
                                        {
                                          team1.map(({id, photo, position}) =>(
                                          <div key={id} className="row">
                                            <div key={id} className="playerteamrecord_main">
                                              <img className="teamAPhoto" key={photo} src={photo}></img>
                                              <span className="teamAposition" key={position}>{position}</span>
                                              </div>
                                          </div>
                                          ))
                                      }
                                    </div>
                                    <div className="right_col">
                                        {
                                          team2.map(({id, photo, position})=>(
                                          <div key={id} className="row">
                                            <div key={id} className="playerteamrecord_two">
                                              <img className="teamBPhoto" key={photo} src={photo}></img>
                                              <span className="teamBposition" key={position}>{position}</span>
                                              </div>
                                          </div>
                                          ))
                                        }
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="weeklycount_graph_section">
                                <span className="avail_newImageback">
                                  <img className="avail_newsImagesection" src="images/greenplayer.png"></img>         
                              </span>
                        </div>
                    </div>
                </div>
            </div>
            <DailyStatusDialog
              onSubmit={onSubmit}
              onUpdate={onUpdate}
              open={deleteDialog}
              onClose={() => setDeleteDialog(false)}
            />
        </div>
    );

}
export default Availability;