import React, { Component } from 'react';
import '../App.css';
import { Container, Jumbotron } from 'react-bootstrap';
import firebase from '../config/firebase.js';
import { Button, Form } from 'react-bootstrap';

var db = firebase.firestore();

export default class SurveyForm extends Component{
    constructor(props){
        super(props);
        this.accountTypeResolver = this.accountTypeResolver.bind(this);
        this.handleSubmitSurvey = this.handleSubmitSurvey.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            surveyCompleted: false,
            accountType: '',
            painLevel: '',
            exerciseTime: '',
            carbIntake: '',
            fastingBloodSugar: '',
            medicineScheduled: '',
            difficultiesMedicine: '',
            difficultiesMedicineFR: '',
            sideEffectsMedicine: '',
            sideEffectsMedicineFR: ''
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

    handleSubmitSurvey(e){
        e.preventDefault();
        var surveyCounter = 1;
        var surveyResponse = db.collection("users").doc(localStorage.getItem('userID')).collection("surveys").doc(surveyCounter.toString());
        while(surveyResponse.exists){
            surveyCounter++;
            surveyResponse = db.collection("users").doc(localStorage.getItem('userID')).collection("surveys").doc(surveyCounter.toString());
        }
        
        if(this.state.painLevel === ''){
            alert("Pain level field is empty");
        }else if(this.state.exerciseTime === ''){
            alert("Exercise time field is empty");
        }else if(this.state.carbIntake === ''){
            alert("Carb intake field is empty");
        }else if(this.state.fastingBloodSugar === ''){
            alert("Blood sugar field is empty");
        }else if(this.state.medicineScheduled === ''){
            alert("Medicine scheduled field is not selected");
        }else if(this.state.difficultiesMedicine === ''){
            alert("Difficulties with medicine field is not selected");
        }else if(this.state.difficultiesMedicine === ''){
            alert("Side effects with medicine field is not selected");
        }else{
            db.collection("users").doc(localStorage.getItem('userID')).collection("surveys").doc(surveyCounter.toString()).set({
                painLevel: this.state.painLevel,
                exerciseTime: this.state.exerciseTime,
                carbIntake: this.state.carbIntake,
                fastingBloodSugar: this.state.fastingBloodSugar,
                medicineScheduled: this.state.medicineScheduled,
                difficultiesMedicine: this.state.difficultiesMedicine,
                sideEffectsMedicine: this.state.sideEffectsMedicine
            }).then((response) => {
                alert("Survey submitted! Thank you!");
                console.log("Added survey responses");
                this.setState({ surveyCompleted: true });
            });

            if(this.state.difficultiesMedicineFR){
                db.collection("users").doc(localStorage.getItem('userID')).collection("surveys").doc(surveyCounter.toString()).update({
                    difficultiesMedicineFR: this.state.difficultiesMedicineFR
                });
            }
            if(this.state.sideEffectsMedicineFR){
                db.collection("users").doc(localStorage.getItem('userID')).collection("surveys").doc(surveyCounter.toString()).update({
                    sideEffectsMedicineFR: this.state.sideEffectsMedicineFR
                });
            }
        }

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    render(){
        return(
            <Container>
                    {this.state.surveyCompleted === true?(
                        <Jumbotron className="center-middle">
                            <h1>Thank you for submitting your daily survey! Come back tomorrow :)</h1>
                        </Jumbotron>
                    ):(
                        <Jumbotron>
                            <h3 className="center">Daily Survey Form</h3>
                            <Form>
                                <Form.Group controlId="formPainLevel">
                                    <Form.Label>My pain level is currently</Form.Label>
                                    <Form.Control as="select" custom value={this.state.value} name="painLevel" onChange={this.handleChange}>
                                        <option value="">Please choose from 1-10</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formExercise">
                                    <Form.Label>How many minutes of exercise have you performed? (In minutes)</Form.Label>
                                    <Form.Control value={this.state.exerciseTime} onChange={this.handleChange} placeholder="Enter minutes exercised" name="exerciseTime"/>
                                </Form.Group>
                                <Form.Group controlId="formCarbs">
                                    <Form.Label>How many grams of carbs did you consume yesterday?</Form.Label>
                                    <Form.Control value={this.state.carbIntake} onChange={this.handleChange} placeholder="Enter carb intake" name="carbIntake"/>
                                </Form.Group>
                                <Form.Group controlId="formBloodSugar">
                                    <Form.Label>What was your blood sugar level after waking up this morning?</Form.Label>
                                    <Form.Control value={this.state.fastingBloodSugar} onChange={this.handleChange} placeholder="Enter your blood sugar" name="fastingBloodSugar"/>
                                </Form.Group>
                                <Form.Group controlId="formMedicineScheduled">
                                    <Form.Label>Did you take your medicine as scheduled yesterday?</Form.Label>
                                    <Form.Control as="select" custom value={this.state.value} name="medicineScheduled" onChange={this.handleChange}>
                                        <option value="">Please choose below</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formDifficultyMedicine">
                                    <Form.Label>Did you encounter any difficulties with your medicine?</Form.Label>
                                    {this.state.difficultiesMedicine === 'Yes'? (
                                        <div>
                                            <Form.Control as="select" custom defaultValue="Yes" value={this.state.value} name="difficultiesMedicine" onChange={this.handleChange}>
                                                <option value="">Please choose</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </Form.Control>
                                            <Form.Label>Please elaborate below</Form.Label>
                                            <Form.Control as="textarea" name="difficultiesMedicineFR" value ={this.state.difficultiesMedicineFR} onChange={this.handleChange} rows="3"/>
                                        </div>
                                    ):(
                                        <Form.Control as="select" custom value={this.state.value} name="difficultiesMedicine" onChange={this.handleChange}>
                                            <option value="">Please choose</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </Form.Control>
                                    )}
                                </Form.Group>
                                <Form.Group controlId="formSideEffectsMedicine">
                                    <Form.Label>Did you encounter any side effects with your medicine?</Form.Label>
                                    {this.state.sideEffectsMedicine === 'Yes'? (
                                        <div>
                                            <Form.Control as="select" custom defaultValue="Yes" value={this.state.value} name="sideEffectsMedicine" onChange={this.handleChange}>
                                                <option value="">Please choose</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </Form.Control>
                                            <Form.Label>Please elaborate below</Form.Label>
                                            <Form.Control as="textarea" name="sideEffectsMedicineFR" value ={this.state.sideEffectsMedicineFR} onChange={this.handleChange} rows="3"/>
                                        </div>
                                    ):(
                                        <Form.Control as="select" custom value={this.state.value} name="sideEffectsMedicine" onChange={this.handleChange}>
                                            <option value="">Please choose</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </Form.Control>
                                    )}
                                </Form.Group>
                                <div className="center">
                                    <Button variant="secondary" onClick={this.handleSubmitSurvey} >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Jumbotron>
                    )}
            </Container>
        );
    }
}