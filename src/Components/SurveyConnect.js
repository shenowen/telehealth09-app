import React, { Component } from 'react';
import '../App.css';
import { Container, Jumbotron } from 'react-bootstrap';

export default class SurveyConnect extends Component{
    render(){
        return(
            <Container className="center-middle">
                <Jumbotron>
                    <h1>This is the placeholder for the connect/misc. content :D</h1>
                </Jumbotron>
            </Container>
        );
    }
}