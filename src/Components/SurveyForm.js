import React, { Component } from 'react';
import '../App.css';
import { Container, Jumbotron } from 'react-bootstrap';
import firebase from '../config/firebase.js';

export default class SurveyForm extends Component{
    render(){
        return(
            <Container className="center-middle">
                <Jumbotron>
                    <h1>This is the placeholder for the survey form :D</h1>
                </Jumbotron>
            </Container>
        );
    }
}