// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArQUBZ6A2uK7rMGXXMgqdPrP9-cpF2JVI",
  authDomain: "viora-421e3.firebaseapp.com",
  projectId: "viora-421e3",
  storageBucket: "viora-421e3.firebasestorage.app",
  messagingSenderId: "655394128262",
  appId: "1:655394128262:web:d04ef57c95b52617f62c07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
  var messageDiv=document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
      messageDiv.style.opacity=0;
  },5000)
}
const signIn=document.getElementById('submitLogIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('lemail').value;
  const password = document.getElementById('lpassword').value;

  console.log("Attempting Login...");
  console.log("Email:", email);
  console.log("Password:", password); 

  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, email, password)

  .then((userCredential)=>{
    showMessage('login successful','signInMessage');
    const user=userCredential.user;
    localStorage.setItem('loggedInUserId',user.uid);
    window.location.href='../home.html';

  })
  .catch((error)=>{
    const errorCode=error.code;
    if(errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found"){
      showMessage('Incorrect Email or Password','signInMessage');
    }else{
      showMessage('Account does not exist','signInMessage');
    }

    })
  }) 