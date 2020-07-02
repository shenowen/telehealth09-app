import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import firebase from '../config/firebase.js';
import { Link } from 'react-router-dom';

export default class Home extends Component{
    logout() {
        firebase.auth().signOut();
        console.log("Signed Out");
    }

    render(){
        return(
            <div>
                <h1>
                    Hello World Telehealth09-app! This is the landing page.
                </h1>
                <Link to="/login">
                    <Button variant="primary" type="submit" onClick={this.logout}>
                        Sign out
                    </Button>
                </Link>
            </div>
        );
    }
}