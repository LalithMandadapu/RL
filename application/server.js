const express = require('express');
const admin = require('firebase-admin');
const session = require('express-session');

const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require('"C:\Users\manda\OneDrive\Desktop\IIITH\rtl-auth-36651-firebase-adminsdk-d6nmk-4798ffef72.json"');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Use sessions for tracking user login state
app.use(
  session({
    secret: 'your-secret-key', // Change this to a secure key
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

// Routes
app.get('/', isAuthenticated, (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send('Welcome to the dashboard!');
});

app.get('/signin', (req, res) => {
  res.send('Sign In Page');
});

app.post('/signin', (req, res) => {
  // Authenticate user using Firebase
  const { email, password } = req.body;

  admin
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      req.session.uid = user.uid;
      res.redirect('/');
    })
    .catch((error) => {
      res.send(`Sign In Failed: ${error.message}`);
    });
});

app.get('/signup', (req, res) => {
  res.send('Sign Up Page');
});

app.post('/signup', (req, res) => {
  // Create user using Firebase
  const { email, password } = req.body;

  admin
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      req.session.uid = user.uid;
      res.redirect('/');
    })
    .catch((error) => {
      res.send(`Sign Up Failed: ${error.message}`);
    });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/signin');
  });
});

// Start the serv
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
