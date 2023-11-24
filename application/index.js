// Import the functions you need from the SDKs you need
//Sign In
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

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
const auth = getAuth(app);

window.signIn= function(e) {
  e.preventDefault();

  const output = document.getElementById("output");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  
  if (!emailInput || !passwordInput) {
    console.error("Email or Password input not found.");
    return;
  }

  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user.uid); // Logs the UID
      window.location.replace("home.html");
    })
    .catch((error) => {
      console.error("Login Error:", error);
      output.textContent = "Invalid Email or password. Please try again.";
    });
};

