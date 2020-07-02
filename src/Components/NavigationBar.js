import React, { Component } from 'react';
import '../App.css';
import { Navbar } from 'react-bootstrap';

export default class NavigationBar extends Component{
    render(){
        var userName = localStorage.getItem('user');
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Telehealth-09</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    Signed in as: {userName}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}