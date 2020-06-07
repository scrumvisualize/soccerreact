import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

const Login = () => {

  const [loginData, setLoginData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const [value, setValue] = React.useState('');
  const [error, setError] = useState(false);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = () => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:8000/service/login', { email, password });
        //setLoginData(res.data.loginData); 
        console.log("Front End success message:" + res.data.success);
        if (res.data.success) {
          setHelperText("Login successfully");
          setValue(res.data.privilege);
          localStorage.setItem('Privilege', res.data.privilege);
          localStorage.setItem('loginEmail', email);
          history.push('/')
          window.location.reload(true)
        }
        else {
          const failMessage = res.data.fail;
          setHelperText(failMessage);
        }
      } catch (e) {
        console.log(e.response.data);
        setHelperText(e.response.data.fail);
      }
    }
    fetchData();
  };

  function gotoRegister() {
    history.push('/register')
  }

  return (
    <div className="login_wrapper">
      <div className="login_player_column_layout_one">
        <div className="login_player_Twocolumn_layout_two">
          <form onSubmit={handleSubmit(onSubmit)} className="myForm">
            <div className="formInstructionsDiv formElement">
              <h2 className="formTitle">Login</h2>
            </div>
            <div className="loginfillContentDiv formElement">
              <label>
                <input className="inputRequest formContentElement" name="email" type="text" placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  ref={register({
                    required: "Registered email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                <span className="loginErrorTextFormat">{errors.email && errors.email.message}</span>
              </label>
              <label>
                <input className="inputRequest formContentElement" name="password" type="password" placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  ref={register({
                    required: "Password is required"
                  })}
                />
                <span className="loginErrorTextFormat">{errors.password && errors.password.message}</span>
              </label>
              <label>
                <span className="loginValidationText">{helperText}</span>
              </label>
            </div>
            <div className="loginsubmitButtonDiv formElement">
              <button type="submit" className="submitButton">Login</button>
            </div>
            <div className="loginsubmitButtonDiv formElement">
              <button className="submitButton" onClick={gotoRegister}>Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;