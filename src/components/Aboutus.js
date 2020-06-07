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
                  Hey guys! If you read this blog, you
                  will know that there is a football event 
                  (see below for more information)
                  coming up in three months time!
                  We are all very excited to see what 
                  skills you have got! Dan is excited 
                  show you some futsal techniques too!
                   Unfortunately,this event can be cancelled 
                  so we need you to stay calm and hope that 
                  the next event will not go wrong.
                  #StayCovidSafe,
                  The Team
                </span>
              </span> 
              <span className="col col-complementary">
              <h3>Things you need to know: </h3>
              <span className="joinAboutus_data_1">
               Later in the year, there is a football event that 
               anyone is welcome to come to. To find more 
               information on this please contact 
               mysoccerlife@ball.com.kick
               This event will be on the 7th of november,
               once the restrictions ease. We are alerting
              you now this event may/can be cancelled,
               so if that does happen we can be prepared.
               Please be aware that if you do not check the 
               app, you will not know our desicions.
               #StayCovidSafe,
               The Team.
              </span>
              </span>  
            </div>
            <div className='app-layout'>
              <div className='box tweets'>1</div>
              <div className='box replies'>2</div>
              <div className='box search'>3</div>
              <div className='box messages'>4</div>
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