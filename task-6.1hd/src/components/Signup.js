import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUpWithEmailAndPassword, updateDetails } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

function Signup() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create a new user with email and password
      const userCredential = await signUpWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // Update user profile with first and last name
      await updateDetails({
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Redirect to the login page
      nav("/login")
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <br></br>
      <br></br>
      <div className="form-container slidefade animate-slidefade z-applicable">
        <h3 className="title">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <br></br>
          <button className="form-button" type="submit" name="Hover">
            Sign Up
          </button>
        </form>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Signup;
