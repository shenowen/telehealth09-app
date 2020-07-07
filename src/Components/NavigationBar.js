import React, { Component } from 'react';
import '../App.css';
import { Button , Navbar } from 'react-bootstrap';
import firebase from '../config/firebase.js';

export default class NavigationBar extends Component{
    logout() {
        firebase.auth().signOut();
        console.log("Signed Out");
        alert("You have been signed out!");
    }

    render(){
        var userName = this.props.user.displayName;
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Telehealth-09</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-middle">
                    {userName? 
                        (<Navbar.Text>Signed in as: {userName}</Navbar.Text> ):
                        (<div />)
                    }
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {userName? 
                        (<Button variant="primary" type="submit" onClick={this.logout}> Sign out</Button>):
                        (<div />)
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}