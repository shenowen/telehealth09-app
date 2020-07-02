import React from 'react';
import './App.css';
import firebase from './firebase';

function App() {
  return (
    <div className="App">
      Hello World Telehealth09-app
    </div>
  );
}

async function SignIn() {
  const email = 'ks562@evansville.edu';
  const pass = 'test';
  const data = await firebase.auth().SignInWithEmailAndPassword(email, pass);


}

async function SignUp() {
  const email = 'ks562@evansville.edu';
  const pass = 'test';
  const data = await firebase.auth().createUserWithEmailAndPassword(email, pass);
}

export default App;
