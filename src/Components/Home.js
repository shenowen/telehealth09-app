import React, { Component } from 'react';
import '../App.css';
import { Button, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component{
    render(){
        return(
            <div>
                <Jumbotron>
                <h1>Welcome to Telehealth-09's Product, Sana!</h1>
                <p>
                    Our product aims to create a platform for diabetics to report their health condition that
                    is seamlessly integrated to their hospital and delivers analytics about their condition 
                    to doctors and nurses.
                </p>
                <p>
                    <Link to="/signup">
                        <Button variant="primary" type="submit">
                            Learn More / Sign Up
                        </Button>
                    </Link>
                </p>
                </Jumbotron>
            </div>
        );
    }
}