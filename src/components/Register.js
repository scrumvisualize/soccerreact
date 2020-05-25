import React, { useState } from "react";
import RegisterService from '../services/RegisterService';
import axios from 'axios'


const Register = () => {

  const [picture, setPicture] = useState('');
  const [register, setRegister] = useState({ _id: '', photo: '', name: '', email: '', position: '', privilege: '', password: '' })


  const onChangePicture = e => {
    console.log('picture: ', picture);
    //setPicture(e.target.files[0]);
    if (e.target.files.length) {
      setPicture(URL.createObjectURL(e.target.files[0]));
      setRegister({ ...register, [e.target.name]: e.target.value });
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
    setRegister({ ...register, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //  RegisterService.create(register)
    //    .then(function (response) {
    //    console.log(response)
    //    })
    //    .catch(function (error) {
    //    console.log(error)
    //    console.log("Check if server getting this log here..")
    // }) 
    axios.put('http://localhost:8000/service/player', register)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
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
                <input id="profilePic" name="photo" type="file" onChange={onChangePicture} />
              </div>
              <div className="previewProfilePic" >
                <img alt="" error={addDefaultSrc} name="previewImage" className="playerProfilePic_home_tile" src={picture}></img>
              </div>
            </div>
            <div className="fillContentDiv formElement">
              <label>
                <input className="inputRequest formContentElement" name="name" type="text" placeholder="Full Name" onChange={onChange} />
              </label>
              {/*<div className="names formContentElement">
                <input className="inputRequest " name="lastName"  type="text" placeholder="Last Name" onChange={onChange}/>
              </div>*/}
              <label>
                <input className="inputRequest formContentElement" name="email" type="text" placeholder="Email" onChange={onChange} />
              </label>
              <label>
                <input className="inputRequest formContentElement" name="position" type="text" placeholder="Position" onChange={onChange} />
              </label>
              <label>
                <div className="select" >
                  <select name="privilege" id="select" onChange={onChange}>
                    {/*<option selected disabled>Choose an option</option> */}
                    <option value="player">PLAYER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </div>
              </label>
              <label>
                <input className="inputRequest formContentElement" name="password" type="password" placeholder="Create Password" onChange={onChange} />
              </label>
            </div>
            <div className="submitButtonDiv formElement">
              <button type="submit" className="submitButton">Register</button>
            </div>
          </form>
        </div>
      </div>
      <div className="soccerField_Register">
        <img src=""></img>
      </div>
    </div>
  );
}

export default Register;