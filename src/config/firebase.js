import * as firebase from 'firebase';
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyBSwh2D0CVgRH2xnI7_2Q1RsPTjWah1wjE",
    authDomain: "telehealth09-app.firebaseapp.com",
    databaseURL: "https://telehealth09-app.firebaseio.com",
    projectId: "telehealth09-app",
    storageBucket: "telehealth09-app.appspot.com",
    messagingSenderId: "452490710426",
    appId: "1:452490710426:web:1dbe2d7c232641cbe6fe23"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
  export const auth = firebase.auth();