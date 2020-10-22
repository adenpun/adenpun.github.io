// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyD5fJ5gyslVtyuMJuF4RPWQdFFClstUY-s",
    authDomain: "webdb-20101.firebaseapp.com",
    databaseURL: "https://webdb-20101.firebaseio.com",
    projectId: "webdb-20101",
    storageBucket: "webdb-20101.appspot.com",
    messagingSenderId: "558365281749",
    appId: "1:558365281749:web:8146da88b5a34121a4c15c",
    measurementId: "G-Y20RYC3NYS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  function toggleSignIn() {
    if (firebase.auth().currentUser) {
      // [START signout]
      firebase.auth().signOut();
      document.getElementById('login').textContent = 'Sign In';
      // [END signout]
    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START authwithemail]
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('login').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authwithemail]
    }
    document.getElementById('login').disabled = true;
  }
  function initApp() {
    firebase.auth().signOut();
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
      // [START_EXCLUDE silent]
      // [END_EXCLUDE]
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // [START_EXCLUDE]
        document.getElementById('login').textContent = 'Sign out';
        window.top.location = 'setting.html'
        function setCookie(cname, cvalue, exdays){
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = 'expires='+ d.toUTCString();
          document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
        }
        setCookie('login', 'true', 0.5);
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE silent]
      document.getElementById('login').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authstatelistener]
  
    document.getElementById('login').addEventListener('click', toggleSignIn, false);
  }
  
  window.onload = function() {
    initApp();
  };