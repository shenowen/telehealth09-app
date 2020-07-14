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
            password: '',
            confirm_password: '',
            displayName: '',
            accountType: 'patient'
        }
    }

    signup(e){
        e.preventDefault();
        if(this.state.password === this.state.confirm_password){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
                u.user.updateProfile({
                    displayName: this.state.displayName
                })
                //Adding accountType and newUser to database
                var db = firebase.firestore();
                db.collection("users").doc(u.user.uid).set({
                    email: this.state.email,
                    accountType: this.state.accountType,
                    newAccount: true
                });

                alert("Successfully Signed Up! You are now logged in.");
                //console.log(u);
                console.log("Signed Up " + u.user.displayName);
                //console.log("Signed Up as " + this.state.accountType);
            }).catch((error) =>{
                alert(error.message);
                console.log(error);
            });
        }else{
            alert("Your passwords do not match. Please try again.");
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    render(){
        return(
            <div>
                <Form className='center'>
                    <Form.Group controlId="formFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={this.state.displayName} onChange={this.handleChange} type="displayName" placeholder="Enter your full name" name="displayName"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter your email" name="email"/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password (Must be at least 6 characters)</Form.Label>
                        <Form.Control value={this.state.password} onChange={this.handleChange} type="password" placeholder="Enter your password" name="password"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control value={this.state.confirm_password} onChange={this.handleChange} type="password" placeholder="Enter your password again" name="confirm_password"/>
                    </Form.Group>
                    <Form.Group controlId="formAccountType">
                        <Form.Label>I am a:</Form.Label>
                        <Form.Control as="select" custom defaultValue="patient" value={this.state.value} name="accountType" onChange={this.handleChange}>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor/Hospital</option>
                        </Form.Control>
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