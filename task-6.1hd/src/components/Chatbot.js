import "./Chatbot.css";
import { useState, useRef } from "react";
import { Button, Icon } from 'semantic-ui-react';

function Chatbot() {
  // Refs for DOM elements
  const humanMessage = useRef();
  const botMessage = useRef();
  const input = useRef();

  // Function to check the bot's status
  const checkStatus = (e) => {
    let isActive = true;
    const status = document.querySelector(".status");
    if (isActive === true) {
      status.innerHTML = "Active";
      status.style.color = "green";
    } else {
      status.innerHTML = "Not Active";
      status.style.color = "red";
    }
  };

  // Function to handle user input
  const handleInput = async () => {
    const inputRef = input.current;
    const getBotMessage = botMessage.current;
    const getHumanMessage = humanMessage.current;
    const status = document.querySelector(".status");

    // Fetch prompts and answers from an external API
    let response;
    try {
      // Attempt to fetch questions from API
      response = await fetch("https://5c21-2404-7c00-41-b91a-fc35-251f-caca-2994.ngrok-free.app/prompts");

      // Handle the response...
    } catch (error) {
      try {
        // If the first API request fails due to trial expiration, try a basic fetch
        response = await fetch("https://gamingapple0.github.io/prompts_api/prompts.json");
        
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const j_res = await response.json();
    const promptsAndAnswers = j_res.promptsAndAnswers;

    const userInput = inputRef.value.toLowerCase();

    // Iterate through promptsAndAnswers to handle pattern conversion
    const matchedResponse = promptsAndAnswers.find(({ pattern }) => {
      try {
        const regex = new RegExp(pattern, 'i'); // 'i' for case-insensitive
        return regex.test(userInput);
      } catch (error) {
        return false; // Handle invalid regular expressions
      }
    });

    if (matchedResponse) {
      getBotMessage.innerText = "Typing...";
      setTimeout(() => {
        getBotMessage.innerText = matchedResponse.message;
        if (matchedResponse.setStatus) {
          status.innerText = matchedResponse.setStatus;
          status.style.color = matchedResponse.color;
        }
        inputRef.value = ""; // Clear the input
      }, 2000);
    }

    getHumanMessage.innerText = userInput; // Display the message
  };

  // Function to close the chat
  const closeChat = () => {
    const chatElement = document.getElementById("chat");
    const chatMin = document.getElementById("chat-closed");
    if (chatElement) {
      chatElement.classList.add("rem-chat");
    }
    if (chatMin) {
      chatMin.style.display = "block";
    }
  };

  // Function to open the chat
  const openChat = () => {
    const chatElement = document.getElementById("chat");
    const chatMin = document.getElementById("chat-closed");
    if (chatElement) {
      chatElement.classList.remove("rem-chat");
    }
    if (chatMin) {
      chatMin.style.display = "none";
    }
  };

  return (
    <div className="App" onLoad={checkStatus}>
      <div id="chat" className="wrapper rem-chat">
        <div className="content">
          <div style={{ "box-sizing": "revert" }} className="header">
            <div className="img">
              <img src="https://cdn-icons-png.flaticon.com/512/4711/4711987.png" alt="Bot Pic" />
            </div>
            <div className="right">
              <div className="name">ChatBot</div>
              <div className="status">Active</div>
            </div>
            <Button icon id="close-butt" onClick={closeChat}>
              <Icon name="close" />
            </Button>
          </div>
          <div className="main">
            <div className="main_content">
              <div className="messages">
                <div
                  className="bot-message"
                  id="message1"
                  ref={botMessage}
                ></div>
                <div
                  className="human-message"
                  id="message2"
                  ref={humanMessage}
                ></div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btm">
              <div className="input">
                <input
                  type="text"
                  id="input"
                  placeholder="Enter your message"
                  ref={input}
                />
              </div>
              <div className="btn">
                <button onClick={handleInput}>
                  <i className="fas fa-paper-plane"></i>Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={openChat} id="chat-closed" icon>
        <Icon name="chat" />
      </Button>
    </div>
  );
}
}
export default Chatbot;
