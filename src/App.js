import React, { Component, useContext } from 'react';
import './App.css';
import firebase from './config/firebase.js';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from './Components/NavigationBar.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import Home from './Components/Home.js';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({ user });
        localStorage.setItem('user', user.displayName);
        console.log({user});
        console.log("Logged In");
      }else{
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    })
  }

  render(){
    return (
      <div>
          <NavigationBar displayName= {this.state.user.displayName}/>
          <Container className='center-middle'>
            <Router>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  {this.state.user ? (<Redirect to="/" />): (<Redirect to="/login" />)}
                  <Redirect to="/login" />
                </Switch>
            </Router>
          </Container>
      </div>
    );
  }
}