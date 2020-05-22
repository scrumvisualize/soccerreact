import React, { useState } from "react";
import axios from 'axios';
import RegisterService from '../services/RegisterService';


const Register = () => {

  const [picture, setPicture, setImage] = useState('');
  const [register, setRegister] = useState({ _id: '', profileImage: '', firstName: '', lastName: '', selectRole: ''})


  const onChangePicture = e => {
    console.log('picture: ', picture);
    //setPicture(e.target.files[0]);
    if (e.target.files.length) {
      setPicture(URL.createObjectURL(e.target.files[0]));
      setRegister({...register, [e.target.name]: e.target.value});
    } else {
      return false;
    }
  };
  // If no profile image is being uploaded, to avoid the broken display of image, display a default image.
  const addDefaultSrc = e => {
    e.target.src = '/images/default-icon.png';
  }
  
  const onChange = (e) => {
    e.persist();
    setRegister({...register, [e.target.name]: e.target.value});
    }

  const handleSubmit = (e) => {
   e.preventDefault()
   RegisterService.create(register)
       .then(function (response) {
        console.log(response)
       })
       .catch(function (error) {
        console.log(error)
        console.log("Check if server getting this log here..")
     }) 
  }

  return (
    <div className="register_wrapper">
      <div className="register_player_column_layout_one">
        <div className="register_player_Twocolumn_layout_two">
          <form onSubmit={handleSubmit} className="myForm">
            <div className="formInstructionsDiv formElement">
              <h2 className="formTitle" >Sign Up</h2>
              <p className="instructionsText">Not registered yet, please register now !</p>
              <div className="register_profile_image">
                <input id="profilePic" name="profileImage"  type="file" onChange={onChangePicture} />
              </div>
              <div className="previewProfilePic" >
                <img onError={addDefaultSrc} name="previewImage"  className="playerProfilePic_home_tile" src={picture}></img>
              </div>
            </div>
            <div className="fillContentDiv formElement">
              <div className="names formContentElement">
                <input className="inputRequest " name="firstName" type="text" placeholder="First Name" onChange={onChange}/>
                <input className="inputRequest " name="lastName"  type="text" placeholder="Last Name" onChange={onChange}/>
              </div>
              <label>
                <input className="inputRequest formContentElement" type="text" placeholder="Email" />
              </label>
              <label>
                <input className="inputRequest formContentElement" type="text" placeholder="Position" />
              </label>
              <label>
                <div className="select" >
                  <select name="selectRole" id="select" onChange={onChange}>
                    {/*<option selected disabled>Choose an option</option> */}
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </label>
              <label>
                <input className="inputRequest formContentElement" type="password" placeholder="Create Password" />
              </label>
            </div>
            <div className="submitButtonDiv formElement">
              <button type="submit" className="submitButton">Register</button>
            </div>
          </form>
        </div>
      </div>
      <div className="soccerField_Register">
        <img src="/images/ground-2.png"></img>
      </div>
    </div>
  );
}

export default Register;