import React, { Component } from 'react';
import '../App.css';
import { Form, Button } from 'react-bootstrap';
import firebase from '../config/firebase.js';
import { Link } from 'react-router-dom';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    login(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{          
            console.log(u);
        }).catch((error) =>{console.log(error)});
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    render(){
        return(
            <div>
                <Form className='center'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter email" name="email"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" name="password"/>
                    </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.login}>
                            Log In
                        </Button>
                    <Form.Group>
                        <Form.Text>
                                Not signed up? Sign up here
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Link to="/signup">
                            <Button variant="success" type="submit">
                                Sign Up
                            </Button>
                        </Link>
                    </Form.Group >
                </Form>
            </div>
        );
    }
}