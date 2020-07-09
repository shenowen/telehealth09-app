import React, { Component } from 'react';
import '../App.css';
import { Container, Jumbotron } from 'react-bootstrap';

export default class SurveyEducational extends Component{
    render(){
        return(
            <Container className="center-middle">
                <Jumbotron>
                    <h1>This is the placeholder for the educational content :D</h1>
                </Jumbotron>
            </Container>
        );
    }
}