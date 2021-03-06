import React, { Component } from 'react';
import './App.css';
import firebase from './config/firebase.js';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from './Components/NavigationBar.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import Home from './Components/Home.js';
import SurveyNav from './Components/SurveyNav.js';
import Survey from './Components/Survey.js';
import SurveyConnect from './Components/SurveyConnect.js';

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
        localStorage.setItem('userID', user.uid);
        //console.log({user});
        //console.log("Logged In");
      }else{
        this.setState({ user: null });
        localStorage.clear();
      }
    })
  }

  render(){
    return (
      <div>
          <NavigationBar user={this.state.user}/>
          <Router>
            {this.state.user? (
              <div>
                <SurveyNav />
                <Switch>
                  <Route path="/survey">
                    <Survey user={this.state.user} />
                  </Route>
                  <Route path="/connect" component={SurveyConnect} />
                  <Redirect to="/survey" />
                </Switch>
              </div>
            ):(
              <Container className='center-middle'>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Redirect to="/" />
                </Switch>
              </Container>
            )}
            </Router>
      </div>
    );
  }
}