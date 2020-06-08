import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import Axios from "axios";

const Profile = () => {

  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [playerProfile, setPlayerProfile] = useState([]);
  const loginUserEmail = localStorage.getItem('loginEmail');
  const [updateProfile, setUpdateProfile] = useState({ _id: '', photo: '', name: '', email:'', phonenumber: '', position: '', password: '' })
  const [isSent, setIsSent] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();

  const onChangePicture = e => {
    console.log('picture: ', picture);
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

  // Pass the id to the handler so you will know which item id changing.
  const handleChange = (e, id) => {
    e.persist();
    let itemIndex;
    const targetPlayer = playerProfile.find((player, index) => {
      console.log({ player, id, index });
      itemIndex = index; // Track the index so you can use it to update later.
      return player.id === id;
    });

    console.log({ targetPlayer, id, e });

    const editedTarget = {
      ...targetPlayer,
      [e.target.name]: e.target.value
    };
    const tempPlayers = Array.from(playerProfile);
    tempPlayers[itemIndex] = editedTarget;
    /*
    // Alternatively:: you can just  map over the array if you dont want to track the index
    const tempPlayers = playerProfile.map((profile, index) => {
      return profile.id === id ? editedTarget : profile;
    });
    */
    setPlayerProfile(tempPlayers);
    setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value }); // this is added just to see if its working
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          email: loginUserEmail,
        };
      const res = await Axios.get('http://localhost:8000/service/profile', {params});
        setPlayerProfile(res.data.playerProfile);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const onSubmit = () => {
    setDisabled(disabled);
    const fetchData = async () => {
      try {
        const params = {
          email: loginUserEmail,
        };
        const data = {photo: updateProfile.photo, name: updateProfile.name, email: updateProfile.email, phonenumber: updateProfile.phonenumber, position: updateProfile.position, password: updateProfile.password}
        const res = await Axios.put('http://localhost:8000/service/profile', data, {params}); 
        console.log("Front End update message:" + res.data.success);
        if (res.data.success) {
          setIsSent(true);
          history.push('/')
        }
        else {
          console.log(res.data.message);
          setHelperText(res.data.message);
        }
      } catch (e) {
        setHelperText(e.response.data.message);
      }
    }
    fetchData();
  }

  return (
    <div className="register_wrapper">
      <div className="register_player_column_layout_one">
        <div className="register_player_Twocolumn_layout_two">
          <form onSubmit={handleSubmit(onSubmit)} className="myForm">
            {
              playerProfile.map(({ id, photo, name, email, phonenumber, position, privilege, password }) => (
                <div key={id}>
                  <div className="formInstructionsDiv formElement">
                    <h2 className="formTitle">Profile</h2>
                    <div className="register_profile_image">
                      <input id="profilePic" name="photo" type="file" onChange={onChangePicture} />
                    </div>
                    <div className="previewProfilePic" >
                      <img alt="" onError={addDefaultSrc} name="previewImage" className="playerProfilePic_home_tile" src={photo} onChange={e => handleChange(e, id)}></img>
                    </div>
                  </div>
                  <div className="fillContentDiv formElement">
                    <label>
                      <input className="inputRequest formContentElement" name="name" type="text" value={name} 
                      onChange={e => handleChange(e, id)}
                      maxLength={30}
                      ref={register({
                        required: "Full name is required", 
                        pattern: {
                          value: /^[a-zA-Z\s]{3,30}$/,
                          message: "Full name should have minimum of 3 letters"
                        }
                      })}
                      />
                      <span className="registerErrorTextFormat">{errors.name && errors.name.message}</span>
                    </label>
                    <label>
                      <input className="inputRequest formContentElement" name="email" type="text" value={email} 
                      onChange={e => handleChange(e, id)}
                      disabled={disabled}
                      />
                    </label>
                    <label>
                      <input className="inputRequest formContentElement" name="phonenumber" type="text" value={phonenumber} 
                      onChange={e => handleChange(e, id)}
                      maxLength={11}
                      ref={register({
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9\b]+$/,
                          message: "Invalid phone number"
                        }
                       })}
                      />
                      <span className="registerErrorTextFormat">{errors.phonenumber && errors.phonenumber.message}</span>
                    </label>
                    <label>
                      <input className="inputRequest formContentElement" name="position" type="text" value={position} 
                      onChange={e => handleChange(e, id)}
                      maxLength={30}
                      ref={register({
                        pattern: {
                          value: /^[a-zA-Z\s]{2,30}$/,
                          message: "Position should have minimum of 2 letters"
                        }
                      })}
                      />
                      <span className="registerErrorTextFormat">{errors.position && errors.position.message}</span>
                    </label>
                    <label>
                      <div className="select" >
                        <select name="privilege" id="select" value={privilege} onChange={e => handleChange(e, id)}>
                          {/*<option selected disabled>Choose an option</option> */}
                          <option value="player">PLAYER</option>
                          {/*<option value="admin">ADMIN</option>*/}
                        </select>
                      </div>
                    </label>
                    <label>
                      <input className="inputRequest formContentElement" name="password" type="password" value={password} 
                      onChange={e => handleChange(e, id)}
                      minLength={4}
                      maxLength={30}
                      ref={register({
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,
                        message: "Password begin with a letter and includes number !"
                      }
                      })}
                      />
                      <span className="registerErrorTextFormat">{errors.password && errors.password.message}</span>
                    </label>
                  </div>
                  <label>
                    <span className="profileValidationText">{helperText}</span>
                  </label>
                  <div className="submitButtonDiv formElement">
                    <button type="submit" className="submitButton">Save</button>
                  </div>
                </div>
              ))
            }
          </form>

        </div>
      </div>
    </div>
  );
}

export default Profile;