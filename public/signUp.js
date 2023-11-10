
  // Import the functions you need from the SDKs you need
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
  import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js'
  //import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js'
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDSAAqD1a73N5REtR8zYRwFxEm-oyhYtmA",
    authDomain: "rtl-auth-36651.firebaseapp.com",
    databaseURL: "https://rtl-auth-36651-default-rtdb.firebaseio.com",
    projectId: "rtl-auth-36651",
    storageBucket: "rtl-auth-36651.appspot.com",
    messagingSenderId: "217524393747",
    appId: "1:217524393747:web:f5e8d318c2eecb244d6ce6",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  var firstname = document.getElementById("firstname")
  var lastname = document.getElementById("lastname")
  var email = document.getElementById("email")
  var password = document.getElementById("password")


  window.signup = function(e){
    e.preventDefault();
    var obj = {
      firstname:firstname.value,
      lastname:lastname.value,
      email:email.value,
      password:password.value,
    }
    createUserWithEmailAndPassword(auth, obj.email,obj.password)
    .then(function(success){
      alert("signedUp")
    })
    .catch(function(err){
      alert("error" + err)
    })
    console.log(obj)
  }; 