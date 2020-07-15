import React, { Component } from 'react';
import '../App.css';
import firebase from '../config/firebase.js';
import { Button, Modal } from 'react-bootstrap';

var db = firebase.firestore();
 
export default class BasicInfoModal extends Component{
    
    constructor(props){
        super(props);
        this.accountTypeResolver = this.accountTypeResolver.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            accountType: '',
            age: '',
            birthday: '',
            height: '',
            weight: '',
            doctorID: ''
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
            newAccount: false
        }).then(function(){
            console.log("CHEESE");
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    render(){
        return(
            <div>
                {this.state.accountType === 'doctor'? (
                    <Modal show={true} backdrop="static" animation={false} aria-labelledby="contained-modal-title-vcenter" centered size="xl" >
                        <Modal.Header>
                        <Modal.Title>Basic Info and HIPPA Consent Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            This is where a shortened Basic info form with just doctor ID and consent will be presented to the doctor
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
                ):(
                    <Modal show={true} backdrop="static" animation={false} aria-labelledby="contained-modal-title-vcenter" centered size="xl" >
                        <Modal.Header>
                        <Modal.Title>Basic Info and HIPPA Consent Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Before you get to filling out surveys, we'd like to you to fill out a bit more information about yourself.
                            Currently, I will close this modal by updating the firebase database newAccount boolean to display the survey form
                            when you click submit, but I will later close the modal when all basic info can be submitted.
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        );
    }
}