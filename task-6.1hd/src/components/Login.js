import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../firebase';
import Error from './Error';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import './Login.css';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Create a Google Authentication Provider
const provider = new GoogleAuthProvider();

function Login(props) {
  // State to handle errors and form data
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const authi = useAuth();

  // Handle input change for form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Attempt to log in with email and password
      await loginWithEmailAndPassword(formData.email, formData.password);
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 4000);
      console.error('Error logging in:', error);
    }
  };

  // Handle Google sign-in
  const GoogleSign = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Access Google Access Token and user information
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        window.location.href = '/';
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Google sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <div className="form-container slidefade animate-slidefade z-applicable">
        <h3 className="title">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
          />
          <br></br>
          <button className="form-button" type="submit">Sign-In</button>
        </form>
        <br></br>
        <div className="google-btn" onClick={GoogleSign}>
          <div className="google-icon-wrapper">
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Icon" />
          </div>
          <p className="btn-text"><b>Sign In With Google</b></p>
        </div>
      </div>
      {error && <Error reason={error}></Error>}
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Login;
