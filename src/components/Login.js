import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const Login = () => {

  const [loginData, setLoginData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [helperText, setHelperText] = useState('');
  const [value, setValue] = React.useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
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
          setError(true);
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

  return (
    <div className="login_wrapper">
      <div className="login_player_column_layout_one">
        <div className="login_player_Twocolumn_layout_two">
          <form onSubmit={handleSubmit} className="myForm">
            <div className="formInstructionsDiv formElement">
              <h2 className="formTitle">Login</h2>
            </div>
            <div className="loginfillContentDiv formElement">
              <label>
                <input className="inputRequest formContentElement" type="text" placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label>
                <input className="inputRequest formContentElement" type="password" placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} />
              </label>
              <label>
                <span className="loginValidationText">{helperText}</span>
              </label>
            </div>
            <div className="loginsubmitButtonDiv formElement">
              <button type="submit" className="submitButton">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;