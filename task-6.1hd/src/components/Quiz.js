import './Quiz.css';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function Quiz() {
  // State variables to store questions
  const [easyQuestion, setEasyQuestion] = useState();
  const [mediumQuestion, setMediumQuestion] = useState();
  const [hardQuestion, setHardQuestion] = useState();

  // Function to fetch questions from an API
  const fetchQuestions = async () => {
    let response;
    try {
      // Attempt to fetch questions from API
      response = await fetch("https://5c21-2404-7c00-41-b91a-fc35-251f-caca-2994.ngrok-free.app");

      // Handle the response...
    } catch (error) {
      try {
        // If the first API request fails due to trial expiration, try a basic fetch
        response = await fetch("https://gamingapple0.github.io/leetcode_api/questions1.json");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        // Parse the JSON data
        const jsonData = await response.json();

        // Set questions from the fetched data
        setEasyQuestion(jsonData.easy[Math.floor(Math.random() * 5)]);
        setMediumQuestion(jsonData.medium[Math.floor(Math.random() * 5)]);
        setHardQuestion(jsonData.hard[Math.floor(Math.random() * 5)]);

        console.log("Name of the first easy question:", easyQuestion.examples);
        console.log("Name of the first medium question:", mediumQuestion.examples);
        console.log("Name of the first hard question:", hardQuestion.examples);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    // Load environment variables for email service
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;

    // Send the form using EmailJS
    emailjs
      .sendForm(serviceId, templateId, form.current, userId)
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {easyQuestion && (
        <div className='allQuestionContainer'>
          <form ref={form}>
            {/* Question 1 */}
            <div className="questionContainer">
              <div className="question">
                <h2 className=''>Q1. {easyQuestion.name}</h2>
                <h3>{easyQuestion.problem}</h3>
                <h3><b>Examples</b></h3>
                <pre>{easyQuestion.examples}</pre>
                <h3><strong>Constraints</strong></h3>
                <h3>{easyQuestion.constraints}</h3>
              </div>
              <div className="answer">
                <h2>Your Solution</h2>
                <textarea name="answer1" className='quizAnswer'></textarea>
              </div>
            </div>
            {/* Question 2 */}
            <div className="questionContainer">
              <div className="question">
                <h2 className=''>Q2. {mediumQuestion.name}</h2>
                <h3>{mediumQuestion.problem}</h3>
                <h3><b>Examples</b></h3>
                <pre>{mediumQuestion.examples}</pre>
                <h3><strong>Constraints</strong></h3>
                <h3>{mediumQuestion.constraints}</h3>
              </div>
              <div className="answer">
                <h2>Your Solution</h2>
                <textarea name="answer2" className='quizAnswer'></textarea>
              </div>
            </div>
            {/* Question 3 */}
            <div className="questionContainer">
              <div className="question">
                <h2 className=''>Q3. {hardQuestion.name}</h2>
                <h3>{hardQuestion.problem}</h3>
                <h3><b>Examples</b></h3>
                <pre>{hardQuestion.examples}</pre>
                <h3><strong>Constraints</strong></h3>
                <h3>{hardQuestion.constraints}</h3>
              </div>
              <div className="answer">
                <h2>Your Solution</h2>
                <textarea name="answer3" className='quizAnswer'></textarea>
              </div>
            </div>
            {/* Hidden email input */}
            <input style={{ display: "none" }} name="email" value="madhikarmianshu@gmail.com"></input>
            <div className='buttonContainer'>
              <button className="submitButton" onClick={sendEmail}>Submit Answers</button>
            </div>
          </form>
        </div>
      )}
      {/* Button to fetch new questions */}
      <div className='buttonContainer'>
        <button className="submitButton" onClick={fetchQuestions}>Generate New Questions</button>
      </div>
    </>
  );
}

export default Quiz;
