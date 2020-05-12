import React from 'react';

const Login = () => {
  return (
    <div className="login_wrapper">
      <div className="login_player_column_layout_one">
        <div className="login_player_Twocolumn_layout_two">
          <form className="myForm">
            <div className="formInstructionsDiv formElement">
              <h2 className="formTitle" >Login</h2>
            </div>
            <div className="loginfillContentDiv formElement">
              <label>
                <input className="inputRequest formContentElement" type="text" placeholder="Email" />
              </label>
              <label>
                <input className="inputRequest formContentElement" type="password" placeholder="Password" />
              </label>
            </div>
            <div className="loginsubmitButtonDiv formElement">
              <button className="submitButton">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;