import './Quiz.css';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios'; // Import Axios

function Quiz() {
  // State variables to store questions
  const [easyQuestion, setEasyQuestion] = useState(null);
  const [mediumQuestion, setMediumQuestion] = useState(null);
  const [hardQuestion, setHardQuestion] = useState(null);

  // Function to fetch questions from an API
  const fetchQuestions = async () => {
    try {
      // First, try fetching using Axios
      const axiosResponse = await axios.get(
        "https://5c21-2404-7c00-41-b91a-fc35-251f-caca-2994.ngrok-free.app"
      );

      if (axiosResponse.status === 200) {
        // If Axios request is successful
        const data = axiosResponse.data;
        // Handle the JSON response data here
        setEasyQuestion(data.easy[Math.floor(Math.random() * 5)]);
        setMediumQuestion(data.medium[Math.floor(Math.random() * 5)]);
        setHardQuestion(data.hard[Math.floor(Math.random() * 5)]);
        return;
      }
    } catch (error) {
      // Handle Axios error or non-successful response
      console.error("Axios error:", error);
    }

    try {
      // If Api fails from free trial expiration or some other reason, try a basic fetch
      const fetchResponse = await fetch(
        "https://gamingapple0.github.io/leetcode_api/questions1.json"
      );

      if (!fetchResponse.ok) {
        throw new Error(`Failed to fetch data. Status: ${fetchResponse.status}`);
      }

      const jsonData = await fetchResponse.json();

      setEasyQuestion(jsonData.easy[Math.floor(Math.random() * 5)]);
      setMediumQuestion(jsonData.medium[Math.floor(Math.random() * 5)]);
      setHardQuestion(jsonData.hard[Math.floor(Math.random() * 5)]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect to fetch questions when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    // Load environment variables for email service
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_QUESTIONS_TEMPLATE_ID;
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
