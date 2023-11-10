// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

const firebaseConfig = {
   apiKey: "AIzaSyDSAAqD1a73N5REtR8zYRwFxEm-oyhYtmA",
   authDomain: "rtl-auth-36651.firebaseapp.com",
   databaseURL: "https://rtl-auth-36651-default-rtdb.firebaseio.com",
   projectId: "rtl-auth-36651",
   storageBucket: "rtl-auth-36651.appspot.com",
   messagingSenderId: "217524393747",
   appId: "1:217524393747:web:f5e8d318c2eecb244d6ce6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Get the auth instance

document.getElementById('signOutButton').addEventListener('click', function() {
    signOut(auth).then(function() {
        // Sign-out successful.
        console.log('User signed out.');
        // Redirect to login or another page.
        window.location.replace("index.html");
    }).catch(function(error) {
        // An error occurred.
        console.error('Error signing out: ', error);
    });
    
});
