// Import necessary modules
const express = require('express');
const session = require('express-session');
const admin = require('firebase-admin');

// Create an Express app
const app = express();

// Parse JSON in request body
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = process.env.FIREBASE_CREDENTIALS
  ? JSON.parse(process.env.FIREBASE_CREDENTIALS)
  : {};
  console.log('Service Account:', serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Use sessions for tracking user login state
app.use(
  session({
    secret: '8292110442c7791460567e761afcca6237929e98674cdf71618fd00680d85a0c',
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.uid) {
    return next();
  } else {
    res.redirect('/signin');
  }
};

// Your routes and other middleware go here
app.get('/', isAuthenticated, (req, res) => {
  res.send('Welcome to the homepage!');
});

// ... (other routes)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on https://rl-eight.vercel.app/`);
});

