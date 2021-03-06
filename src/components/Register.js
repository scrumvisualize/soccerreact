import React, { useContext, useState } from "react";
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import UserRegisterContext from '../context';
import { Checkbox } from "@material-ui/core";


const Register = () => {

  const [preview, setPreview] = useState('');
  const [picture, setPicture] = useState('');
  //const {picture, setPicture} = useContext(UserRegisterContext);
  const [formRegister, setRegister] = useState({ _id: '', photo: '', name: '', email: '', phonenumber: '', position: '', privilege: '', password: '', token: ''})
  const [isSent, setIsSent] = useState(false);
  const [checked, setChecked] = useState(false);
  const [helperText, setHelperText] = useState('');
  const { handleSubmit, register, errors } = useForm();
  const [isError, setIsError] = useState(false);

  const thankYouMessage = <p>Thank you for your input!</p>
  const form = <form>...</form>
  const history = useHistory();


  const onChangePicture = e => {
    console.log('picture: ', picture);
    if (e.target.files.length) {
      //setPicture(URL.createObjectURL(e.target.files[0]));
      setPreview(URL.createObjectURL(e.target.files[0]));
      setPicture(e.target.files[0]);
      //setPicture({photo:e.target.files[0]});
      setRegister({ ...formRegister, [e.target.name]: e.target.value });
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
    setRegister({ ...formRegister, [e.target.name]: e.target.value });
  }

const onSubmit = e => {
  const formData = new FormData();

  for(let key in formRegister) {
    formData.append(key,formRegister[key]);
  }

  if (picture) formData.append("photo", picture);

  const config = {
    headers: {
        'content-type': 'multipart/form-data' 
    }
  }
    const fetchData = async () => {
      try {
        const res = await axios.put('http://localhost:8000/service/player', formData, config);
        console.log("Front End success message:" + res.data.success);
        if (res.data.success) {
          setIsSent(true);
          history.push('/login')
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
          <form onSubmit={handleSubmit(onSubmit)} className="myForm" encType="multipart/form-data">
            <div className="formInstructionsDiv formElement">
              <h2 className="formTitle" >Sign Up</h2>
              <p className="instructionsText">Not registered yet, please register now !</p>
              <div className="register_profile_image">
                <input id="profilePic" name="photo" type="file" onChange={onChangePicture} />
              </div>
              <div className="previewProfilePic" >
                <img alt="" onError={addDefaultSrc} name="previewImage" className="playerProfilePic_home_tile" src={preview}></img>
              </div>
            </div>
            <div className="fillContentDiv formElement">
              <label>
                <input className="inputRequest formContentElement" name="name" type="text" placeholder="Full Name"
                  onChange={onChange}
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
                <input className="inputRequest formContentElement" name="email" type="text" placeholder="Email"
                  onChange={onChange}
                  ref={register({
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                <span className="registerErrorTextFormat">{errors.email && errors.email.message}</span>
              </label>
              <label>
                <input className="inputRequest formContentElement" name="phonenumber" type="text" placeholder="Mobile"
                  onChange={onChange}
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
                <input className="inputRequest formContentElement" name="position" type="text" placeholder="Position" 
                onChange={onChange} 
                maxLength={30}
                ref={register({
                  required: "Position is required",
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
                  <select defaultValue={'DEFAULT'} name="privilege" id="select" 
                  onChange={onChange}
                  ref={register({
                    required: "Role is required",
                  })}
                  > <option value="DEFAULT" disabled>Choose an option</option>
                    <option value="player">PLAYER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </div>
                <span className="registerErrorTextFormat">{errors.privilege && errors.privilege.message}</span>
              </label>
              <label>
                <input className="inputRequest formContentElement" name="password" type="password" placeholder="eg: P@ssW0rd"
                  onChange={onChange}
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
              <span className="registerValidationText">{helperText}</span>
            </label>
            <label>
              <input type="checkbox" name="tokencheck" onChange={() => setChecked(!checked)} checked={checked}
              ref={register({
                required: "Please click to enable token field"
                })
               }
              />
              {
             checked ? (
             <input className="inputRequest formContentElement" name="token" type="text" placeholder="token"
             onChange={onChange} 
             minLength={8}
             maxLength={25}
             ref={register({
               required: "Valid token is required !",
               pattern: {
                 value: /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$/,
                 message: "Token should include alphanumeric and special characters!"
               }
             })}
             />
               ) : (<div></div>)
              }
              <span className="registerErrorTextFormat">{errors.tokencheck && errors.tokencheck.message}</span>
              <span className="registerErrorTextFormat">{errors.token && errors.token.message}</span>
            </label>
            <div className="submitButtonDiv formElement" style={{ margin: isError ? '65px 0 20px 0' : '20px 0 20px 0' }}>
              <button type="submit" className="submitButton">Register</button>
            </div>
          </form>
        </div>
      </div>
      <div className="soccerField_Register">
        <img src=""></img>
        <span className="joinAboutus_data_1">
          {isSent ? thankYouMessage : form}
        </span>
      </div>
    </div>
  );
}

export default Register;