import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import Home from './Components/Home.js';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
    
  );
}