import React, { useEffect, useState } from "react";
import Axios from "axios";

const Aboutus = () => {

  const [newsTitle, setNewsTitle]=useState([]);
  const [newsDetails, setNewsDetails]=useState([]);
  const [isSent, setIsSent] = useState(false);

  const thankYouMessage = <p>Thank you for your input!</p>
  const form = <form>...</form>

  const handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/service/news', {
      method: 'POST',
      body: JSON.stringify({ newsTitle, newsDetails })
    }).then(() => setIsSent(true))
    setNewsTitle('');
    setNewsDetails('');
  }
  return (
          <div className="container">
            <div className="middlerrowData">
              <img></img>
            </div>
            <div className="layout">
              <span className="col col-main">
              <img alt="" src="/images/image-1.jpg"></img>
              </span> 
              <span className="col col-complementary">
                <h3>Recent News:</h3>
                <span className="newsPlace">
                  <b>{newsTitle}</b><br/>
                  <span>{newsDetails}</span>
                </span>
                <span className="newsPlace">Add some news </span>
              </span>  
              
            </div>   
            <div className="layout">
              <span className="col col-main">
                <h3>What is going on?</h3>
                <span className="specialAboutus_data_1">
                  Hey guys! Here is an update on what is happening
                  around here. We've just got a new player called
                  Hannah! Also in bad news, our eldest member Phil has 
                  just broken his leg. Because of the Covid-19 situations 
                  we regret to inform you that this football season
                  will not proceed until further notice.
                  Phil would like you to know that he is on his way
                  to recovery just like us! #StayCovidSafe!
                </span>
              </span> 
              <span className="col col-complementary">
              <h3>Benefits of Joining Us </h3>
              <span className="joinAboutus_data_1">
               The benefits of joining us are the various
               family events and socializing that you can enjoy.
               If you are a member you don't have to pay for one 
               whole month! In addition to that you will get a woolworths 
               $250 dollar gift card! Join now to be a member!
              </span>
              </span>  
            </div>
            <div className='app-layout'>
              <div className='box tweets'>1</div>
              <div className='box replies'>2</div>
              <div className='box search'>3</div>
              <div className='box messages'>4</div>
            </div>
            <div className="layout">
              <span className="col col-main">
                <h3>Add news here ?</h3>
                <span className="specialAboutus_data_1">
                  <form onSubmit={handleSubmit} className="myForm">
                    <div className="loginfillContentDiv formElement">
                      <label>
                        <input name="newstitle"  className="inputRequest formContentElement" type="text"  value={newsTitle} placeholder="Title" 
                        onChange={e => setNewsTitle(e.target.value)}/>
                      </label>
                      <label>
                        <textarea name="newsdetails" className="inputRequest formContentElement" type="textarea" value={newsDetails} placeholder="News details" 
                        onChange={e => setNewsDetails(e.target.value)}/>
                      </label>
                    </div>
                    <div className="loginsubmitButtonDiv formElement">
                        <button type="submit" className="submitButton">Save</button>
                    </div>
                  </form>
                </span>
              </span> 
              <span className="col col-complementary">
              <h3>Successfull Message: </h3>
              <span className="joinAboutus_data_1">
                 {isSent ? thankYouMessage : form }
              </span>  
              </span>  
            </div>     
          </div>
          )
}

export default Aboutus;