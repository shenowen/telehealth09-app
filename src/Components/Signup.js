import React, { Component } from 'react';
import '../App.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Signup extends Component{

    render(){
        return(
            <div>
                <Form className='center'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
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