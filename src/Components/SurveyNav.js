import React, { Component } from 'react';
import '../App.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class SurveyNav extends Component{
    render(){
        return(
            <div className="left">
                <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/survey">Survey</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/connect">Connect</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div> 
        );
    }
}