import React, { Component } from 'react';
import '../App.css';
import firebase from '../config/firebase.js';
import { Button, Form, Modal } from 'react-bootstrap';

var db = firebase.firestore();
 
export default class BasicInfoModal extends Component{
    
    constructor(props){
        super(props);
        this.accountTypeResolver = this.accountTypeResolver.bind(this);
        this.handleSubmitPatient = this.handleSubmitPatient.bind(this);
        this.handleSubmitDoctor = this.handleSubmitDoctor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.state = {
            accountType: '',
            age: '',
            birthday: '',
            height: '',
            weight: '',
            doctorID: '',
            checked: false
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


    handleSubmitPatient(e){
        e.preventDefault();
        
        if(this.state.age === ''){
            alert("Age field is empty. Please enter your age.");
        }else if(this.state.birthday === ''){
            alert("Birthday field is empty. Please enter your birthday.");
        }else if(this.state.height === ''){
            alert("Height field is empty. Please enter your height.");
        }else if(this.state.weight === ''){
            alert("Weight field is empty. Please enter your weight.");
        }else if(this.state.doctorID === ''){
            alert("Doctor ID field is empty. Please enter your ID.");
        }else if(!this.state.checked){
            alert("Please check the checkbox to consent to HIPPA guidelines.");
        }else{
            db.collection("users").doc(localStorage.getItem('userID')).update({
                age: this.state.age,
                birthday: this.state.birthday,
                height: this.state.height,
                weight: this.state.weight,
                doctorID: this.state.doctorID,
                newAccount: false
            }).catch((error) =>{
                alert(error.message);
                console.log(error);
            }).then(function(){
                console.log("Patient Basic info updated");
                alert("Basic info form submitted! Please refresh the page.")
            });
        }
    }

    handleSubmitDoctor(e){
        e.preventDefault();
        
        if(this.state.doctorID === ''){
            alert("Doctor ID field is empty. Please enter your ID.");
        }else if(!this.state.checked){
            alert("Please check the checkbox to consent to HIPPA guidelines.");
        }else{
            db.collection("users").doc(localStorage.getItem('userID')).update({
                doctorID: this.state.doctorID,
                newAccount: false
            }).catch((error) =>{
                alert(error.message);
                console.log(error);
            }).then(function(){
                console.log("Doctor Basic info updated");
            });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    handleChecked(e) {
        this.setState({ checked: !this.state.checked });
    }

    render(){
        return(
            <div>
                    <Modal show={true} backdrop="static" animation={false} aria-labelledby="contained-modal-title-vcenter" centered size="xl" >
                        <Modal.Header>
                        <Modal.Title>Basic Info and HIPPA Consent Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>
                                Before you get to filling out surveys, we'd like to you to fill out a bit more information about yourself. Please fill out the following form
                            </h5>
                            <Form>
                                <Form.Group controlId="formAge">
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control value={this.state.age} onChange={this.handleChange} placeholder="Enter your age" name="age"/>
                                </Form.Group>
                                <Form.Group controlId="formBirthday">
                                    <Form.Label>Birthday (MM/DD/YYYY)</Form.Label>
                                    <Form.Control value={this.state.birthday} onChange={this.handleChange} placeholder="Enter your birthday" name="birthday"/>
                                </Form.Group>
                                <Form.Group controlId="formHeight">
                                    <Form.Label>Height Feet'Inches"</Form.Label>
                                    <Form.Control value={this.state.height} onChange={this.handleChange} placeholder="Enter your height" name="height"/>
                                </Form.Group>
                                <Form.Group controlId="formWeight">
                                    <Form.Label>Weight (lbs.)</Form.Label>
                                    <Form.Control value={this.state.weight} onChange={this.handleChange} placeholder="Enter your weight" name="weight"/>
                                </Form.Group>
                                <Form.Group controlId="formDoctorID">
                                    <Form.Label>Doctor ID</Form.Label>
                                    <Form.Control value={this.state.doctorID} onChange={this.handleChange} placeholder="Enter your doctor ID" name="doctorID"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check type="checkbox" onChange={this.handleChecked} label="Consent to sharing your data in line with HIPPA regulations and guidelines" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleSubmitPatient}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        );
    }
}

/*{this.state.accountType? ():(
                    <Modal show={true} backdrop="static" animation={false} aria-labelledby="contained-modal-title-vcenter" centered size="xl" >
                        <Modal.Header>
                        <Modal.Title>Basic Info and HIPPA Consent Form (Doctor)</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>
                                Please fill out the following form to view survey responses from your patients
                            </h5>
                            <Form>
                                <Form.Group controlId="formDoctorID">
                                    <Form.Label>Doctor ID</Form.Label>
                                    <Form.Control value={this.state.doctorID} onChange={this.handleChange} type="text" required={true} placeholder="Enter your doctor ID" name="doctorID"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check type="checkbox" onChange={this.handleChecked} label="Consent to HIPPA regulations and guidelines" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleSubmitDoctor}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
                )}*/