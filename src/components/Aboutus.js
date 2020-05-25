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
                <h3>What is so special about Us ?</h3>
                <span className="specialAboutus_data_1">We are group of people who are aged 
                between 20-60 love to play soccer everyday.We are group of people who are 
                aged between 20-60 love to play soccer everyday.
                We are group of people who are aged between 20-60 love to play soccer everyday.
                We are group of people who are aged between 20-60 love to play soccer everyday.
                We are group of people who are aged between 20-60 love to play soccer everyday.
                We are group of people who are aged between 20-60 love to play soccer everyday.
                We are group of people who are aged between 20-60 love to play soccer everyday.
                </span>
              </span> 
              <span className="col col-complementary">
              <h3>Are you keen to join us ? </h3>
              <span className="joinAboutus_data_1">
               Send your email to one of our admin person. Send your email to one of our admin person. Send your email to one of our admin person. 
               Send your email to one of our admin person. Send your email to one of our admin person. Send your email to one of our admin person. 
               Send your email to one of our admin person. Send your email to one of our admin person. Send your email to one of our admin person. 
               Send your email to one of our admin person. Send your email to one of our admin person. 
              </span>
              </span>  
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