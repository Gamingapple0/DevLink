import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from 'react-chat-engine';
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Chats = (props) => {
  const { user } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to the home page if the user is not authenticated
    if (!user) {
      nav('/');
      return;
    }

    // Check if the user exists in the ChatEngine API
    axios.get('https://api.chatengine.io/users/', {
      headers: {
        "projectID": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
        "userName": user.displayName,
        "userSecret": user.uid,
      },
    })
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      // Create the user if it doesn't exist
      let formData = new FormData();
      formData.append('email', user.email);
      formData.append('username', user.displayName);
      formData.append('secret', user.uid);

      axios.post("https://api.chatengine.io/users", formData, {
        headers: {
          "private-key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
        },
      })
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    });
  }, [user]);

  if (!user || loading) {
    return "Loading...";
  }

  return (
    <>
      <br></br>
      <br></br>
      <br></br>

      <div className="chats-page">
        <ChatEngine
          height="calc(100vh - 66px)"
          projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
          userName={user.displayName}
          userSecret={user.uid}
        ></ChatEngine>
      </div>
    </>
  );
}

export default Chats;
