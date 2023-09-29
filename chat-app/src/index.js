import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6hFPqeT04qswcp5JRioplYmY-zt52SDw",
  authDomain: "chat-app-b9e60.firebaseapp.com",
  databaseURL: "https://chat-app-b9e60-default-rtdb.firebaseio.com",
  projectId: "chat-app-b9e60",
  storageBucket: "chat-app-b9e60.appspot.com",
  messagingSenderId: "674839224886",
  appId: "1:674839224886:web:d9b63f423fffff5885ee97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 // remove strict mode to stop rendering twice 
    <App />
  
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
