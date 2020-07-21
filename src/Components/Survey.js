import React, { Component } from 'react';
import '../App.css';
import firebase from '../config/firebase.js';
import BasicInfoModal from './BasicInfoModal.js';
import SurveyForm from './SurveyForm.js';

export default class Survey extends Component{
    constructor(props){
        super(props);
        this.basicInfoModalListener = this.basicInfoModalListener.bind(this);
        this.state = {
            modalCompleted: false,
        }
    }
    
    componentDidMount(){
        this.basicInfoModalListener();
    }

    basicInfoModalListener(){
        var userCollection = firebase.firestore().collection("users");
        if(this.props.user && localStorage.getItem('userID')){
            userCollection.doc(localStorage.getItem('userID')).onSnapshot(function(doc) {
                var data = doc.data();
                console.log({data});
                if(data.newAccount === false){
                    this.setState({ modalCompleted: true });
                }
            }.bind(this));
        }
    }


    render(){
        return(
            <div>
                {this.state.modalCompleted === false ? (
                    <BasicInfoModal />
                ):(
                    <SurveyForm />
                )}
            </div>
        );
    }
}