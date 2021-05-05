import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

// async function loginUser(credentials) {
//  return fetch('http://localhost:8080/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    
    e.preventDefault();
    
    var error_user = document.getElementsByClassName("invalid_user")[0];
    var error_email = document.getElementsByClassName("email_error")[0];
    var error_pass = document.getElementsByClassName("pass_error")[0];
    var email_invalid = document.getElementsByClassName("email_invalid")[0];
    
    // Email validation
    if(!email) {
      error_email.classList.remove("hide");
      return;
    } else {
      error_email.classList.add("hide");
    }
    if(typeof email !== "undefined"){
         let lastAtPos = email.lastIndexOf('@');
         let lastDotPos = email.lastIndexOf('.');
         if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
            email_invalid.classList.remove("hide");
            return;
          } else {
            email_invalid.classList.add("hide");
          }
     }

    // password validation
    if(!password) {
      error_pass.classList.remove("hide");
      return;
    } else {
      error_pass.classList.add("hide");
    }

    // check user
    if (email == "admin@gmail.com" && password == "admin") {
      setToken( {token: 'test123'} );
      error_user.classList.add("hide");
    } else {
      error_user.classList.remove("hide");
      return;
    }

  }

  return (
    <div className="login_body">
      <div className="login_div">
        <form onSubmit={handleSubmit}>
          <span className="error hide invalid_user"> E-mail or Password is not correct. </span>
          <input placeholder="E-mail Address" className="user_email" type="text" onChange={e => setEmail(e.target.value)} />
          <span className="hide error email_error"> Please fill out this field! </span>
          <span className="hide error email_invalid"> E-mail address is not valid </span>
          <input placeholder="Password" className="user_pass" type="password" onChange={e => setPassword(e.target.value)} />
          <span className="hide error pass_error"> Please fill out this field! </span>
          <button className="signin_btn" type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};