import React, { Component } from 'react';
import '../App.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../config/firebase.js';

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    signup(e){
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{          
            console.log(u);
            console.log("Signed Up");
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
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" name="password"/>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit" onClick={this.signup}>
                            Sign Up
                        </Button>
                    </Form.Group> 
                    <Form.Group>
                    <Form.Text>
                            Already signed up? Log in here
                    </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Link to="/login">
                            <Button variant="success" type="submit">
                                Log In
                            </Button>
                        </Link>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}