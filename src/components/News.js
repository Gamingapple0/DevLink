import React, { useState, useRef } from 'react';
import './News.css'; // Import your CSS file
import emailjs from '@emailjs/browser';

function News() {
  const [email, setEmail] = useState('');
  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    // Load environment variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;

    emailjs
      .sendForm(serviceId, templateId, form.current, userId)
      .then((response) => {
        console.log('Email sent successfully:', response);
        console.log('Form:', form.current);
        console.log('SerID:', serviceId);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendEmail(event);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <div className="welcome-form-div">
        <h4>SIGN UP FOR OUR DAILY INSIDER</h4>
        <form ref={form} className='welcome-form' onSubmit={sendEmail}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input type="submit" value="Subscribe" />
        </form>
      </div>
    </div>
  );
}

export default News;
