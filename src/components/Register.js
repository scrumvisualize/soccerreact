import React, { useState } from "react";


const Register = () => {

  const [picture, setPicture, setImage] = useState('');
  const onChangePicture = e => {
    console.log('picture: ', picture);
    //setPicture(e.target.files[0]);
    if (e.target.files.length) {
      setPicture(URL.createObjectURL(e.target.files[0]));
    } else {
      return false;
    }
  };
  // If no profile image is being uploaded, to avoid the broken display of image, display a default image.
  const addDefaultSrc = e => {
    e.target.src = '/images/default-icon.png';
  }
  
  return (
    <div className="register_wrapper">
      <div className="register_player_column_layout_one">
        <div className="register_player_Twocolumn_layout_two">
          <form className="myForm">
            <div className="formInstructionsDiv formElement">
              <h2 className="formTitle" >Sign Up</h2>
              <p className="instructionsText">Not registered yet, please register now !</p>
              <div className="register_profile_image">
                <input id="profilePic" type="file" onChange={onChangePicture} />
              </div>
              <div className="previewProfilePic" >
                <img onError={addDefaultSrc} className="playerProfilePic_home_tile" src={picture}></img>
              </div>
            </div>
            <div className="fillContentDiv formElement">
              <div className="names formContentElement">
                <input className="inputRequest " type="text" placeholder="First Name" />
                <input className="inputRequest " type="text" placeholder="Last Name" />
              </div>
              <label>
                <input className="inputRequest formContentElement" type="text" placeholder="Email" />
              </label>
              <label>
                <input className="inputRequest formContentElement" type="text" placeholder="Position" />
              </label>
              <label>
                <div className="select" >
                  <select name="selectRole" id="select">
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
              <button className="submitButton">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;