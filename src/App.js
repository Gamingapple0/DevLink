import { useState } from 'react';
import './App.css';
import StripeContainer from './components/StripeContainer';

import logo from './logo.svg';
import Home from './components/Home.js'
import NewJob from "./components/NewJob"
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header.js'
import Signup from './components/Signup'
import Login from './components/Login'
import FindJobs from './components/FindJobs';
import Quiz from './components/Quiz';
import 'semantic-ui-css/semantic.min.css'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/devs" element={<NewJob />}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path="/jobs" element={<FindJobs></FindJobs>}></Route>
      <Route path="/quiz" element={<Quiz></Quiz>}></Route>
	  <Route path="/payment" element={<StripeContainer></StripeContainer>}></Route>
    </Routes>
  );
}



export default App;