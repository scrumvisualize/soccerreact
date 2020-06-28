import React, { useRef, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import * as moment from 'moment'
import Axios from "axios";


const Aboutus = () => {
  
  const [newDetails, setNewsDetails] = useState({ _id: '', newstitle: '', newsdetails: ''})
  const [displaynewsDetails, setShowNewsDetails] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [showNewsSection, setShowNewsSection] = useState({ show: false });
  const [newsdeleteBtn, setNewsDeleteBtn] = useState({ show: false });
  const [helperText, setHelperText] = useState('');
  const loginUserEmail = localStorage.getItem('loginEmail');
  const { handleSubmit, register, errors, reset } = useForm();
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
    displayNewsDeleteBtn(privilege);
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
          setIsSent(true); 
          reset();
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

  const displayNewsDeleteBtn = (privilege) =>{
    if (privilege === "ADMIN") {
      setNewsDeleteBtn({ show: true })
    } else {
      setNewsDeleteBtn({ show: false })
    }
  }
  const handleClick = (id) =>{
    try {
      Axios.delete('http://localhost:8000/service/news', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          'id': id
        }
      });
      const restOfNewsResults = displaynewsDetails.filter((result) => result.id !== id)
      setShowNewsDetails(restOfNewsResults);
    } catch (e) {
      console.log(e);
    }
  }

  return (
          <div className="container">
            <div className="middlerrowData">
              <img></img>
            </div>
            <div className="layout">
              <span className="col col-main">
              <img className="leftsideTopYellowImage" alt="" src="/images/topImage.jpg"></img>
              </span> 
              <span className="col col-newsarea"> 
              <h3 className="updatesHeader">&#9917; Updates !</h3>
                {
                displaynewsDetails.map(( {id, newstitle, newsdetails , createdAt} ) => (
                <span  key={id} className="newsPlace">
                  <span className="dateAndTimeDisplay" key={createdAt}><b>{moment(createdAt).format('DD/MM/YYYY, HH:mm')}</b></span>
                  <b key={newstitle}>{newstitle}</b><br/><br/>
                  <span className="newsContent" key={newsdetails}>{newsdetails}</span>
                  { 
                    newsdeleteBtn.show && (
                    <div className="container">
                      <img alt="Delete" className="deleteNewsImg" src="images/deletenews.png" onClick={() => handleClick(id)}></img>
                    </div>
                  )}
                </span>
                ))
                }
              </span>  
            </div>   
            <div className="layout">
              <span className="col col-main">
                <h3>What is going on?</h3>
                <span className="specialAboutus_data_1">
                  Hey guys! If you didn't know there is a 
                  new online kids program for football!
                  We have been noticing that there is a little
                  problem with the software as the login doesn't 
                  let you in. To improve the software we are 
                  letting you know that we would like some time 
                  to let the tech team have some time to fix
                  this issue. Bye for now!
                  The Team
                </span>
              </span> 
              <span className="col col-complementary">
              <h3>Things you need to know:</h3>
              <span className="joinAboutus_data_1">
                  Later in the year, there is a football event that 
                  anyone is welcome to come to. To find more 
                  information on this please contact 
                  mysoccer@ball.com.kick
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
            <h2>Core <span>Team:</span></h2>
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
              <h3>&#128154; Message: </h3>
              <span className="joinAboutus_data_1">
                 {isSent ? thankYouMessage : form }
              </span>  
              
              </span>  
            </div>   
              )}
              <span className="newImageback">
               <img className="newsImagesection" src="images/blazecut.png"></img>         
              </span>
              <section id="services" className="services">
                <div className="sectioncontainer">
                  <div className="row">
                    <div className="section-title">
                      <h2>Our <span>Interests</span></h2>
                      <span className="heading-line"></span> </div>
                    <div className="service-callouts">
                      <div className="col-sm-6 col-md-4">
                        <div className="services-box">
                          <div className="services-iconbox"><i className="lnr lnr-eye"></i></div>
                          <h2>Weekend Soccer</h2>
                          <p>Soccer is just not a game for us. Its a part of our life. We co-ordinate among ourselves and play soccer during week end.</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4" data-wow-delay="0.3s">
                        <div className="services-box">
                          <div className="services-iconbox"><i className="lnr lnr-location"></i></div>
                          <h2>Soccer Matches</h2>
                          <p>We are keen to play 7-a side, 11-a side matches this year. Talk to us we will respond ! <a href="url">http://southsidesoccer.com.au</a></p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4" data-wow-delay="0.5s">
                        <div className="services-box">
                          <div className="services-iconbox"><i className="lnr lnr-laptop-phone"></i></div>
                          <h2>Healthy Discussions</h2>
                          <p>Constructive and healthy discussion are part of our soccer life, we respect and listen to each others</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4" data-wow-delay="0.7s">
                        <div className="services-box">
                          <div className="services-iconbox"><i className="lnr lnr-chart-bars"></i></div>
                          <h2>Community Soccer</h2>
                          <p>Give something to community- whether its an advice, help or a community game, doesn't matter we all give a shout-out</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4" data-wow-delay="0.9s">
                        <div className="services-box">
                          <div className="services-iconbox"><i className="lnr lnr-envelope"></i></div>
                          <h2>Soccer Techniques</h2>
                          <p>Love to learn something new. Recently we used drone to record our weekend soccer match and made a self assessment</p>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4" data-wow-delay="1.1s">
                        <div className="services-box">
                          <div className="services-iconbox"><i className="lnr lnr-earth"></i></div>
                          <h2>Soccer Gears</h2>
                          <p>Who doesn't like to have a pair of new boots ! All of us would like to wrap ourself with new gadgets &amp; gears </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            <footer className="footerClass">Copyright @ 2020</footer>
          </div>
        )
}

export default Aboutus;