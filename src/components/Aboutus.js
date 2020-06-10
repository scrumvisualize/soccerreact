import React, { useRef, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import * as moment from 'moment'
import Axios from "axios";

const Aboutus = () => {

  const [newDetails, setNewsDetails] = useState({ _id: '', newstitle: '', newsdetails: ''})
  const [displaynewsDetails, setShowNewsDetails] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [showNewsSection, setShowNewsSection] = useState({ show: false });
  const [helperText, setHelperText] = useState('');
  const loginUserEmail = localStorage.getItem('loginEmail');
  const { handleSubmit, register, errors } = useForm();
  const thankYouMessage = <p>Thank you for your input!</p>
  const form = <form>...</form>
  const privilege = localStorage.getItem('Privilege');
  const [isError, setIsError] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  useEffect(()=>{
    displayNewsSection(privilege);
  },[]);

  const onChange = (e) => {
    e.persist();
    setNewsDetails({ ...newDetails, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          email: loginUserEmail,
        };
        const res = await Axios.get('http://localhost:8000/service/news', {params});
        if (isMounted.current) {
          setShowNewsDetails(res.data.newsdetails);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  
  const onSubmit = () => {
    const newsData = async () => {
      try {
        const params = {
          email: loginUserEmail,
        };
        const res = await Axios.post('http://localhost:8000/service/news', newDetails, {params}); 
        console.log("News post message:" + res.data.success);
        if (res.data.success) {
          setNewsDetails({newstitle: '', newsdetails: ''});
          setIsSent(true);
          
        }
        else {
          console.log(res.data.message);
          setHelperText(res.data.message);
        }
      } catch (e) {
        setHelperText(e.response.data.message);
      }
    }
    newsData();
  }

  const displayNewsSection = (privilege) => {
    if (privilege === "ADMIN") {
      setShowNewsSection({ show: true })
    } else {
      setShowNewsSection({ show: false })
    }
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
              <span className="col col-newsarea">
                <h3>Recent News:</h3>
                {
                displaynewsDetails.map(( {id, newstitle, newsdetails , createdAt} ) => (
                <span  key={id} className="newsPlace">
                  <span className="dateAndTimeDisplay" key={createdAt}><b>{moment(createdAt).format('DD/MM/YYYY, h:mm')}</b></span>
                  <b key={newstitle}>{newstitle}</b><br/><br/>
                  <span className="newsContent" key={newsdetails}>{newsdetails}</span>
                </span>
                ))
                }
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
              <h3>Things you need to know:</h3>
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
            {
            showNewsSection.show && (
            <div className="layout">
              <span className="addTeamNews">
                <h3>Enter team news !</h3>
                <span className="specialAboutus_data_1">
                  <form onSubmit={handleSubmit(onSubmit)} className="myFormAbouts">
                    <div className="newsfillContentDiv formElement">
                      <label>
                        <input name="newstitle"  className="inputRequest formContentElement" type="text" placeholder="title" 
                        onChange={onChange}
                        minLength={4}
                        maxLength={50}
                        ref={register({
                          required: "News title is required !"
                        })}
                        />
                        <span className="newsErrorTextFormat">{errors.newstitle && errors.newstitle.message}</span>
                      </label>
                      <label>
                        <textarea name="newsdetails" className="inputRequest formContentElement" type="textarea"  placeholder="news details" 
                        onChange={onChange}
                        minLength={10}
                        maxLength={1200}
                        ref={register({
                          required: "News details is required !"
                        })}
                        />
                        <span className="newsErrorTextFormat">{errors.newsdetails && errors.newsdetails.message}</span>
                      </label>
                    </div>
                    <div className="loginsubmitButtonDiv formElement" style={{ margin: isError ? '50px 0 20px 0' : '20px 0 20px 0' }}>
                        <button type="submit" className="submitButton">Save</button>
                    </div>
                  </form>
                </span>
                <label>
                  <span className="newsValidationText">{helperText}</span>
                </label>
              </span> 
              <span className="col col-complementary">
              <h3>Successfull Message: </h3>
              <span className="joinAboutus_data_1">
                 {isSent ? thankYouMessage : form }
              </span>  
              </span>  
            </div>   
              )}
          </div>
          )
}

export default Aboutus;