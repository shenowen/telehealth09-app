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
               
                {/*<form class="form-signin">
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                    <div class="checkbox mb-3">
                        <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>*/}
            </div>
        );
    }
}