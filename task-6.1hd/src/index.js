import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Signup from './components/Signup'; // Correct the import path
import NewJob from "./components/NewJob";
import Login from './components/Login';
import FindJobs from './components/FindJobs';
import Quiz from './components/Quiz';
import StripeContainer from './components/StripeContainer';
import Chats from './components/Chats';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Root() {
  const aut = useAuth();
  console.log(aut)
const [loggedIn, setLoggedIn] = useState(!!aut);

  return (
      <BrowserRouter>
      <AuthProvider>
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/devs" element={<NewJob />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/jobs" element={<FindJobs></FindJobs>}></Route>
          <Route path="/quiz" element={<Quiz></Quiz>}></Route>
      	  <Route path="/payment" element={<StripeContainer></StripeContainer>}></Route>
          <Route path="/chats" element={<Chats></Chats>}></Route>
        </Routes>
      </AuthProvider>
      </BrowserRouter>
  );
}

root.render(<Root />);
reportWebVitals();
