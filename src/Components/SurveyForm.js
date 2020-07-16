import React, { Component } from 'react';
import '../App.css';
import { Container, Jumbotron } from 'react-bootstrap';
import firebase from '../config/firebase.js';

var db = firebase.firestore();

export default class SurveyForm extends Component{
    constructor(props){
        super(props);
        this.accountTypeResolver = this.accountTypeResolver.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            accountType: '',
            painLevel: 1,

        }
    }

    componentDidMount(){
        this.accountTypeResolver();
    }
    
    accountTypeResolver(){
        if(localStorage.getItem('userID')){
            db.collection("users").doc(localStorage.getItem('userID')).get().then(function(doc) {
                var data = doc.data();
                console.log({data});
                if(data.accountType === "doctor"){
                    this.setState({ accountType: 'doctor'});
                }else if(data.accountType === "patient"){
                    this.setState({ accountType: 'patient'});
                }
            }.bind(this));
        }
    }

    handleSubmit(e){
        e.preventDefault();
        
        
        // Update newAccount field, signifying completion of basic info and consent form, allowing survey form to show
        db.collection("users").doc(localStorage.getItem('userID')).update({
            //newAccount: false
        }).then(function(){
            console.log("Added survey responses");
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

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