import React from 'react';

const Register = () => {
  return (
    <div className="register_wrapper">
      <div className="register_player_column_layout_one">
        <div className="register_player_Twocolumn_layout_two">
          <form className="myForm">
            <div className="formInstructionsDiv formElement">
              <h2 className="formTitle" >Sign Up</h2>
              <p className="instructionsText">Please register here as a player</p>
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
                    <option selected disabled>Choose an option</option>
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